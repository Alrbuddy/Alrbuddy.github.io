// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to generate a permanent key
function generatePermanentKey() {
    var existingKey = getCookie("permanent_key");
    var existingToken = getToken();

    if (!existingKey) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var permanentKey = '';
        for (var i = 0; i < 16; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            permanentKey += characters.charAt(randomIndex);
        }
        setCookie("permanent_key", permanentKey, 365);
    }

    if (!existingToken) {
        var token = generateToken();
        setCookie("token", token, 365);
    }

    return existingKey || permanentKey;
}

// Function to generate a token
function generateToken() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var token = '';
    for (var i = 0; i < 32; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
}

// Expose an API endpoint to retrieve user information
app.get('/api/userinfo', (req, res) => {
    var token = getToken();
    var permanentKey = generatePermanentKey();

    res.json({
        token: token,
        permanentKey: permanentKey
    });
});

// Function to get the user's token
function getToken() {
    return getCookie("token");
}

// Call the displayToken() function to show the token on the website
displayToken();

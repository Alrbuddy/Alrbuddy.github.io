function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

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

function getToken() {
    return getCookie("token");
}

function generateToken() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var token = '';
    for (var i = 0; i < 32; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
}

function displayToken() {
    var token = getToken();
    var tokenElement = document.getElementById("token");
    if (token && tokenElement) {
        tokenElement.textContent = "Your Token: " + token;
    }
}

// Call the displayToken() function to show the token on the website
displayToken();

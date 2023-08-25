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
    if (!existingKey) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var permanentKey = '';
        for (var i = 0; i < 16; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            permanentKey += characters.charAt(randomIndex);
        }
        setCookie("permanent_key", permanentKey, 365);  // Set the cookie to last for a year
        return permanentKey;
    } else {
        return existingKey;
    }
}

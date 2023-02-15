// this function for validating email
export var validateEmail = function (email) {
    var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
};
// this function is for validating password
export var validatePassword = function (password) {
    if (password.length < 8) {
        return "Password should contain at least 8 characters";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password should contain at least one capital letter";
    }
    if (!/\d/.test(password)) {
        return "Password should contain at least one number";
    }
    if (!/_/.test(password)) {
        return "Password should contain at least one underscore";
    }
    return undefined;
};

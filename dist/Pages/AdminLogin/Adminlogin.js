import React, { useState } from 'react';
import './Adminlogin.css';
import { masaiimage } from '../../Assets/Assets';
import Tooltip from '../../components/Tooltip/Tooltip';
import { Flex, Text, Box, Input, FormControl, FormLabel, Image, Checkbox, Button, Container, HStack, } from '@chakra-ui/react';
import { validatePassword, validateEmail } from '../../components/Emailvalidator';
var Adminlogin = function () {
    var _a = useState(''), loginEmail = _a[0], setLoginEmail = _a[1];
    var _b = useState(''), loginPassword = _b[0], setLoginPassword = _b[1];
    var _c = useState(false), forgotPass = _c[0], setForgotPass = _c[1];
    var _d = useState(false), show = _d[0], setShow = _d[1];
    var _e = useState(), passwordError = _e[0], setPasswordError = _e[1];
    var _f = useState(false), showPasswordError = _f[0], setShowPasswordError = _f[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        var res = validatePassword(loginPassword);
        if (res) {
            setPasswordError({ message: res });
            setShowPasswordError(true);
        }
        if (validateEmail(loginEmail) === false) {
            setShow(true);
        }
        else {
            // code to submit the form goes here. after get api
        }
    };
    return (React.createElement("div", { className: 'container' },
        React.createElement(Container, { w: "100%", centerContent: true },
            React.createElement(Image, { boxSize: '150px', objectFit: 'contain', mt: '40px', src: masaiimage, alt: 'Masai logo' }),
            React.createElement(Box, { w: ["full", "md"], p: "10px 20px 20px 30px", mx: "auto", border: ['none'], bg: "white", borderColor: ["", 'grey.300'], borderRadius: 10, boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.1)" },
                React.createElement(FormControl, null,
                    React.createElement(FormLabel, { fontSize: ".900rem", fontWeight: "500", color: "rgb(55 65 81)", mt: 4 }, "Email"),
                    React.createElement(Input, { required: "true", variant: 'outline', placeholder: 'Email', onChange: function (e) { return setLoginEmail(e.target.value); } }),
                    show && (React.createElement(Tooltip, { value: "Please enter a valid email address.", show: show, setShow: setShow }))),
                React.createElement(FormControl, null,
                    React.createElement(FormLabel, { fontSize: ".900rem", fontWeight: "500", color: "rgb(55 65 81)", mt: 4 }, "Password"),
                    React.createElement(Input, { variant: 'outline', required: true, placeholder: 'Password', onChange: function (e) { return setLoginPassword(e.target.value); } }),
                    showPasswordError && (React.createElement(Tooltip, { value: passwordError, show: showPasswordError, setShow: setShowPasswordError }))),
                React.createElement(HStack, { mt: '10px', w: 'full' },
                    React.createElement(Checkbox, null),
                    React.createElement(Text, { color: "rgb(75 85 99", fontSize: ".900rem" }, "Remember Me")),
                React.createElement(Flex, { justifyContent: "flex-end" },
                    React.createElement(HStack, null,
                        React.createElement(Button, { variant: "link", fontSize: ".900rem", textDecoration: "underline", color: "rgb(75 85 99)" }, "Forget your password?"),
                        React.createElement(Button, { bg: "rgb(31 41 55)", h: "35px", w: "80px", color: "white", rounded: "10px", onClick: handleSubmit }, "Login")))))));
};
export default Adminlogin;

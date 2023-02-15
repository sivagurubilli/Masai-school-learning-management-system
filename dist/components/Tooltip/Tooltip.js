import React, { useEffect } from 'react';
import './Tooltip.css';
import { Box, Text } from "@chakra-ui/react";
var Tooltip = function (_a) {
    var value = _a.value, show = _a.show, setShow = _a.setShow;
    // after 5 secs tooltip disapppear 
    useEffect(function () {
        setTimeout(function () {
            setShow(false);
        }, 5000);
    }, [setShow]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { id: "tooltip", className: "component ".concat(show ? 'show' : 'hide'), transition: "visibility 0s linear 5s", display: "flex", alignItems: "center" },
            React.createElement("img", { className: "svg", src: "https://cdn-icons-png.flaticon.com/512/6897/6897039.png", alt: "Tooltip Icon" }),
            React.createElement(Text, { fontSize: "14px", color: "tomato" }, value))));
};
export default Tooltip;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashborad from './StudentDashboard/Dashborad';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import Adminsignup from '../Pages/AdminSignup/Adminsignup';
import Adminlogin from '../Pages/AdminLogin/Adminlogin';
import AdminLecture from '../Pages/AdminLecturePage/AdminLecture';
var Allroutes = function () {
    return (React.createElement("div", null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/dashboard", element: React.createElement(Dashborad, null) }),
            React.createElement(Route, { path: "/forgotpassword", element: React.createElement(ForgetPassword, null) }),
            React.createElement(Route, { path: "/user/profile" }),
            React.createElement(Route, { path: "/transcript" }),
            React.createElement(Route, { path: "/admin/signup", element: React.createElement(Adminsignup, null) }),
            React.createElement(Route, { path: "/admin/login", element: React.createElement(Adminlogin, null) }),
            React.createElement(Route, { path: "/admin/lectures", element: React.createElement(AdminLecture, null) }))));
};
export default Allroutes;

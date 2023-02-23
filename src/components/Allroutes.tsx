import AdminLecture from "../Pages/AdminSidePages/AdminLecturePage/index";
import AdminSignup from "../Pages/AdminSidePages/AdminSignup/index";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Adminlogin from "../Pages/AdminSidePages/AdminLogin/index";
import StudentSignup from '../Pages/StudentSidePages/StudentSignup'
import Dashborad from "./StudentDashboard/Dashborad";
import App from "../Pages/StudentSidePages/StudentLogin";
import AdminDashboard from "../Pages/AdminSidePages/AdminDashboar";
import AdminLectureDetail from "../Pages/AdminSidePages/AdminLecturePage/AdminLectureDetail";
import ForgetPassword from "../Pages/ForgotPassword/index";
import ResetPassword from "../Pages/ResetPassword/index";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path ="/admin/" element={<AdminDashboard/>}/>
        <Route path="/admin/lectures" element={<AdminLecture />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/admin/lectures/:id" element={<AdminLectureDetail />} />
        <Route path="/student/dashboard" element={<Dashborad />} />
        <Route path="/forgot-password" element={< ForgetPassword/>} />
        <Route path="/reset-password" element={< ResetPassword/>} />
        <Route path ="/student/signup" element ={<StudentSignup/>}/>
        <Route path ="/student/login" element ={<App/>} />
        <Route path="/user/profile" />
        <Route path="/transcript" />
      </Routes>
    </div>
  );
};

export default Allroutes;

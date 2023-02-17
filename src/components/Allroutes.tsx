import AdminLecture from "../Pages/AdminSidePages/AdminLecturePage/index";
import AdminSignup from "../Pages/AdminSidePages/AdminSignup/index";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Adminlogin from "../Pages/AdminSidePages/AdminLogin/index";
import ForgetPassword from "./ForgetPassword";
import StudentSignup from '../Pages/StudentSidePages/StudentSignup/StudentSignup'
import Dashborad from "./StudentDashboard/Dashborad";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashborad />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/admin/lectures" element={<AdminLecture />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path ="/student/signup" element ={<StudentSignup/>}/>
        <Route path="/user/profile" />
        <Route path="/transcript" />
      </Routes>
    </div>
  );
};

export default Allroutes;

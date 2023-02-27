import AdminLecture from "../Pages/AdminSidePages/AdminLecturePage/Index";
import AdminSignup from "../Pages/AdminSidePages/AdminSignup/index";
import React ,{useEffect,useState} from "react";
import { Route, Routes } from "react-router-dom";
import ForgetPassword from "../Pages/ForgotPassword/index";
import Dashborad from "../Pages/StudentSidePages/StudentDashboard/Dashborad";
import AdminDashboard from "../Pages/AdminSidePages/AdminDashboard";
import AdminLectureDetail from "../Pages/AdminSidePages/AdminLectureDetail/Index"
import LandingPage from "../Pages/AdminSidePages/LandingPage";
import PrivateRoute from "./PrivateRoutes";
import AdminLectureCreate from "../Pages/AdminSidePages/CreateLecturePage/Index";
import AdminLectureEdit from "../Pages/AdminSidePages/EditLecturePage/Index";
import CreateBulkLecture from "../Pages/AdminSidePages/CreateLecturePage/CreateBulkLecture";
import ResetPassword from "../Pages/ResetPassword/index"
import Login from "../Pages/StudentSidePages/Login";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path ="/" element ={<LandingPage />}/>
       <Route path ="/admin/" element={<AdminDashboard/>}/>
        <Route path="/admin/lectures"  element= { <AdminLecture />}/>
        <Route path="/admin/lectures/:id" element={<AdminLectureDetail />} />
        <Route path="/admin/lectures/edit/:id" element={<AdminLectureEdit />} />
        <Route path="/student/dashboard" element={<Dashborad />} />
        <Route path ="/admin/create-lectures" element ={<AdminLectureCreate/>}/>
        <Route path="/admin/create-bulk-lectures" element ={<CreateBulkLecture/>}/>
        <Route path="/user/profile" />
        <Route path="/transcript" />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/lectures/:id" element={<AdminLectureDetail />} />
        <Route path="/student/dashboard" element={<Dashborad />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path ="/admin/dashboard" element ={<AdminDashboard />}/>
        <Route path ="/login" element ={<Login/>} />
        <Route path="/reset-password" element={< ResetPassword/>} />
      </Routes>
    </div>
  );
};

export default Allroutes;
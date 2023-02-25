import AdminLecture from "../Pages/AdminSidePages/AdminLecturePage/index";
import AdminSignup from "../Pages/AdminSidePages/AdminSignup/index";
import React ,{useEffect,useState} from "react";
import { Route, Routes } from "react-router-dom";
import ForgetPassword from "../Pages/ForgotPassword/index";
import Dashborad from "./StudentDashboard/Dashborad";
import AdminDashboard from "../Pages/AdminSidePages/AdminDashboar";
import AdminLectureDetail from "../Pages/AdminSidePages/AdminLecturePage/AdminLectureDetail"
import LandingPage from "../Pages/AdminSidePages/LandingPage";
import PrivateRoute from "./PrivateRoutes";
import AdminLectureCreate from "../Pages/AdminSidePages/CreateLecturePage";
import AdminLectureEdit from "../Pages/AdminSidePages/CreateLecturePage/EditLecture";
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
         <Route path ="/student/signup" element ={<StudentSignup/>}/>
        <Route path ="/student/login" element ={<App/>} />
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
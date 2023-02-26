import AdminLecture from "../Pages/AdminSidePages/AdminLecturePage/index";
import AdminSignup from "../Pages/AdminSidePages/AdminSignup/index";
import React ,{useEffect,useState} from "react";
import { Route, Routes } from "react-router-dom";
import ForgetPassword from "../Pages/ForgotPassword/index";
<<<<<<< HEAD
import ResetPassword from "../Pages/ResetPassword/index";
import StudentLecture from './../Pages/StudentSidePages/StudentLecturePage/index';
import StudentLectureDetail from "./../Pages/StudentSidePages/StudentLecturePage/StudentLectureDetail";
import StudentDiscussions from './../Pages/StudentSidePages/StudentDiscussionPage/index';
=======
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
>>>>>>> 56a3edfef32cc9de4af587439fbcb772abef0e2a

const Allroutes = () => {
  return (
    <div>
      <Routes>
<<<<<<< HEAD
        <Route path ="/admin/" element={<AdminDashboard/>}/>
   
        <Route path="/admin/lectures" element={<AdminLecture />} />
        <Route path="/student/lectures" element={<StudentLecture />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/admin/lectures/:id" element={<AdminLectureDetail />} />
        <Route path="/student/lectures/:id" element={<StudentLectureDetail />} />
        <Route path="/student/lectures/:id/discussion" element={<StudentDiscussions />} />


        <Route path="/student/dashboard" element={<Dashborad />} />
        <Route path="/forgot-password" element={< ForgetPassword/>} />
        <Route path="/reset-password" element={< ResetPassword/>} />


        
        <Route path ="/student/signup" element ={<StudentSignup/>}/>
=======
        <Route path ="/" element ={<LandingPage />}/>
       <Route path ="/admin/" element={<AdminDashboard/>}/>
        <Route path="/admin/lectures"  element= { <AdminLecture />}/>
        <Route path="/admin/lectures/:id" element={<AdminLectureDetail />} />
        <Route path="/admin/lectures/edit/:id" element={<AdminLectureEdit />} />
        <Route path="/student/dashboard" element={<Dashborad />} />
        <Route path ="/admin/create-lectures" element ={<AdminLectureCreate/>}/>
        <Route path="/admin/create-bulk-lectures" element ={<CreateBulkLecture/>}/>
         <Route path ="/student/signup" element ={<StudentSignup/>}/>
>>>>>>> 56a3edfef32cc9de4af587439fbcb772abef0e2a
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
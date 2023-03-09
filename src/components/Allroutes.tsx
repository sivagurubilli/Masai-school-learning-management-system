import React  from "react";
import { Route, Routes } from "react-router-dom";
import AdminLecture from "../Pages/AdminSidePages/AdminLecturePage/index";
import StudentLecture from "../Pages/StudentSidePages/StudentLecturePage/index";
import AdminSignup from "../Pages/AdminSidePages/AdminSignup/index";
import ForgetPassword from "../Pages/ForgotPassword/index";
import Dashborad from "../Pages/StudentSidePages/StudentDashboard/index";
import AdminDashboard from "../Pages/AdminSidePages/AdminDashboard";
import AdminLectureDetail from "../Pages/AdminSidePages/AdminLectureDetail/index"
import LandingPage from "../Pages/AdminSidePages/LandingPage";
import AdminLectureCreate from "../Pages/AdminSidePages/CreateLecturePage";
import AdminLectureEdit from "../Pages/AdminSidePages/EditLecturePage/index";
import CreateBulkLecture from "../Pages/AdminSidePages/CreateBulkLecture/index";
import ResetPassword from "../Pages/ResetPassword/index"
import Login from "../Pages/StudentSidePages/Login";

import CopyLecture from "../Pages/AdminSidePages/CopyLecture/index";
import BookMarks from "../Pages/StudentSidePages/BookMarks/index";
import StudentLectureDetail from "../Pages/StudentSidePages/LectureDetailPage/index";
import Zoom from './../Pages/test/Zoom';
import LectureDiscussionTab from "../Pages/StudentSidePages/LectureDetailPage/index";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path ="/" element ={<LandingPage />}/>
       <Route path ="/admin/" element={<AdminDashboard/>}/>
        <Route path="/admin/lectures"  element= { <AdminLecture />}/>
        <Route path="/student/lectures"  element= { <StudentLecture />}/>
        <Route path="/student/lectures/:id"  element= { <StudentLectureDetail />}/>
        <Route path="/student/lectures/:id/discussion"  element= { <LectureDiscussionTab />}/>
        <Route path="/admin/lectures/:id" element={<AdminLectureDetail />} />
        <Route path="/admin/lectures/edit/:id" element={<AdminLectureEdit />} />
        <Route path="/student/dashboard" element={<Dashborad />} />
        <Route path ="/admin/create-lectures" element ={<AdminLectureCreate/>}/>
        <Route path ="/admin/dashboard" element ={<AdminDashboard />}/>
        <Route path ="/admin/lectures/copy/:id" element ={<CopyLecture />}/>
        <Route path="/admin/create-bulk-lectures" element ={<CreateBulkLecture/>}/>
        <Route path="/user/profile" />
        <Route path="/transcript" />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/lectures/:id" element={<AdminLectureDetail />} />
        <Route path="/student/dashboard" element={<Dashborad />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/student/bookmarks" element={<BookMarks/>} />
        <Route path ="/login" element ={<Login/>} />
        <Route path="/api/reset-password/:token/:email/:number" element={< ResetPassword/>} />
        <Route path="/zoom" element={< Zoom/>} />
      </Routes>
    </div>
  );
};

export default Allroutes;

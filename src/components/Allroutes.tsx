import React  from "react";
import { Route, Routes } from "react-router-dom";
import AdminLecture from "../Pages/AdminSidePages/AdminLecturePage/index";
import StudentLecture from "../Pages/StudentSidePages/StudentLecturePage/index";
import AdminSignup from "../Pages/AdminSidePages/AdminSignup/index";
import ForgetPassword from "../Pages/ForgotPassword/index";
import Dashborad from "../Pages/StudentSidePages/StudentDashboard/Index";
import AdminDashboard from "../Pages/AdminSidePages/AdminDashboard";
import AdminLectureDetail from "../Pages/AdminSidePages/AdminLectureDetail/Index"
import LandingPage from "../Pages/AdminSidePages/LandingPage";
import AdminLectureCreate from "../Pages/AdminSidePages/CreateLecturePage";
import AdminLectureEdit from "../Pages/AdminSidePages/EditLecturePage/Index";
import CreateBulkLecture from "../Pages/AdminSidePages/CreateBulkLecture/Index";
import ResetPassword from "../Pages/ResetPassword/index"
import Login from "../Pages/StudentSidePages/Login";
<<<<<<< HEAD
import CopyLecture from "../Pages/AdminSidePages/CopyLecture";
import BookMarks from "../Pages/StudentSidePages/BookMarks";
=======
import CopyLecture from "../Pages/AdminSidePages/CopyLecture/Index";
import BookMarks from "../Pages/StudentSidePages/BookMarks/Index";
import BookMarkDetails from "../Pages/StudentSidePages/BookMarkDetails/Index";
import StudentLectureDetail from "../Pages/StudentSidePages/LectureDetailPage/index";
import StudentLectureDiscussion from './../Pages/StudentSidePages/LectureDiscussionPage/index';
>>>>>>> b257bb573b74fdb2db1a5d4258c9f69bfa6e7e90

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path ="/" element ={<LandingPage />}/>
       <Route path ="/admin/" element={<AdminDashboard/>}/>
        <Route path="/admin/lectures"  element= { <AdminLecture />}/>
        <Route path="/student/lectures"  element= { <StudentLecture />}/>
        <Route path="/student/lectures/:id"  element= { <StudentLectureDetail />}/>
        <Route path="/student/lectures/:id/discussion"  element= { <StudentLectureDiscussion />}/>
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
        <Route path="/reset-password" element={< ResetPassword/>} />
      </Routes>
    </div>
  );
};

export default Allroutes;

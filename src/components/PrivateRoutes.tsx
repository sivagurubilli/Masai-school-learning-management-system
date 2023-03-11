import React from "react";
import { Navigate, Outlet} from "react-router-dom";


const AdminPrivateRoute = () => {
  let username
  let userType
 username = localStorage.getItem("username");
 userType= localStorage.getItem("userType")
 if(!username){
  username = sessionStorage.getItem("username");
  userType= sessionStorage.getItem("userType")
 }
 
  if(username && userType?.trim() === "STUDENT_USER"){
 return <Outlet /> 
  }else{
    return <Navigate to="/login" replace />;
  }

};

export default AdminPrivateRoute;

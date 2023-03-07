import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();
  
   // when user enters to landing page it checks for username in localstorage and in session storage 
   // if find username find update state in redux based on values 
   // if not find values in local storage  navigate to login
  useEffect(() => {
    let usertype;
    let username;
    usertype = localStorage.getItem("userType");
    username = localStorage.getItem("username");
    if (!username) {
      usertype = sessionStorage.getItem("UserType");
      username = sessionStorage.getItem("Username");
    }
 
    if (username && usertype === "STUDENT_USER") {
      navigate("/student/dashboard");
    }
    if (username && usertype !== "STUDENT_USER") {
      navigate("/admin/dashboard");
    }
    if (!usertype) {
      navigate("/login");
    }
  }, []);

  return <div></div>;
};

export default LandingPage;
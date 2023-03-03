import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { actionCreators } from "../../redux/Authreducer/index";


const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { IsAuthenticated } = bindActionCreators(actionCreators, dispatch);
  
   // when user enters to landing page it checks for username in localstorage and in session storage 
   // if find username find update state in redux based on values 
   // if not find values in local storage  navigate to login 
  useEffect(() => {
    let usertype;
    let username;
    let userId;
    usertype = localStorage.getItem("userType");
    username = localStorage.getItem("username");
    if (!username) {
      usertype = sessionStorage.getItem("UserType");
      username = sessionStorage.getItem("Username");
    }
    if (username && usertype === "STUDENT_USER") {
      IsAuthenticated({
        isAuth: true,
        username: username,
        userId: 3,
        isAdmin: false,
      });
    }
    if (username && usertype !== "STUDENT_USER") {
      IsAuthenticated({
        isAuth: true,
        username: username,
        userId: 3,
        isAdmin: true,
      });
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
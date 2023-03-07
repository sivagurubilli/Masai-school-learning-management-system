import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
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
    userId = Number(localStorage.getItem("userId"));
    if (!username) {
      usertype = sessionStorage.getItem("UserType");
      username = sessionStorage.getItem("Username");
      userId = Number(sessionStorage.getItem("UserId"));
    }
   if (username && usertype === "STUDENT_USER") {
      IsAuthenticated({
        isAuth: true,
        username:username,
        userId: userId,
        isAdmin: false,
      });
      navigate("/student/dashboard");
    }
    if (username && usertype !== "STUDENT_USER") {
      IsAuthenticated({
        isAuth: true,
        username:username,
        userId: userId,
        isAdmin: true,
      });
      navigate("/admin/dashboard");
    }
    if (!usertype) {
      navigate("/login");
    }
  }, []);

  return <div></div>;
};

export default LandingPage;
import React, { useState, useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StudentLogin from "./StudentLogin";
import StudentSignup from "./StudentSignup";

const Login = () => {
  const [goToSignup, setGotoSignup] = useState(false);
  const navigate = useNavigate();

  //when entering into login it checks for username is available in localstorage if not available checks in session storage
  
  const gotoLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    let username;
    username = localStorage.getItem("username");
    if (!username) {
      username = sessionStorage.getItem("username");
    }if(!username){
    gotoLogin()
    }
  }, [gotoLogin]);
 

  return (
    <div>
      {goToSignup ? (
        <StudentSignup setGotoSignup={setGotoSignup} />
      ) : (
        <StudentLogin setGotoSignup={setGotoSignup} />
      )}
    </div>
  );
};

export default Login;

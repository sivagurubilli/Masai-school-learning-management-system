import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentLogin from "./StudentLogin";
import StudentSignup from "./StudentSignup";

const Login = () => {
  const [goToSignup, setGotoSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const username = localStorage.getItem("username");
    if (username && userType == "STUDENT_USER") {
      navigate("/student/dashboard");
    }
    if (username && userType !== "STUDENT_USER") {
      navigate("/admin/dashboard");
    }
  }, []);

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

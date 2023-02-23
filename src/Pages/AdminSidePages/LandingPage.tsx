import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usertype = localStorage.getItem("UserType");
    const username = localStorage.getItem("Username");
    if (username && usertype === "STUDENT_USER") {
      navigate("/student/dashboard");
    }
    if (username && usertype! == "STUDENT_USER") {
      navigate("/admin/dashboard");
    }
    if (!usertype) {
      navigate("/login");
    }
  }, []);

  return <div></div>;
};

export default LandingPage;
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usertype = localStorage.getItem("lmsUserType");
    if (usertype === "NORMAL_USER") {
      navigate("/student/dashboard");
    }
    if (!usertype) {
      navigate("/student/login");
    }
  }, []);

  return <div></div>;
};

export default LandingPage;

import React from "react";
import "../../../App.css";
import Secondnav from "../../../Components/AdminsideComponents/AdminLecture/Secondnav";

import Navbar from "../../../Components/StudentNavbar/Navbar";

const AdminLecture = () => {
  return (
    <div className="container">
      <Navbar />
      <Secondnav />
    </div>
  );
};

export default AdminLecture;

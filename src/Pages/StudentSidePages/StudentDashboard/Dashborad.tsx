import React from "react";
import Secondnavbar from "../../../components/StudentSideComponents/StudentDashboard/Secondnavbar";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
// import "../../App.css";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";

// this component displays student side dashboard
const Dashborad = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <Secondnavbar />
        <Box
          w="80%"
          p="10px"
          borderRadius="10px"
          minHeight="40px"
          maxHeight="auto"
          bg="white"
          ml="10%"
          mt="70px"
        ></Box>
      </div>
    </>
  );
};

export default Dashborad;

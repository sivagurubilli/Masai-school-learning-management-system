import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
// import "../../App.css";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import DashboardNavbar from "../../../components/StudentSideComponents/StudentDashboard/DashboardNavbar";
import { GetDashboardLecturesService } from "../../../Services/LectureServices";
import { ILectureResponse } from "@/Services/LectureInterface";

// this component displays student side dashboard
const Dashborad = () => {
  const [dashboardLectures,setDashboardLectures] = useState<ILectureResponse[]>()

  useEffect(()=>{
    GetDashboardLecturesService().then((res)=>{
      setDashboardLectures(res)
    })
  },[])

  return (
    <>
      <div className="container">
        <Navbar />
        < DashboardNavbar/>
        <Box
          w="80%"
          borderRadius="10px"
          minHeight="40px"
          maxHeight="auto"
          bg="white"
          ml="10%"
          mt="70px"
        >   



        </Box>
      </div>
    </>
  );
};

export default Dashborad;

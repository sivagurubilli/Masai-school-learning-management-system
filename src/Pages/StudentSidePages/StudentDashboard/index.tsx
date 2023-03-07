import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
// import "../../App.css";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import DashboardNavbar from "../../../components/StudentSideComponents/StudentDashboard/DashboardNavbar";
import { GetDashboardLecturesService } from "../../../Services/LectureServices";
import { ILectureResponse } from "../../../Services/LectureInterface";
import DashboardLectureCard from "../../../components/StudentSideComponents/StudentDashboard/DashboardLectureCard";
import CommonModalComponent from "../../../components/Modal/commonModal";

// this component displays student side dashboard
const Dashborad = () => {
  const [dashboardLectures,setDashboardLectures] = useState<ILectureResponse[]>()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");


    useEffect(()=>{
      const fetchData = async() =>{
        try{
        const response = await GetDashboardLecturesService();
        if(response.length){
        setDashboardLectures(response);
        }
      }catch(error){
        setIsOpen(true);
        setModalErrorBody(
          "Sorry about that! There is a scheduled downtime on your servers, so please check them"
        );
      }
    }
      fetchData();
      },[])

  return (
    <>
      <div className="container">
        <Navbar />
        < DashboardNavbar/>
        <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
        <Box
          w="80%"
          borderRadius="10px"
          minHeight="40px"
          maxHeight="auto"
          bg="white"
          ml="10%"
          mt="70px"
        >   
        <DashboardLectureCard />


        </Box>
      </div>
    </>
  );
};

export default Dashborad;

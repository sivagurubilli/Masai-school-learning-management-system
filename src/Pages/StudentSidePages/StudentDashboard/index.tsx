import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import "../StudentLecturePage/index.css";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import DashboardNavbar from "../../../components/StudentSideComponents/StudentDashboard/DashboardNavbar";
import { GetDashboardLecturesService } from "../../../Services/LectureServices";
import { ILectureResponse } from "../../../Services/LectureInterface";
import DashboardLectureCard from "../../../components/StudentSideComponents/StudentDashboard/DashboardLectureCard";
import CommonModalComponent from "../../../components/Modal/commonModal";
import Loader from "../../../components/Modal/Loader";


// this component displays student side dashboard
const Dashborad = () => {
  const [dashboardLectures,setDashboardLectures] = useState<ILectureResponse[]>()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();


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

useEffect(()=>{
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 3000);
},[])
  // when student user enters this page all lectures for that date schedule is displayed here
    useEffect(()=>{
   
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

      {loading ?<Loader />:
        <Box
          w="80%"
          borderRadius="10px"
          minHeight="40px"
          maxHeight="auto"
          bg="white"
          ml="10%"
          mt="70px"
        >   
      {dashboardLectures  &&  dashboardLectures?.map((lecture)=>(
      <DashboardLectureCard key ={lecture.batch} lectureData={lecture} />
    
    ))}
      

        </Box>
}
      </div>
    </>
  );
};

export default Dashborad;

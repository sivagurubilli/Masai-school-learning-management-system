import { Box } from "@chakra-ui/react";
import React, { useState,useEffect } from "react";
import "../CreateLecturePage/index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import { ICreateLectureValues } from "../../../Services/LectureInterface";
import { LectureEditService, LectureSingleService } from "../../../Services/LectureServices";
import SecondNavforLectureCreate from "../../../components/AdminsideComponents/CreateLecture/SecondNavforCreateLecture";
import { useParams } from "react-router-dom";
import InputTakingSection from "../../../components/AdminsideComponents/CreateLecture/InputTakingSection";
import Loading from "../../../components/Modal/Loader";
import CommonModalComponent from "../../../components/Modal/commonModal";

const AdminLectureEdit = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [LectureEditValues, setLectureEditValues] =
    useState<ICreateLectureValues>({
      title: "",
      batch: "",
      category: "",
      section: "",
      type: "",
      schedule: new Date(),
      concludes: new Date(),
      createdBy: "",
      tags: ["rrr","ee"],
      hideVideo: false,
      optional: false,
      zoomLink: "",
      week: "",
      day: "",
      notes: "",
    });

  // get data from params using useparams
  const { id } = useParams();
  //Edit lecture service call
  useEffect(() => {
    const fetchData = async ()=> {
      try{
    const response = await LectureSingleService(id);
    if(response.title){
      setLectureEditValues(response);
    }
      }catch(error){      
        setIsOpen(true);
        setModalErrorBody(
          "Sorry about that! There is a scheduled downtime on your servers, so please check them"
        );
      }
    }
    fetchData()
  }, [id]);
  
  return (
    <div className="container">
      <Navbar />
      <SecondNavforLectureCreate />
      <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
      <Box
        w="80%"
        ml="10%"
        mt="60px"
        h="auto"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Box w="100%" p="2%" bg="white" h="auto">
      {LectureEditValues?.title ?   (  <Box w="100%" p="2%" h="auto">
          <InputTakingSection
            LectureValues={LectureEditValues}
            setLectureValues={setLectureEditValues}
            buttonName={"Edit Lecture"}
            LectureSendService ={LectureEditService}
            id={id}
          />
        </Box>): <Box mt="10%" ml="50%"><Loading /></Box>}        
        </Box>
      </Box>
     
    </div>
  );
};

export default AdminLectureEdit;

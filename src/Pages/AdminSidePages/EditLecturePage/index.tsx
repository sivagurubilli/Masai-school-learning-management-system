import { Box, Flex, Button, useMediaQuery } from "@chakra-ui/react";
import React, { useState,useEffect } from "react";
import "../CreateLecturePage/index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import { ICreateLectureValues } from "../../../Services/LectureInterface";
import { LectureEditService, LectureSingleService } from "../../../Services/LectureServices";
import SecondNavforLectureCreate from "../../../components/AdminsideComponents/CreateLecture/SecondNavforCreateLecture";
import { useParams } from "react-router-dom";
import InputTakingSection from "../../../components/AdminsideComponents/CreateLecture/InputTakingSection";
import CommonModalComponent from "../../../components/Modal/commonModal";
import Loading from "../../../components/Modal/Loader";

const AdminLectureEdit = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
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
      
      }
    }
    fetchData()
  }, [id]);
  

  const EditLecture = async () => {
      try {
        const response = await LectureEditService(LectureEditValues, id);
        if (response.message) {
          setIsOpen(true);
          setModalErrorBody("Editing and adding of the lecture was completed successfully");
        }
      } catch (error) {
        setIsOpen(true);
        setModalErrorBody(
          "Sorry about that! There is a scheduled downtime on your servers, so please check them"
        );
      }
    }


  return (
    <div className="container">
      <Navbar />
      <SecondNavforLectureCreate />
      <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modlBody={modalBody}
      />
      <Box
        w="80%"
        ml="10%"
        mt="60px"
        h="auto"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Box w="100%" p="2%" bg="white" h="auto">
      {LectureEditValues.title ?   (<InputTakingSection
            LectureValues={LectureEditValues}
            setLectureValues={setLectureEditValues}
          />): <Box mt="10%" ml="50%"><Loading /></Box>}
          <Flex justifyContent={"flex-end"}>
            <Button
              fontSize={isLargerThan900 ? "16px" : "12px"}
              w="auto"
              mt="20px"
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={EditLecture}
            >
              EDIT LECTURE
            </Button>
          </Flex>
        </Box>
      </Box>
      <Box w="80%" ml="10%" bg="white" h="100vh"></Box>
    </div>
  );
};

export default AdminLectureEdit;

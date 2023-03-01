import {
  Box,
  Flex,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "../CreateLecturePage/index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import {ICreateLectureValues} from "../../../Services/LectureInterface"
import {
  LectureEditService,
} from "../../../Services/LectureServices";
import SecondNavforLectureCreate from "../../../components/AdminsideComponents/CreateLecture/SecondNavforCreateLecture";
import { useParams } from "react-router-dom";
import InputTakingSection from "../../../components/AdminsideComponents/CreateLecture/InputTakingSection";
import CommonModalComponent from "../../../components/Modal/CommonModal";

const AdminLectureEdit = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [body,setBody] = useState<string>("")
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [LectureEditValues, setLectureEditValues] =
    useState<ICreateLectureValues>({
      title: "",
      batch: "",
      category: "",
      section: "",
      type: "",
      schedule: new Date(),
      concludes:new Date(),
      user: "",
      tags: [],
      hideVideo: false,
      optional:false,
      zoomLink: "",
      week: "",
      day: "",
      notes: "",
    });

  // get data from params using useparams
  const { id } = useParams();
  //Edit lecture service call
  const EditLecture = () => {
    const hasEmptyString = Object.values(LectureEditValues).some(value => value === '')
    if(LectureEditValues.schedule < new Date()){
      setBody("Schedule time should not be Before than Current time")
     setIsOpen(true)
    }
   else if(LectureEditValues.concludes <= LectureEditValues.schedule){
      setBody("Conculde time should not be Before than Schedule time")
      setIsOpen(true)
    }else if(hasEmptyString){
      setBody("All feilds are mandatory please fill all fields")
      setIsOpen(true)
    }
    LectureEditService(LectureEditValues, id).then((res) => {});
  };

  return (
    <div className="container">
      <Navbar />
      <SecondNavforLectureCreate />
      <CommonModalComponent isOpen={isOpen} setIsOpen={setIsOpen} body={body}/>
      <Box
        w="80%"
        ml="10%"
        mt="60px"
        h="auto"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
        <Box w="100%" p="2%" bg="white" h="auto">
          <InputTakingSection LectureValues ={LectureEditValues} setLectureValues={setLectureEditValues} />    
          <Flex justifyContent={"flex-end"}>
            <Button
              fontSize={isLargerThan900 ? "16px":"12px"}
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
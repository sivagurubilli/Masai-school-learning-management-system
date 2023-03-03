import {  Box, Flex, Button, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import "./index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import SecondNavforLectureCreate from "../../../components/AdminsideComponents/CreateLecture/SecondNavforCreateLecture";
import {
  LecturePostService,
} from "../../../Services/LectureServices";
import { ICreateLectureValues } from "../../../Services/LectureInterface";
import InputTakingSection from "../../../components/AdminsideComponents/CreateLecture/InputTakingSection";
import CommonModalComponent from "../../../components/Modal/commonModal";

const AdminLectureCreate = () => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isOpen, setIsOpen] = useState<boolean>(false);
const [body,setBody] = useState<string>("")
  const [LectureValues, setLectureValues] = useState<ICreateLectureValues>({
    title: "",
    batch: "",
    category: "",
    section: "",
    type: "",
    schedule: new Date(),
    concludes: new Date(),
    user: "",
    tags: [],
    hideVideo: false,
    optional: false,
    zoomLink: "",
    week: "",
    day: "",
    notes: "",
  });

  const CreateLecture = () => {
    console.log(LectureValues)
    const hasEmptyString = Object.values(LectureValues).some(value => value === '')
  
    if(LectureValues.schedule < new Date()){
      setBody("Schedule time should not be Before than Current time")
     setIsOpen(true)
    }
   else if(LectureValues.concludes <= LectureValues.schedule){
      setBody("Conculde time should not be Before than Schedule time")
      setIsOpen(true)
    }else if(hasEmptyString){
      setBody("All feilds are mandatory please fill all fields")
      setIsOpen(true)
    }  
   LecturePostService(LectureValues).then((res) => {});
  }
  
  return (
    <div className="container">
      <Navbar />
      <SecondNavforLectureCreate  />
      <CommonModalComponent isOpen={isOpen} setIsOpen={setIsOpen} body={body} />
      <Box
        w="80%"
        ml="10%"
        mt="60px"
        h="auto"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Box w="100%" p="2%" bg="white" h="auto">
          <InputTakingSection
            LectureValues={LectureValues}
            setLectureValues={setLectureValues}
          />
          <Flex justifyContent={"flex-end"}>
            <Button
             fontSize={isLargerThan900 ? "16px":"12px"}
              mt="20px"
              color="white"
              w="auto"
              bg="rgb(31 41 55)"
                _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={CreateLecture}
            >
              CREATE LECTURE
            </Button>
          </Flex>
        </Box>
      </Box>
      <Box w="80%" ml="10%" bg="white" h="100vh"></Box>
    </div>
  );
};

export default AdminLectureCreate;

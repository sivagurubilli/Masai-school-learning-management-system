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
const [modalBody,setModalErrorBody] = useState<string>("")
  const [LectureValues, setLectureValues] = useState<ICreateLectureValues>({
    title: "",
    batch: "",
    category: "",
    section: "",
    type: "",
    schedule: new Date(),
    concludes: new Date(),
    createdBy: "",
    tags: [],
    hideVideo: false,
    optional: false,
    zoomLink: "",
    week: "",
    day: "",
    notes: "",
  });


 
  const CreateLecture = async () => {
      try {
        const response = await LecturePostService(LectureValues);
        if (response.message) {
          setIsOpen(true);
          setModalErrorBody("The lecture was created with success fully added");
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
      <SecondNavforLectureCreate  />
      <CommonModalComponent isOpen={isOpen} setIsOpen={setIsOpen} modalBody={modalBody} />
      <Box
        w="80%"
        ml="10%"
        mt="60px"
        h="auto"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
        bg="white"
      >
        <Box w="100%" p="2%"  h="auto">
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
      
    </div>
  );
};

export default AdminLectureCreate;

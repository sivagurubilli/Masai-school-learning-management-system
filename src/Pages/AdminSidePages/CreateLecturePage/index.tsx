
import {
  Container,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import SecondNavforLectureCreate from "./SecondNavforCreateLecture";
import {
  ICreateLectureValues,
  ILecturePostResponse,
  LecturePostService,
} from "../../../Services/LectureServices";
import InputTakingSection from "./InputTakingSection";

const AdminLectureCreate = () => {
  const [LectureValues, setLectureValues] = useState<ICreateLectureValues>({
    title: "",
    batch: "",
    categoery: "",
    section: "",
    type: "",
    schedule: "",
    conclude: "",
    user: "",
    tags: "",
    hideVideo: false,
    zoomLink: "",
    week: "",
    day: "",
    notes: "",
  });


  const CreateLecture = () => {
    console.log(LectureValues)
    LecturePostService(LectureValues).then((res) => {});
  };

 return (
    <div className="container">
      <Navbar />
      <SecondNavforLectureCreate />
      <Box
        w="80%"
        ml="10%"
        mt="60px"
        h="auto"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
        <Box w="100%" p="2%" bg="white" h="auto">

     <InputTakingSection LectureValues={LectureValues} setLectureValues ={setLectureValues} />
          <Flex justifyContent={"flex-end"}>
            <Button
              w="32%"
              mt="20px"
              color="white"
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
import { Container, Box, Flex, Button, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import "./index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import SecondNavforLectureCreate from "./SecondNavforCreateLecture";
import {
  ILecturePostResponse,
  LecturePostService,
} from "../../../Services/LectureServices";
import { ICreateLectureValues } from "../../../Services/LectureInterface";
import InputTakingSection from "../../../components/AdminsideComponents/CreateLecture/InputTakingSection";

const AdminLectureCreate = () => {
  const [LectureValues, setLectureValues] = useState<ICreateLectureValues>({
    title: "",
    batch: "",
    categoery: "",
    section: "",
    type: "",
    schedule: new Date(),
    conclude: new Date(),
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
    console.log(LectureValues);
    LecturePostService(LectureValues).then((res) => {});
  };
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");


  return (
    <div className="container">
      <Navbar />
      <SecondNavforLectureCreate />
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

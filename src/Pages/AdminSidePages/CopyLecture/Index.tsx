import {
  Container,
  Box,
  Grid,
  Input,
  Select,
  useBreakpointValue,
  Flex,
  Button,
  FormLabel,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "../CreateLecturePage/index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import { ICreateLectureValues } from "../../../Services/LectureInterface";
import { LectureCopyService } from "../../../Services/LectureServices";
import SecondNavforLectureCreate from "../../../components/AdminsideComponents/CreateLecture/SecondNavforCreateLecture";
import { useParams } from "react-router-dom";
import InputTakingSection from "../../../components/AdminsideComponents/CreateLecture/InputTakingSection";
import CommonModalComponent from "../../../components/Modal/commonModal";

const CopyLecture = () => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const [LectureCopyValues, setLectureCopyValues] =
    useState<ICreateLectureValues>({
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

  // get id from params using useparams
  const { id } = useParams();
  //copy lecture service call
  const CopyLecture = () => {
    const hasEmptyString = Object.values(LectureCopyValues).some(
      (value) => value === "");
    if (LectureCopyValues.schedule < new Date()) {
      setBody("Schedule time should not be Before than Current time");
      setIsOpen(true);
    } else if (LectureCopyValues.concludes <= LectureCopyValues.schedule) {
      setBody("Conculde time should not be Before than Schedule time");
      setIsOpen(true);
    } else if (hasEmptyString) {
      setBody("All feilds are mandatory please fill all fields");
      setIsOpen(true);
    }
     LectureCopyService(LectureCopyValues, id).then((res) => {});
  };

  return (
    <div className="container">
      <Navbar />
      <SecondNavforLectureCreate />
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
            LectureValues={LectureCopyValues}
            setLectureValues={setLectureCopyValues}
          />
          <Flex justifyContent={"flex-end"}>
            <Button
              fontSize={isLargerThan900 ? "16px" : "12px"}
              w="auto"
              mt="20px"
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={CopyLecture}
            >
              COPY LECTURE
            </Button>
          </Flex>
        </Box>
      </Box>
      <Box w="80%" ml="10%" bg="white" h="100vh"></Box>
    </div>
  );
};

export default CopyLecture;

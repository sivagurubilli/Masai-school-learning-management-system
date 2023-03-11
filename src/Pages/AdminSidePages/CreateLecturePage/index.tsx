import { Box } from "@chakra-ui/react"
import React, { useState } from "react";
import "./index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import SecondNavforLectureCreate from "../../../components/AdminsideComponents/CreateLecture/SecondNavforCreateLecture";
import { LecturePostService } from "../../../Services/LectureServices";
import { ICreateLectureValues } from "../../../Services/LectureInterface";
import InputTakingSection from "../../../components/AdminsideComponents/CreateLecture/InputTakingSection";

const AdminLectureCreate = () => {
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
console.log(LectureValues)
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
        bg="white"
      >
        <Box w="100%" p="2%" h="auto">
          <InputTakingSection
            LectureValues={LectureValues}
            setLectureValues={setLectureValues}
            buttonName={"Create Lecture"}
            LectureSendService ={LecturePostService}
          />
        </Box>
      </Box>
    </div>
  );
};

export default AdminLectureCreate;

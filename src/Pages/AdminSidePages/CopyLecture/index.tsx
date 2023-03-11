import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../CreateLecturePage/index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import { ICreateLectureValues } from "../../../Services/LectureInterface";
import {
  LectureCopyService,
  LectureSingleService,
} from "../../../Services/LectureServices";
import SecondNavforLectureCreate from "../../../components/AdminsideComponents/CreateLecture/SecondNavforCreateLecture";
import { useParams } from "react-router-dom";
import InputTakingSection from "../../../components/AdminsideComponents/CreateLecture/InputTakingSection";
import CommonModalComponent from "../../../components/Modal/commonModal";
import Loading from "../../../components/Modal/Loader";


const CopyLecture = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [LectureCopyValues, setLectureCopyValues] =
    useState<ICreateLectureValues>({
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

  // get id from params using useparams
  const { id } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LectureSingleService(id);
        if (response.title) {
          setLectureCopyValues(response);
        }
      } catch (error) {
        setIsOpen(true);
        setModalErrorBody(
          "Sorry about that! There is a scheduled downtime on your servers, so please check them"
        );
      }
    };
     
      fetchData();
    
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
          {LectureCopyValues?.title ? (
            <Box w="100%" p="2%" bg="white" h="auto">
              <InputTakingSection
                LectureValues={LectureCopyValues}
                setLectureValues={setLectureCopyValues}
                buttonName={"Copy Lecture"}
                LectureSendService={LectureCopyService}
                id={id}
              />
            </Box>
          ) : (
            <Box>
              <Loading />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default CopyLecture;

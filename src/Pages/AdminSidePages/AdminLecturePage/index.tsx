import { Box, Flex, Button, useMediaQuery, Divider } from "@chakra-ui/react";
import React, { useEffect, useState} from "react";
import "./index.css";
import Secondnav from "../../../components/AdminsideComponents/AdminLecture/LectureSearchNavbar";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import TableHeading from "../../../components/AdminsideComponents/AdminLecture/LecturesTable";
import {
  GetAllLectureService,
  LectureSearchService,
} from "../../../Services/LectureServices";
import { ILectureResponse } from "../../../Services/LectureInterface";
import CommonModalComponent from "../../../components/Modal/commonModal";
import LectureSearchInput from "../../../components/AdminsideComponents/AdminLecture/LectureSearchInput";
import Loader from "../../../components/Modal/Loader";


interface IFilteredValues {
  title: string;
  batch: string;
  section: string;
  type: string;
  createdBy: string;
  startTime: string;
  week: string;
  day: string;
}

const AdminLecture = () => {
  const [filterValues, setFilterValues] = useState<IFilteredValues>({
    title: "",
    batch: "",
    section: "",
    type: "",
    createdBy: "",
    startTime: "",
    week: "",
    day: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [lecturesData, setLecturesData] = useState<ILectureResponse[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");



//user search and get lectures by provideing different values
const GetLecturesByFilter =()=>{
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
  },1000)
  GetLectures()
}

const GetLectures = async () => {
  try {
    const response = await LectureSearchService(filterValues);
    if (response.length) {
      setLecturesData(response);
    } else {
      setIsOpen(true);
      setModalErrorBody("There was a discrepancy between these values and the lecture data!");
    }
  } catch (error) {
    setIsOpen(true);
    setModalErrorBody(
      "I'm sorry about that! There is no data found, so please check the values"
    );
  }
}

const fetchData = async () => {
  try {
    const response = await GetAllLectureService();
    if (response.length) {  
      setLecturesData(response);
    }
  } catch (error) {
    setIsOpen(true);
    setModalErrorBody(
      "We were unable to find any data. It seems that something has gone wrong!"
    );
  }
};
    // when user enters into admin lectures page call service for getlist of lectures using useEffect
  useEffect(() => {
    fetchData();
  }, []);

  const Reset = () => {
    fetchData()
    setFilterValues({
      title: "",
      batch: "",
      section: "",
      type: "",
      createdBy: "",
      startTime: "",
      week: "",
      day: "",
    });
  };

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  return (
    <div className="container">
      <Navbar />
      <Secondnav />
      <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
      <Box
        w="90%"
        ml="5%"
        mt="60px"
        h="auto"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Box w="100%" p="2%" bg="white" h="auto">
          <LectureSearchInput
            filterValues={filterValues}
            setFilterValues={setFilterValues}
          />
          <Flex justifyContent={"flex-end"}>
            <Button
              w="15%"
              mt="10px"
              fontSize={isLargerThan900 ? "16px" : "12px"}
              color="white"
              bg="rgb(31 41 55)"
              isLoading={isLoading}
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={GetLecturesByFilter}
            >
              Filter
            </Button>
            <Button
              w="15%"
              mt="10px"
              color="white"
              ml="20px"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              fontSize={isLargerThan900 ? "16px" : "12px"}
              onClick={Reset}
            >
              Reset
            </Button>
          </Flex>
          <Divider mt="10px" />
        </Box>
      </Box>
      <Box w="90%" ml="5%" bg="white" h="auto" mt="20px" pb="10%">
        {lecturesData ? <TableHeading LecturesData={lecturesData} /> : <Loader />}
      </Box>
    </div>
  );
};

export default AdminLecture;

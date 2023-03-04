

import { Box, Flex, Button, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./index.css";
import Secondnav from "../../../components/AdminsideComponents/AdminLecture/LectureSearchNavbar";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import TableHeading from "../../../components/StudentSideComponents/StudentLectureComponents/LecturesTable";
import {
  GetAllLectureService,
  LectureSearchService,
} from "../../../Services/LectureServices";
import {
  ISearchResponse,
  ILectureResponse,
} from "../../../Services/LectureInterface";
import CommonModalComponent from "../../../components/Modal/commonModal";
import LectureSearchInput from "../../../components/AdminsideComponents/AdminLecture/LectureSearchInput";
import SecondNavbar from "../../../components/StudentSideComponents/StudentLectureComponents/SecondNavbar";

interface IFilteredValues {
  title: string;
  batch: string;
  section: string;
  type: string;
  user: string;
  date: string;
  week: string;
  day: string;
}

const StudentLecture = () => {
  const [filterValues, setFilterValues] = useState<IFilteredValues>({
    title: "",
    batch: "",
    section: "",
    type: "",
    user: "",
    date: "",
    week: "",
    day: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [lecturesData, setLecturesData] = useState<ILectureResponse[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");

  // calling service for getting list for lectures
  const GetLectures = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    LectureSearchService(filterValues).then((res: any) => {
      if (res.length > 1) {
        setLecturesData(res);
      } else if (res.data.success === false) {
        setIsOpen(true);
        setBody("These values did not match the lecture data!");
      }
    });
  };

  useEffect(() => {
    GetAllLectureService().then((res) => {
      setLecturesData(res);
    });
  }, []);

  const Reset = () => {
    setFilterValues({
      title: "",
      batch: "",
      section: "",
      type: "",
      user: "",
      date: "",
      week: "",
      day: "",
    });
  };

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  return (
    <div className="container">
      <Navbar />
      {/* <Secondnav /> */}
      <SecondNavbar />
      <CommonModalComponent isOpen={isOpen} setIsOpen={setIsOpen} body={body} />
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
              w="20%"
              mt="20px"
              fontSize={isLargerThan900 ? "16px" : "12px"}
              color="white"
              bg="rgb(31 41 55)"
              isLoading={isLoading}
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={GetLectures}
            >
              Filter
            </Button>
            <Button
              w="20%"
              mt="20px"
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
        </Box>
      </Box>
      <Box w="90%" ml="5%" bg="white" h="100vh">
        {lecturesData && <TableHeading LecturesData={lecturesData} />}
      </Box>
    </div>
  );
};

export default StudentLecture;

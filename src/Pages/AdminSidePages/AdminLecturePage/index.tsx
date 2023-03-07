import { Box, Flex, Button, useMediaQuery, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

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

  const state = useSelector((state: RootState) => state.Authreducer);

  // calling service for getting list for lectures
  const GetLectures = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    try {
      const response = await LectureSearchService(filterValues);
      if (response.length > 1) {
        setLecturesData(response);
      } else if (!response.length) {
        setIsOpen(true);
        setModalErrorBody("These values did not match the lecture data!");
      }
    } catch (error) {
      setIsOpen(true);
      setModalErrorBody(
        "Sorry about that! There is a scheduled downtime on your servers, so please check them"
      );
    }
  };

  useEffect(() => {
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
    fetchData();
  }, []);

  const Reset = () => {
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
              onClick={GetLectures}
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
      <Box w="90%" ml="5%" bg="white" h="auto" mt="20px">
        {lecturesData && <TableHeading LecturesData={lecturesData} />}
      </Box>
    </div>
  );
};

export default AdminLecture;

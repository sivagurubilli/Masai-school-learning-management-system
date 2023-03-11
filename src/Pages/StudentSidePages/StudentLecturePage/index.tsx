import { Box, Flex, Button, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import TableHeading from "../../../components/StudentSideComponents/StudentLectureComponents/LectureTable/LecturesTable";
import {
  LectureStudentSearchService,
  GettAllStudentLectureService,
} from "../../../Services/LectureServices";
import { ILectureResponse } from "../../../Services/LectureInterface";
import CommonModalComponent from "../../../components/Modal/commonModal";
import LectureSearchInput from "../../../components/StudentSideComponents/StudentLectureComponents/LectureSearchInput"
import SecondNavbar from "../../../components/StudentSideComponents/StudentLectureComponents/SecondNavbar";
import Skeleton from "./../../../components/Skeleton/index";
import ReactPaginate from "react-paginate";

interface IFilteredValues {
  title: string;
  batch: string;
  category: string;
  section: string;
  type: string;
  createdBy: string;
  startTime: string | Date;
  week: string;
  day: string;
}

const StudentLecture = () => {
  const [filterValues, setFilterValues] = useState<IFilteredValues>({
    title: "",
    batch: "",
    category: "",
    section: "",
    type: "",
    createdBy: "",
    startTime: "",
    week: "",
    day: "",
  });
  const [isLoading, setLoading] = useState<boolean>();
  const [lecturesData, setLecturesData] = useState<ILectureResponse[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const [lectureDataLength, setLectureDataLength] = useState<number>(0);

  // calling service for getting list for lectures
  const GetLectures = () => {
    setLoading(true)
    LectureStudentSearchService(filterValues).then((res: any) => {
      setLoading(false)
      if (res.length > 0) {
        setLecturesData(res);
      } else if (res.data.success === false) {
        setIsOpen(true);
        setBody("These values did not match the lecture data!");
      }
    });
  };

  useEffect(() => {
    const fetchLecture = async () => {
      setLoading(true);
      try {
        const res = await GettAllStudentLectureService();
        setLecturesData(res);
        setLectureDataLength(res.length);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLecture();
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const ITEMS_PER_PAGE = 2;
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedLecturesData = lecturesData?.slice(startIndex, endIndex);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const Reset = () => {
    setFilterValues({
      title: "",
      batch: "",
      category: "",
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
              w="15%"
              mt="20px"
              fontSize={isLargerThan900 ? "16px" : "12px"}
              color="white"
              bg="rgb(31 41 55)"
              // isLoading={isLoading}
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={GetLectures}
            >
              Filter
            </Button>
            <Button
              w="15%"
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
      <Box w="90%" ml="5%" bg="white" h="auto">
        {isLoading && <Skeleton />}
        {lecturesData && <TableHeading LecturesData={paginatedLecturesData} />}
      </Box>
      <Flex
        className="react-paginate"
        justify="space-between"
        align="center"
        ml="60px"
        mr="60px"
        boxShadow="base"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box>
          <Box>
            Showing{" "}
            <span className="nameSpan">{currentPage * ITEMS_PER_PAGE + 1}</span>{" "}
            to{" "}
            <span className="nameSpan">
              {(currentPage + 1) * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="nameSpan">{lectureDataLength}</span>
          </Box>
        </Box>
        <Box>
          <ReactPaginate
            pageCount={Math.ceil(lectureDataLength / ITEMS_PER_PAGE)}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            activeClassName={"active"}
          />
        </Box>
      </Flex>
    </div>
  );
};

export default StudentLecture;

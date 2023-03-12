
import { Box, Flex, Button, useMediaQuery, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import TableHeading from "../../../components/StudentSideComponents/StudentLectureComponents/LectureTable/LecturesTable";
import {
  LectureStudentSearchService,
  GettAllStudentLectureService,
} from "../../../Services/LectureServices";
import { ILectureResponse } from "../../../Services/LectureInterface";
import LectureSearchInput from "../../../components/StudentSideComponents/StudentLectureComponents/LectureSearchInput"
import SecondNavbar from "../../../components/StudentSideComponents/StudentLectureComponents/SecondNavbar";
import Skeleton from "./../../../components/Skeleton/index";
import Pagination from "../../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";

interface SearchQuery {
  [key: string]: string;
}

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



  const [lecturesData, setLecturesData] = useState<ILectureResponse[]>([]);
  const [paginatedData, setPaginatedData] = useState<ILectureResponse[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPage] = useState(1);
  const [startIndex, setStartIndex] = useState<number>(1)
  const [endIndex, setEndIndex] = useState<number>()



  const GetLectures = async () => {
    try {
      const response = await LectureStudentSearchService(filterValues);

      if (response.length > 0) {
        setPaginatedData(response);
        setCurrentPage(1);
        setTotalPages(Math.ceil(response.length / 2));
      } else {
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }

  };

  const fetchLecture = async () => {
    try {
      const response = await GettAllStudentLectureService();
      if (response) {
        setCurrentPage(1);

        setPaginatedData(response)
        setTotalPages(Math.ceil(response.length / 6));
        setItemsPage(6)
      }
    } catch (error) {
      // setIsOpen(true);
    }
  }

  useEffect(() => {
    fetchLecture();
  }, []);

  useEffect(() => {
    if (paginatedData) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setStartIndex(startIndex + 1)
      setEndIndex(endIndex)
      const lecturedata = paginatedData.slice(startIndex, endIndex)
      if (endIndex > paginatedData.length) {
        setEndIndex(paginatedData.length)
      } else {
        setEndIndex(endIndex)
      }
      setLecturesData(lecturedata)
    }
  }, [currentPage, itemsPerPage, paginatedData])

  const useSearch = (): [SearchQuery, (newSearch: SearchQuery) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prevSearchParamsRef = useRef(searchParams.toString());

    useEffect(() => {
      const currentSearchParams = searchParams.toString();
      if (prevSearchParamsRef.current !== currentSearchParams) {
        prevSearchParamsRef.current = currentSearchParams;
      }
    }, [searchParams]);

    const updateSearch = (newSearch: SearchQuery): void => {
      const params = new URLSearchParams(prevSearchParamsRef.current);

      Object.entries(newSearch).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      setSearchParams(params.toString());
    };

    const currentSearch = Array.from(searchParams.entries()).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );

    return [currentSearch, updateSearch];
  };
  const [search, updateSearch] = useSearch();
  const handlePageChange = (page: any) => {

    updateSearch({
      ...search,
      page: page,
    });
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
    fetchLecture();
  };
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  return (
    <div className="container">
      <Navbar />
      <SecondNavbar />
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
        {lecturesData.length>0 ? (<TableHeading LecturesData={lecturesData} />) : (<Skeleton />)}
      </Box>
      <Flex
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
            <Text ml="30px">Showing <span className="nameSpan">{startIndex}</span> to <span className="nameSpan">{endIndex}</span>  of <span className="nameSpan">{paginatedData.length}</span> results</Text>
          </Box>
          <Box >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
            setPage={setCurrentPage}
            lectureData={paginatedData}
            perPage={itemsPerPage}
            setLectureData={setLecturesData}
          />
        </Box>
      </Flex>
    </div>
  );
};

export default StudentLecture;

import {
  Box,
  Flex,
  Button,
  useMediaQuery,
  Divider,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import Secondnav from "../../../components/AdminsideComponents/AdminLecture/LectureSearchNavbar";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import TableHeading from "../../../components/AdminsideComponents/AdminLecture/LecturesTable";
import {
  GetAllLectureService,
  LectureSearchService,
} from "../../../Services/LectureServices";

import CommonModalComponent from "../../../components/Modal/commonModal";
import LectureSearchInput from "../../../components/AdminsideComponents/AdminLecture/LectureSearchInput";
import Loader from "../../../components/Modal/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import { ILectureResponse } from "../../../Services/LectureInterface";

interface SearchQuery {
  [key: string]: string;
}

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
  const [lecturesData, setLecturesData] = useState<ILectureResponse[]>([]);
 const [paginatedData,setPaginatedData] = useState([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPage] = useState(1);
const [startIndex,setStartIndex] = useState<number>(1)
const [endIndex,setEndIndex] = useState<number>()
const navigate = useNavigate();
  //user search and get lectures by provideing different values
  const GetLecturesByFilter = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    GetLectures();
  };

  const GetLectures = async () => {
    try {
      const response = await LectureSearchService(filterValues);
      if (response?.length) {
    
        setPaginatedData(response);
        setCurrentPage(1);
        setTotalPages(Math.ceil(response?.length/6));
      } else {
        setIsOpen(true);
        setModalErrorBody(
          "There was a discrepancy between these values and the lecture data!"
        );
      }
    } catch (error) {
      setIsOpen(true);
      setModalErrorBody(
        "I'm sorry about that! There is no data found, so please check the values"
      );
    }
  };


  const fetchData = async () => {
    try {
      const response = await GetAllLectureService();

      if (response) {
            setCurrentPage(response?.pageNumber+1);
       
        setPaginatedData(response?.content)
        setTotalPages(Math.ceil(response?.content?.length/6));
       // setLecturesData(response.content);
        setItemsPage(6)
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

  useEffect(()=>{
    if(paginatedData){
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
      setStartIndex(startIndex+1)
      setEndIndex(endIndex)
    const lecturedata=  paginatedData.slice(startIndex,endIndex)
    if(endIndex >paginatedData.length){
      setEndIndex(paginatedData.length)
    }else{
      setEndIndex(endIndex)
    }
 
    setLecturesData(lecturedata)
    }
  },[currentPage,itemsPerPage,paginatedData])




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
    updateSearch({});
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
  //  window.history.pushState({}, "", window.location.pathname);
  navigate("");
    fetchData();
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
            setLecturesData={setLecturesData}
            search={search}
            updateSearch={updateSearch}
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
        {lecturesData.length ? (
          <TableHeading LecturesData={lecturesData} />
        ) : (
          <Loader />
        )}
        <Divider />

        <Box mt="40px">
          <Flex justifyContent="space-between">
            <Text ml="30px">Showing {startIndex  } to {endIndex}  of {paginatedData.length} results</Text>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={handlePageChange}
              setPage={setCurrentPage}
              lectureData={paginatedData}
              perPage= {itemsPerPage}
              setLectureData= {setLecturesData}
            />
          </Flex>
        </Box>
        <Divider mt="20px" />
      </Box>
      
    </div>
  );
};

export default AdminLecture;

import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import React,{useState,useEffect} from "react";
import BookMarkNav from "../../../components/StudentSideComponents/BookMarks/BookMarkNav";
import "./index.css";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ILectureResponse } from "../../../Services/LectureInterface";
import { GetAllBookMarksService } from "../../../Services/LectureServices";
import CommonModalComponent from "../../../components/Modal/commonModal";


const BookMarks = () => {
 const [bookMarks,setBookMarks] = useState<ILectureResponse[]>()
 const [isOpen, setIsOpen] = useState<boolean>(false);
 const [modalBody, setModalErrorBody] = useState<string>("");

  //getting all bookmarks when user enters into page by using useEffect
  useEffect(() => {
    const fetchData = async () => {
     const id = Number(localStorage.getItem("uerId"))
      try {
        const response = await  GetAllBookMarksService(id);
        if(response.length){
        setBookMarks(response);
        }
      } catch (error) {
        setIsOpen(true);
        setModalErrorBody(
          "Sorry about that! There is a scheduled downtime on your servers, so please check them"
        );
      }
    };
    fetchData(); 
  }, []);

  return (
    <div className="container">
      <Navbar />
      <BookMarkNav />
      <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
      <Box
        w="90%"
        ml="5%"
        mt="60px"
        h="auto">
          <Text fontSize="20px">Lectures</Text>
        <Box w="100%" bg="white" h="100%" borderRadius="10px"  boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
          <Flex
            padding="10px"
            bg="rgb(249,250,251)"
            justifyContent="space-between"
          >
            <Text pl="20px">TITLE</Text>
            <Text>AUTHOR</Text>
            <Text>SCHEDULE</Text>
            <Text mr="70px"></Text>
          </Flex>
          <Divider />
          {bookMarks && bookMarks.map((el) => (
            <div>
              <Flex padding="10px" justifyContent="space-between">
                <Text pl="20px">{el.title}</Text>
                <Text ml="20px">{el.createdBy}</Text>
                <Text ml="30px">
                  <>
                  {el.schedule}
                  
                  </></Text>
                <Link to={"/student/lectures/" + el.lectureId}>
                  {" "}
                  <Text pr="20px" color="blue">
                    View
                  </Text>
                </Link>
              </Flex>
              <Divider />
            </div>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default BookMarks;

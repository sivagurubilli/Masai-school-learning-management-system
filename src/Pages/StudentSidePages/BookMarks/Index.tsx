import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import React,{useState,useEffect} from "react";
import BookMarkNav from "../../../components/StudentSideComponents/BookMarks/BookMarkNav";
import "./index.css";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IBookMarkObject } from "../../../Services/LectureInterface";
import { GetAllBookMarksService } from "../../../Services/LectureServices";


const BookMarks = () => {
 const [bookMarks,setBookMarks] = useState<IBookMarkObject[]>()

  const ele = [
    { tile: "siva", author: "ravi", schedule: "1234njdjjdjd", id: 3 },
  ];

  useEffect(() => {
    GetAllBookMarksService().then((res) => {
      setBookMarks(res);
    });
  }, []);

  return (
    <div className="container">
      <Navbar />
      <BookMarkNav />
      <Box
        w="90%"
        ml="5%"
        mt="60px"
        h="auto" 
      >
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

          {ele.map((el) => (
            <div>
              <Flex padding="10px" justifyContent="space-between">
                <Text pl="20px">{el.tile}</Text>
                <Text ml="20px">{el.author}</Text>
                <Text ml="30px">{el.schedule}</Text>
                <Link to={"/student/bookmarks/" + el.id}>
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  ButtonGroup,
  useMediaQuery,
  Text,
  Badge,
} from "@chakra-ui/react";
import { LectureSingleService } from "../../../Services/LectureServices";
import { ILectureResponse } from "../../../Services/LectureInterface";

// this component is navbar below component in dash board page
const BookMarkDetailsNavbar = ({ id }: any) => {
  const navigate = useNavigate();
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [lectureDetail, setLectureDetails] = useState<ILectureResponse>();
  const [isBookmark, setBookmark] = useState<Boolean>(true);
  useEffect(() => {
    LectureSingleService(id).then((res) => {
      setLectureDetails(res);
    });
  }, [id]);

  const addBookmark = () => {
    setBookmark(!isBookmark);
  };

  const removeBookmark = () => {
    setBookmark(!isBookmark);
  };
  return (
    <Box bg="white" p={2} boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
      <Flex
        h={isLargerThan900 ? "60px" : "auto"}
        direction={isLargerThan900 ? "row" : "column"}
        alignItems="center"
        justifyContent="space-between"
        borderRadius="5px"
        maxW="1200px"
        mx="auto"
      >
        <Box mb={isLargerThan900 ? 0 : 2}>
          <Flex>
            <Text fontSize="20px">RCT-211-B17.W2.L2 </Text>
            <Badge bg="orange" size="sm" borderRadius="10px" p="6px" ml="10px">
              coding
            </Badge>
            <Badge
              bg="blue.100"
              size="sm"
              borderRadius="10px"
              p="6px"
              ml="10px"
            >
              video
            </Badge>
          </Flex>
          <Text>MANISH KUMAR (28 JUN, 22 - 3:00 PM)</Text>
        </Box>

        <ButtonGroup spacing={2}>
          {isBookmark ? (
            <Flex
              cursor="pointer"
              p="8px"
              onClick={removeBookmark}
              boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
              borderRadius="5px"
            >
              <Box mr="10px">
                <i className="fa-solid fa-bookmark" />{" "}
              </Box>
              <Text fontSize="14px">Remove BookMark</Text>
            </Flex>
          ) : (
            <Flex
              cursor="pointer"
              onClick={addBookmark}
              p="8px"
              boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
              borderRadius="5px"
            >
              <Box mr="10px">
                <i className="fa-regular fa-bookmark" />
              </Box>{" "}
              <Text fontSize="14px"> BookMark</Text>
            </Flex>
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default BookMarkDetailsNavbar;

import React, { useState, useEffect } from "react";
import "../AdminLecturePage/index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar";
import { useParams } from "react-router-dom";
import SecondNavforLectureDetail from "./SecondNavforLectureview";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { LectureDetailkeys } from "../CreateLecturePage/ConstantsforCreateLecture";
import "../AdminLecturePage/index.css";
import { LectureSingleService } from "../../../Services/LectureServices";
import {
  ILectureResponse,
  ISingledata,
} from "../../../Services/LectureInterface";

const AdminLectureDetail = () => {
  const { id } = useParams();
  const [lectureDetail, setLectureDetail] = useState<
    ILectureResponse | undefined
  >();
  const [isVideoActive, setVideoActive] = useState<boolean>(false);
  const keyValueArray = Object.entries(LectureDetailkeys);
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  const handeleClick = () => {
    setVideoActive(!isVideoActive);
  };

  useEffect(() => {
    LectureSingleService(id).then((res) => {
      setLectureDetail(res);
    });
  }, [id]);

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        bg="gray.50"
        pb="20%"
      >
        <Navbar />
        <SecondNavforLectureDetail id={id} />
        <Box
          flex="1"
          mx={{ base: "10%", md: "20%" }}
          mt={{ base: "10%", md: "3%" }}
          bg="white"
          textAlign="start"
          boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
          h="auto"
        >
          <Box p="3%" h="120px">
            <Text>React redux with crud app lecture</Text>
            <Flex alignItems="center" flexWrap="wrap">
              <Text>fw1233 |</Text>
              <Text ml="10px">rct 201 |</Text>
              <Badge
                bg="orange"
                size="sm"
                borderRadius="10px"
                p="6px"
                ml="10px"
              >
                Check Attendance
              </Badge>
            </Flex>
            <Text>Siva Gurubilli </Text>
          </Box>
          <Divider />
          <Box w="100%">
            {keyValueArray.map(([key, value], index) => (
              <Flex
                h="auto"
                p="20px"
                bg={index % 2 == 1 ? "gray.100" : "white"}
              >
                <Box display={index == 0 ? "none" : "block"} w="50%">
                  <Text>{key}</Text>
                </Box>
                <Box display={index == 0 ? "none" : "block"} w="50%">
                  <Text>{value}</Text>
                </Box>
              </Flex>
            ))}
          </Box>

          <Divider />
          <Flex
            w="100%"
            bg="white"
            h="100px"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="25px" color="blue">
              Lecture Video
            </Text>
          </Flex>
          <Flex w="100%" h="60px">
            <Flex
              h="40px"
              w="50%"
              cursor="pointer"
              className={isVideoActive ? "" : "activeVimeo"}
              onClick={handeleClick}
              justifyContent="center"
            >
              <Text color="blue">Vimeo Video</Text>
            </Flex>
            <Flex
              h="40px"
              w="50%"
              cursor="pointer"
              className={isVideoActive ? "activeS3" : ""}
              onClick={handeleClick}
              justifyContent="center"
            >
              <Text color="blue">S3 Video</Text>
            </Flex>
          </Flex>
          <Flex
            fontSize="20px"
            color="blue"
            w="100%"
            h="60px"
            justifyContent="center"
            alignItems="center"
          >
            {isVideoActive
              ? "No S3 video Available"
              : "No Vimeo Video Availble"}
          </Flex>
          <Divider />
          <Flex mt="30px" p="20px" justifyContent="space-between">
            <Box>
              <Text color="blue">Upload Video</Text>
              <Input type="file" placeholder="choose file" />
            </Box>
            <Button
              mt="20px"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              color="white"
            >
              Save Video
            </Button>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default AdminLectureDetail;

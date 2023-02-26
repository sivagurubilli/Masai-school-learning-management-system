import React, { useState ,useEffect} from "react";
import "./index.css";
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
} from "@chakra-ui/react";
import { LectureDetailkeys } from "../CreateLecturePage/ConstantsforCreateLecture";
import "./index.css";
import { LectureSingleService } from "../../../Services/LectureServices";
import { ILectureResponse, ISingledata } from "../../../Services/LectureInterface";

const AdminLectureDetail = () => {
  const { id } = useParams();
  const [lectureDetail, setLectureDetail] = useState<ILectureResponse | undefined>();
  const [isVideoActive, setVideoActive] = useState<boolean>(false);

  const handeleClick = () => {
    setVideoActive(!isVideoActive);
  };
useEffect(()=>{
LectureSingleService(id).then((res)=>{
  setLectureDetail(res)
})
},[id])
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
          <Flex justifyContent={"space-around"}>
            <Box w="50%">
              {LectureDetailkeys.map((el) => (
                <Box
                  bg={el.value % 2 == 1 ? "gray.100" : "white"}
                  h="60px"
                  p="20px"
                >
                  <Text>{el.key}</Text>
                </Box>
              ))}
            </Box>
            <Box w="50%">
              <Box bg="gray.100" h="60px" p="20px">
                <Text>React redux with crud app lecture</Text>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex flexWrap="wrap">
                  <Badge p="6px" bg="orange" borderRadius="10px" color="white">
                    CODING
                  </Badge>
                  <Badge
                    ml="10px"
                    p="6px"
                    borderRadius="10px"
                    bg="blue.500"
                    color="white"
                  >
                    VIDEO
                  </Badge>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Text>1996-33-45 - 12.90pm</Text>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Text>1996-33-45 - 12.90pm</Text>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Badge p="6px" bg="blue.500" borderRadius="10px" color="white">
                  CODING
                </Badge>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Text>Kovela</Text>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Text>Yes</Text>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Text>YES</Text>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Text>Zoom Link</Text>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Text>Concluding Date</Text>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Text>Updating At</Text>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Text></Text>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Text></Text>
              </Box>
            </Box>
          </Flex>

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
              save video
            </Button>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default AdminLectureDetail;

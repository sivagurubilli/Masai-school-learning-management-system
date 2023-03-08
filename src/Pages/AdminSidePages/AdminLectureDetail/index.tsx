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
} from "@chakra-ui/react";
import "../AdminLecturePage/index.css";
import { AddVideoFileService, LectureSingleService } from "../../../Services/LectureServices";
import {
  ILectureResponse,
} from "../../../Services/LectureInterface";
import CommonModalComponent from "../../../components/Modal/commonModal";
import Loading from "../../../components/Modal/Loader";

const AdminLectureDetail = () => {
  
  const [lectureDetail, setLectureDetail] = useState<
    ILectureResponse 
  >();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [videoFile,setVideoFile ]= useState<File | null>(null);
  const [isVideoActive, setVideoActive] = useState<boolean>(false);
  const keyValueArray = lectureDetail ? Object.entries(lectureDetail) : [];
  const { id } = useParams();
  const handeleClick = () => {
    setVideoActive(!isVideoActive);
  };

  useEffect(() => {
    const fetchData = async ()=> {
      try{
    const response = await LectureSingleService(id);
    if(response.lectureid){
      setLectureDetail(response);
    }
      }catch(error){
        setIsOpen(true);
        setModalErrorBody(
          "Sorry about that! There is a scheduled downtime on your servers, so please check them"
        );
      }
    }
    fetchData()
  }, [id]);

  // get the video file by onChange 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setVideoFile(prevFile => file);
    }
  };
  
  // uploading video file 
  const uploadFile =async()=>{ 
    try{
      const response = await AddVideoFileService(id,videoFile)
      if(response.message){
        setIsOpen(true)
        setModalErrorBody("Video added to the lecture successfully")
      }
    }catch(error){
      setIsOpen(true)
      setModalErrorBody("Video not added to the lecture please try again!")
    }
  }
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
        {!lectureDetail?.title ? (<Box mt="10%" ml="50%"><Loading /></Box>):

        ( <div>
        <SecondNavforLectureDetail id={id} />
        <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
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
            <Text>{lectureDetail?.title}</Text>
            <Flex alignItems="center" flexWrap="wrap">
              <Text>{lectureDetail?.batch} |</Text>
              <Text ml="10px">{lectureDetail?.section} |</Text>
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
            <Text>{lectureDetail?.createdBy}</Text>
          </Box>
          <Divider />
          <Box w="100%">
            {keyValueArray.map(([key, value], index) => (
              <Flex
              key={index}
                h="auto"
                p="20px"
                bg={index % 2 === 1 ? "gray.100" : "white"}
              >
                <Box display={index === 0 ? "none" : "block"} w="50%">
                  <Text>{key}</Text>
                </Box>
                <Box display={index === 0 ? "none" : "block"} w="50%">
                  <Text>{value ? value+"  ":""}</Text>
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
              <Input type="file" placeholder="choose file" onChange={handleFileChange} />
            </Box>
            <Button
              mt="20px"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              color="white"
              onClick={uploadFile}
            >
              Save Video
            </Button>
          </Flex>
        </Box>
        
        </div>)
}
      </Box>
    </div>
  );
};

export default AdminLectureDetail;

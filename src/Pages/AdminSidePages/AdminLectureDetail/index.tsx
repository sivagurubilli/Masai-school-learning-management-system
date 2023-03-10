import React, { useState, useEffect, useCallback } from "react";
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
import "../AdminLecturePage/index.css";
import {
  AddVideoFileService,
  LectureSingleService,
} from "../../../Services/LectureServices";

import CommonModalComponent from "../../../components/Modal/commonModal";
import Loading from "../../../components/Modal/Loader";
import {
  adminListMap,
  BatchListMap,
  CategoryMap,
  SectionListMap,
  TypeListMap,
} from "../../../assets/assets";


const AdminLectureDetail = () => {
  const [lectureDetail, setLectureDetail] = useState({
    lectureId: "",
    title: "",
    batch: "",
    category: "",
    section: "",
    type: "",
    schedule: new Date(),
    concludes: new Date(),
    createdBy: "",
    tags: [],
    hideVideo: false,
    optional: false,
    zoomLink: "",
    week: "",
    day: "",
    notes: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [videoFile, setVideoFile] = useState<string | undefined>(undefined);
  const [isVideoActive, setVideoActive] = useState<boolean>(false);

  const keyValueArray = lectureDetail ? Object.entries(lectureDetail) : [];
  const { id } = useParams();


  const handeleClick = () => {
    setVideoActive(!isVideoActive);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await LectureSingleService(id);
      if (response.title) {
        setLectureDetail(response);
      }
    } catch (error) {
      setIsOpen(true);
      setModalErrorBody(
        "Sorry about that! There is a scheduled downtime on your servers, so please check them"
      );
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const BElem = BatchListMap.find(
      (el) => Number(el.key) === Number(lectureDetail?.batch)
    );
    const SElem = SectionListMap.find(
      (el) => Number(el.key) === Number(lectureDetail?.section)
    );
    const UserElem = adminListMap?.find(
      (el) => Number(el.id) === Number(lectureDetail?.createdBy)
    );

    const CategoryElem = CategoryMap.find(
      (el) => Number(el.id) === Number(lectureDetail?.category)
    );
    const TypeElem = TypeListMap.find(
      (el) => Number(el.id) === Number(lectureDetail?.type)
    );

    
    if (BElem && SElem && CategoryElem && TypeElem && UserElem) {
      setLectureDetail({
        ...lectureDetail,
        batch: BElem.el,
        section: SElem?.el,
        category: CategoryElem?.el,
        type: TypeElem.el,
        createdBy: UserElem?.el,
      });
    }
  }, [lectureDetail?.batch, lectureDetail]);

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  // get the video file by onChange
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target!.files;
    if (files) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = (event) => {
        console.log(event.target?.result);
        const fileEvent = event.target?.result;
        if (typeof fileEvent === "string") {
          setVideoFile(fileEvent);
        } else {
          const arrayBuffer = fileEvent as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          const convertedString = String.fromCharCode.apply(
            null,
            Array.from(uint8Array)
          );
          setVideoFile(convertedString);
        }
      };
    }
  };

  // uploading video file
  const uploadFile = async () => {
    try {
      const response = await AddVideoFileService(id, videoFile);
      console.log(videoFile)
      if (response.message) {
        setIsOpen(true);
        setModalErrorBody("Video added to the lecture successfully");
      }
    } catch (error) {
      setIsOpen(true);
      setModalErrorBody("Video not added to the lecture please try again!");
    }
  };
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
        {!lectureDetail?.title ? (
          <Box mt="1%">
            <Loading />
          </Box>
        ) : (
          <div>
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
                      <Text>{value ? value + "  " : ""}</Text>
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
                  <Input
                    type="file"
                    placeholder="choose file"
                    onChange={handleFileChange}
                    accept="video/*"
                  />
                </Box>
                <Button
                  mt="20px"
                  bg="rgb(31 41 55)"
                  _hover={{ bg: "rgb(76, 84, 95)" }}
                  color="white"
                  onClick={uploadFile}
                  fontSize={isLargerThan900 ? "16px" : "12px"}
                >
                  Save Video
                </Button>
              </Flex>
            </Box>
            <Box mt="100px" w="40%" h="500px" ml="30%">
    {videoFile && <video src={videoFile} controls />}
    </Box>
          </div>
        )}
      </Box>
    
    </div>
  );
};

export default AdminLectureDetail;

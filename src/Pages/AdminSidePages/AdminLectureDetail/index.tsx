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
  getBatchArrray,
  getSectionArray,
  getUserArray,
  getTypeArray,
  getCategoryArray,
} from "../../../Services/SelelctionService";
import {
  IBatchObject,
  ICategoryObject,
  ISectionObject,
  ITypeObject,
  IUserObject,
} from "../../../Services/SelectionInterface";

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
    video:{
      id:"",
      data:""
    }
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [videoFile, setVideoFile] = useState<string | undefined | File>(undefined);
  const [isVideoActive, setVideoActive] = useState<boolean>(false);
  const [isLoading,setLoading] = useState(true)
  const [batchArray, setBatchArray] = useState<IBatchObject[]>();
  const [sectionArray, setSectionArray] = useState<ISectionObject[]>();
  const [userArray, setUserArray] = useState<IUserObject[]>();
  const [typeArray, setTypeArray] = useState<ITypeObject[]>();
const [categoryArray,setCategoryArray] = useState<ICategoryObject[]>()
const [url,setUrl] = useState("")
  const keyValueArray = lectureDetail ? Object.entries(lectureDetail) : [];
  const { id } = useParams();

  const getDropDownArrays = useCallback(async () => {
    try {
      const [batchArray, categoryArray, sectionArray, typeArray, userArray] =
        await Promise.all([
          getBatchArrray(),
          getCategoryArray(),
          getSectionArray(),
          getTypeArray(),
          getUserArray(),
        ]);
      if (batchArray.length) {
        setBatchArray(batchArray);
      }

      if (sectionArray.length) {
        setSectionArray(sectionArray);
      }
      if (categoryArray.length) {
        setCategoryArray(categoryArray);
      }
      if (typeArray.length) {
        setTypeArray(typeArray);
      }
      if (userArray.length) {
        setUserArray(userArray);
      }
    } catch (error) {
      setIsOpen(true);
      setModalErrorBody(
        "Oh no! There was a problem with getting the items from the selecting list"
      );
    }
  }, [
    
  ]);

  useEffect(() => {
    getDropDownArrays();
  }, [getDropDownArrays]);

useEffect(()=>{
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 6000);
},[])
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
    const BElem = batchArray?.find(
      (el) => Number(el.batchId) === Number(lectureDetail?.batch)
    );
    const SElem = sectionArray?.find(
      (el) => Number(el.sectionId) === Number(lectureDetail?.section)
    );
    const UserElem = userArray?.find(
      (el) => Number(el.id) === Number(lectureDetail?.createdBy)
    );

    const CategoryElem = categoryArray?.find(
      (el) => Number(el.id) === Number(lectureDetail?.category)
    );
    const TypeElem = typeArray?.find(
      (el) => Number(el.id) === Number(lectureDetail?.type)
    );

    if (BElem && SElem && CategoryElem && TypeElem && UserElem) {
      setLectureDetail({
        ...lectureDetail,
        batch: BElem.batch,
        section: SElem?.section,
        category: CategoryElem?.categoryName,
        type: TypeElem.type,
        createdBy: UserElem?.name,
      });
    }
  }, [ lectureDetail,batchArray, categoryArray, sectionArray, typeArray,userArray]);

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  // get the video file by onChange
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const files = event.target!.files;
 
    if (files) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {   
        const fileEvent = event.target?.result;
        if (typeof fileEvent === "string") {
         
          const base64String =fileEvent.replace(/^data:video\/mp4;base64,/, '')
          setVideoFile(base64String)
        
        } else {
          const arrayBuffer = fileEvent as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          const convertedString = String.fromCharCode.apply(
            null,
            Array.from(uint8Array)
          )
          setVideoFile(convertedString);
        }
      };
    }
  };
 
 

  useEffect(()=>{
    if(lectureDetail?.video?.data){
      const binaryData = atob(lectureDetail?.video?.data);
      const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "video/mp4" });
    const url1 = URL.createObjectURL(blob);
    setUrl(url1)

  }

  },[lectureDetail?.video?.data])

  const uploadFile = async () => {
    try {
      const response = await AddVideoFileService(videoFile,id);
    
      if (response.message) {
        fetchData();
        setIsOpen(true);
        setModalErrorBody("Video added to the lecture successfully");
      }else{
        setIsOpen(true);
      setModalErrorBody("Video not added to the lecture please try again!");
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

        <div>
          <CommonModalComponent
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalBody={modalBody}
          />
          { isLoading ? (
            <Box mt="1%">
              <Loading />
            </Box>
          ) : (
            <div>
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
                      display={key === "video" ? "none" : "flex"}
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
                    <Text color="blue"> Video 1</Text>
                  </Flex>
                  <Flex
                    h="40px"
                    w="50%"
                    cursor="pointer"
                    className={isVideoActive ? "activeS3" : ""}
                    onClick={handeleClick}
                    justifyContent="center"
                  >
                    <Text color="blue"> Video 2</Text>
                  </Flex>
                </Flex>
                <Flex
                  fontSize="20px"
                  color="blue"
                  w="100%"
                  h="auto"
                  justifyContent="center"
                  alignItems="center"
                >
                  {!isVideoActive
                   &&    lectureDetail?.video?.data ?
                   
                    
                    <Box mt="50px" w="60%" h="350px" ml="20%"  
                   bg="white"
                   justifyContent="center"
                   alignItems="center">
                
                <video src ={url} controls />
      
 
               </Box> :
                     "No Video Availble"
                   }
                </Flex>
                <Divider mt="20px" />
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

           
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default AdminLectureDetail;
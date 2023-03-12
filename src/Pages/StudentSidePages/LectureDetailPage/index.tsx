import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import { Box, Flex, WrapItem, Button, Wrap, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import { LectureSingleService } from "../../../Services/LectureServices";
import { BiBookmark } from "react-icons/bi";
import "./index.css";
import moment from "moment";
import DetailTab from "./../../../components/StudentSideComponents/StudentLectureComponents/Tabs/DetailTab";
import axios from "axios";
import Skeleton from "../../../components/Skeleton/index";
import {getBatchArrray,getCategoryArray,getSectionArray,getTypeArray,getUserArray} from "../../../Services/SelelctionService"
import { IBatchObject, ICategoryObject, ISectionObject, ITypeObject, IUserObject } from './../../../Services/SelectionInterface';
import CommonModalComponent from "../../../components/Modal/commonModal";

const StudentLectureDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [batchArray, setBatchArray] = useState<IBatchObject[]>();
  const [sectionArray, setSectionArray] = useState<ISectionObject[]>();
  const [userArray, setUserArray] = useState<IUserObject[]>();
  const [typeArray, setTypeArray] = useState<ITypeObject[]>();
const [categoryArray,setCategoryArray] = useState<ICategoryObject[]>()
  const [lectureDetail, setLectureDetail] = useState({
    lectureId:"",
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
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [zoomLinkActive, setZoomLinkActive] = useState<boolean>(false);
  const [isOpen,setIsOpen]= useState<boolean>(false)
  const [modalErrorBody,setModalErrorBody]=useState<string>("")

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





  useEffect(() => {
    const fetchLecture = async () => {
      setLoading(true);
      try {
        const res = await LectureSingleService(id);
        setLectureDetail(res);
        const formattedStartDate = moment(res.schedule).format(
          "D MMM YY h:mm "
        );
        const formattedEndDate = moment(res.concludes).format("h:mm A");
        setStartTime(formattedStartDate);
        setEndTime(formattedEndDate);
        const currentTime = moment();
        const subtractTime = moment(res.concludes);
        const resultInSeconds = currentTime.diff(subtractTime, "seconds");
        if (resultInSeconds < 0) {
          setZoomLinkActive(true);
        } else {
          setZoomLinkActive(false);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLecture();
  }, [id]);

  const handleDownload = async () => {
    const videoUrl =
      "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
    const response = await fetch(videoUrl, { mode: "no-cors" });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    console.log(url);
    setDownloadLink(url);

    const a = document.createElement("a");
    a.href = url;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleBookmarkClick = async () => {   
    try {
      const userId = localStorage.getItem("userId");
      if (isBookmarked) {
        await axios.delete(`http://3.27.61.194:8082/api/${userId}/${lectureDetail.lectureId}`);
        setIsBookmarked(false);
      } else {
        await axios.post("http://3.27.61.194:8082/api/bookmark/", {"userId":userId,"lectureId":lectureDetail.lectureId,"status":true});
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinMeetingClick = (lectureDetail:any) => {
    window.open(lectureDetail.zoomLink, "_blank");
  };

  const handleZoomSettingsClick = () => {
      window.location.href = "https://us06web.zoom.us/profile/setting";
  };

  return (
    <div>
      <Navbar />
      <CommonModalComponent  isOpen={isOpen} modalBody={modalErrorBody}/>
      {loading && <Skeleton />}
      {lectureDetail && (
        <Box>
          <Flex
            justify="space-between"
            align="center"
            m="10"
            mt="50"
            boxShadow="base"
            p="6"
            rounded="md"
            bg="white"
          >
            <Box>
              <Flex>
                <Box
                  color="blue"
                  fontSize="20"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  {lectureDetail.title}
                </Box>

                <span className="live2">{lectureDetail.category}</span>
                {lectureDetail.type === "Reading" ? (
                  <span className="live3">{lectureDetail.type}</span>
                ) : (
                  <span className="live">{lectureDetail.type}</span>
                )}
              </Flex>
              <Text>
                {" "}
                <span className="nameSpan">{lectureDetail.createdBy}</span>{" "}
                {startTime && <span>{`(${startTime} - ${endTime})`}</span>}
              </Text>
            </Box>
            <Box>
              <Wrap spacing={4}>
                <WrapItem>
                  <Button onClick={handleBookmarkClick}>
                    {" "}
                    <span>
                      <BiBookmark />
                    </span>{" "}
                    {isBookmarked ? "Remove bookmark" : "Bookmark"}
                  </Button>
                </WrapItem>
                <WrapItem>
                  {lectureDetail.type === "Video" && (
                    <Button onClick={handleDownload}>
                      {" "}
                      <span>
                        <AiOutlineDownload />
                      </span>{" "}
                      download
                    </Button>
                  )}
                </WrapItem>
              </Wrap>
            </Box>
          </Flex>

          {lectureDetail && zoomLinkActive && lectureDetail.type === "Live" && (
            <Box m="auto" bg="blue">
              <Box p="50px">
                <Flex
                  align="center"
                  justify="center"
                  color="white"
                  bg="blue"
                  p="10px"
                >
                  Mute your microphone while joining a meeting
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  color="white"
                  bg="blue"
                  p="10px"
                >
                  <Text
                    textDecoration="underline"
                    onClick={handleZoomSettingsClick}
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    Zoom Settings
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  color="white"
                  bg="blue"
                  p="10px"
                >
                  <Button
                    color="blue"
                    bg="white"
                    onClick={() => handleJoinMeetingClick(lectureDetail)}
                  >
                    Join Zoom Session
                  </Button>
                </Flex>
              </Box>
            </Box>
          )}

          <Box m="40px" boxShadow="md" p="6" rounded="base" bg="white">
            <DetailTab lectureDetail={lectureDetail} lectureId={id} />
          </Box>
        </Box>
      )}

      {downloadLink && (
        <a href={downloadLink}>Click here to download the video</a>
      )}
    </div>
  );
};

export default StudentLectureDetail;

import React, { useState,useEffect } from "react";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import {
  Box,
  Flex,
  WrapItem,
  Button,
  Wrap,
  Text,
} from "@chakra-ui/react";
import {useParams } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import { LectureSingleService } from "../../../Services/LectureServices";
import {BiBookmark} from "react-icons/bi"
import "./index.css";
import moment from 'moment';
import {
  ILectureResponse,
} from "../../../Services/LectureInterface";
import DetailTab from "./../../../components/StudentSideComponents/StudentLectureComponents/Tabs/DetailTab";
import axios from 'axios';
import Skeleton from "../../../components/Skeleton/index";

const StudentLectureDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [lectureDetail, setLectureDetail] = useState<ILectureResponse | undefined>();
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [startTime, setStartTime]=useState<string>("")
  const [endTime, setEndTime]=useState<string>("")
  const [loading, setLoading]=useState<boolean>()
  const [zoomLinkActive, setZoomLinkActive]=useState<boolean>(false)

  useEffect(() => {
    const fetchLecture = async () => {
      setLoading(true)
      try {
        const res = await LectureSingleService(id);
        setLectureDetail(res);
        const formattedStartDate = moment(res.schedule).format('D MMM YY h:mm ');
        const formattedEndDate = moment(res.concludes).format('h:mm A');
        setStartTime(formattedStartDate)
        setEndTime(formattedEndDate)


      // const formattedStartDate = moment(res.schedule).format('D MMM YY h:mm ');
        // const formattedEndDate = moment(res.concludes).format('h:mm A');
        // setStartTime(formattedStartDate)
        // setEndTime(formattedEndDate)
        // setLoading(false)

        // Require moment.js library


// Get current time
const currentTime = moment();

// Define a specific time to subtract from the current time
const subtractTime = moment(res.concludes);

// Subtract the specific time from the current time and show result in seconds
const resultInSeconds = currentTime.diff(subtractTime, 'seconds');

// Log the result
console.log(resultInSeconds);
if(resultInSeconds<0){
  setZoomLinkActive(true)
}else{
  setZoomLinkActive(false)
}


        setLoading(false)
      } catch (err) {
        console.error(err);
      }
    };
    fetchLecture();
  }, []);
  

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

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      axios
        .delete(`http://localhost:8070/bookmark/${id}`)
        .then(() => {
          setIsBookmarked(false);
        })
        .catch((err:any) => {
          console.error(err);
        });
    }else {
      axios
        .post("http://localhost:8070/bookmark", lectureDetail)
        .then(() => {
          setIsBookmarked(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }


  const handleJoinMeetingClick = (lectureDetail:ILectureResponse) => {
    // window.open(lectureDetail.zoomLink, '_blank');
};

const handleZoomSettingsClick = () => {
    // window.location.href = ZOOM_SETTINGS_URL;
};

  return (
    <div>
      <Navbar />
      {loading && <Skeleton/>}




   

      



      {lectureDetail && <Box>
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
            {lectureDetail.type==="Reading" ?  <span className="live3">{lectureDetail.type}</span>: <span className="live">{lectureDetail.type}</span>}
          </Flex>
          <Text>
            {" "}
            <span className="nameSpan">{ lectureDetail.createdBy}</span>{" "}
            {startTime && <span>{`(${startTime} - ${endTime})`}</span>}
          </Text>
        </Box>
        <Box>
          <Wrap spacing={4}>
            <WrapItem>
              <Button onClick={handleBookmarkClick}>
              {" "}
                <span>
                <BiBookmark/>
                </span>{" "}
              {isBookmarked ? "Remove bookmark" : "Bookmark"}
              </Button>
            </WrapItem>
            <WrapItem>
              {lectureDetail.type==="Video" && <Button onClick={handleDownload}>
                {" "}
                <span>
                  <AiOutlineDownload />
                </span>{" "}
                download
              </Button>}
              
            </WrapItem>
          </Wrap>
        </Box>
      </Flex>

      {lectureDetail && zoomLinkActive && lectureDetail.type=="Live" && <Box m='auto' bg='blue'>
            <Box  p='50px'>
                <Flex
                    align="center"
                    justify="center"
                    color='white'
                    bg='blue'
                    p='10px'>
                    Mute your microphone while joining a meeting
                </Flex>
                <Flex
                    align="center"
                    justify="center"
                    color='white'
                    bg='blue'
                    p='10px'>
                    
                        <Text textDecoration="underline" onClick={handleZoomSettingsClick}>Zoom Settings</Text>   
                </Flex>
                <Flex
                    align="center"
                    justify="center"
                    color='white'
                    bg='blue'
                    p='10px'>
                    <Button color='blue' bg='white' onClick={()=>handleJoinMeetingClick(lectureDetail)}>
                        Join Zoom Session
                    </Button>
                </Flex>
            </Box>
        </Box>}


      <Box m="40px" boxShadow="md" p="6" rounded="base" bg="white">
        <DetailTab lectureDetail={lectureDetail} lectureId={id}/>
      </Box>
      </Box>} 

      {downloadLink && (
        <a href={downloadLink}>Click here to download the video</a>
      )}
    </div>
  );
};

export default StudentLectureDetail;

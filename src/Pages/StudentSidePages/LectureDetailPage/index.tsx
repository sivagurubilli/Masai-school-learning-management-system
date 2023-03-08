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
import { useParams } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import { LectureSingleService } from "../../../Services/LectureServices";
import Video from "./../../../components/StudentSideComponents/StudentLectureComponents/Video";
import "./index.css";
import {
  ILectureResponse,
} from "../../../Services/LectureInterface";
import DetailTab from "./../../../components/StudentSideComponents/StudentLectureComponents/Tabs/DetailTab";

const StudentLectureDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [lectureDetail, setLectureDetail] = useState<
  ILectureResponse | undefined
>();
  const [downloadLink, setDownloadLink] = useState<string>("");

  useEffect(() => {
    LectureSingleService(id).then((res) => {
      setLectureDetail(res);
    });
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
  return (
    <div>
      <Navbar />
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
            <span className="live">{lectureDetail.type}</span>
          </Flex>
          <Text>
            {" "}
            <span className="nameSpan">{ lectureDetail.createdBy}</span>{" "}
            <span>{lectureDetail.schedule.toLocaleString()}</span>
          </Text>
        </Box>
        <Box>
          <Wrap spacing={4}>
            <WrapItem>
              <Button>Bookmark</Button>
            </WrapItem>
            <WrapItem>
              <Button onClick={handleDownload}>
                {" "}
                <span>
                  <AiOutlineDownload />
                </span>{" "}
                download
              </Button>
            </WrapItem>
          </Wrap>
        </Box>
      </Flex>

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

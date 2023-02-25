import React, { useState } from "react";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
  Flex,
  WrapItem,
  Button,
  Wrap,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import * as videoMetadataThumbnails from "video-metadata-thumbnails";
import Video from "./Video";
import "./index.css";

const StudentLectureDetail = () => {
  const [downloadLink, setDownloadLink] = useState<string>("");

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
            <Box>CSBT Intervantion || Weekly Connect</Box>
          </Flex>
          <Box>lkdsnf</Box>
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
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em" h="80px">
            <Tab
              _selected={{
                borderBottomWidth: "5px",
                borderBottomColor: "#504de6",
              }}
              _hover={{ bg: 'gray.100' }}
            >
              <Link className="link" to="/student/lectures/:id">
                Details
              </Link>
            </Tab>
            <Tab
              _selected={{
                borderBottomWidth: "5px",
                borderBottomColor: "#504de6",
              }}
              _hover={{ bg: 'gray.100' }}
            >
              <Link className="link" to="/student/lectures/:id/discussion">
                Discussions
              </Link>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Video />
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {downloadLink && (
        <a href={downloadLink}>Click here to download the video</a>
      )}
    </div>
  );
};

export default StudentLectureDetail;

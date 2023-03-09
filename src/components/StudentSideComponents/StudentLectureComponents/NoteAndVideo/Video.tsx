import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ILectureResponse } from "../../../../Services/LectureInterface";

interface VideoTabProps {
  lectureDetail: ILectureResponse;
}

const Video = ({ lectureDetail }: VideoTabProps) => {
  return (
    <Box>
      {lectureDetail.type === "Video" && (
        <Box m="auto">
          <Flex
            align="center"
            justify="center"
            fontSize={26}
            fontWeight="bold"
            color="#504de6"
          >
            Lecture Video
          </Flex>
          <Box
            m="auto"
            w="70%"
            as="video"
            controls
            src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
          />
        </Box>
      )}
    </Box>
  );
};

export default Video;

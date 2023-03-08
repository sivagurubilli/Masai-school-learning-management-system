import React from "react";
import { Box,  Flex } from "@chakra-ui/react";

const Video = () => {
  return (
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
  );
};

export default Video;

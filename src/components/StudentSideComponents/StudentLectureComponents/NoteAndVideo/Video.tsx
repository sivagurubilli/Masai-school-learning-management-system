import React,{ useEffect, useState} from "react";
import { Box, Flex } from "@chakra-ui/react";



const Video = ({ lectureDetail }:any) => {

const [url,setUrl] = useState("")

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
 
  return (
    <Box>
      {lectureDetail.type  && (
        <Box m="auto" mt="100px"  boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
          <Flex
            align="center"
            justify="center"
            fontSize={26}
            fontWeight="bold"
            color="#504de6"
          >
            Lecture Video
          </Flex>
          {lectureDetail?.video?.data && <video style={{width:"80%", marginLeft:"10%" ,height:"300px"} } src ={url} controls />}
      


          
        </Box>
      )}
    </Box>
  );
};

export default Video;

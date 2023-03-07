import React, { useState } from "react";
import {  Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  ButtonGroup,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { LectureDeleteService } from "../../../Services/LectureServices";
import ModalComponent from "../../../components/Modal/ModalComponent";


// this component is lecture page navbar down below component
const SecondNavforLectureDetail = ({ id }: { id: string | undefined  }) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  const [isOpen, setIsOpen] = useState<boolean>(false);
const handleOpen=()=>setIsOpen(true)
  const DeleteLecture =()=>{
   LectureDeleteService(id).then((res)=>{
       setIsOpen(false)
   })
  }
  return (
    <Box bg="white" pt="20px" pb="20px">
    <ModalComponent DeleteLecture={DeleteLecture} isOpen={isOpen} setIsOpen={setIsOpen} /> 
      <Flex
        direction={isLargerThan900 ? "row" : "column"}
        alignItems="center"
        justifyContent="space-around"
        borderRadius="5px"
        maxW="1200px"
        mx="auto"
        flexWrap="wrap">
        <Box mb={isLargerThan900 ? 0 : 2}>
          <Heading size="md">Lectures</Heading>
        </Box>
        <ButtonGroup spacing={2}>
          <Flex flexWrap="wrap">
          <Link to={`/admin/lectures`}>
            <Button
              h={isLargerThan900 ? "35px" : "30px"}
              mt="10px"
              ml="10px"
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
            >
              Back
            </Button>
          </Link>
          <Link to={`/admin/lectures/edit/${id}`}>
            <Button
               mt="10px"
               ml="10px"
              h={isLargerThan900 ? "35px" : "30px"}
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
            >
              Edit
            </Button>
          </Link>
          <Button
             mt="10px"
             ml="10px"
            bg="rgb(31 41 55)"
            h={isLargerThan900 ? "35px" : "30px"}
            color="white"
            _hover={{ bg: "rgb(76, 84, 95)" }}>
            Discussions
          </Button>
          <Link to={`/admin/lectures/copy/${id}`}>
          <Button
             mt="10px"
             ml="10px"
            h={isLargerThan900 ? "35px" : "30px"}
            color="white"
            bg="rgb(31 41 55)"
            _hover={{ bg: "rgb(76, 84, 95)" }}
            >
            Copy
          </Button>
          </Link>
          <Button
             mt="10px"
             ml="10px"
            bg="red"
            h={isLargerThan900 ? "35px" : "30px"}
            color="white"
            _hover={{ bg: "red.200" }}
            onClick={handleOpen}
            >
            Delete
          </Button>
          </Flex>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default SecondNavforLectureDetail;
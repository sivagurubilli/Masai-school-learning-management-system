import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Heading,
  ButtonGroup,
  Button,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";


// this component is lecture page navbar down below component
const SecondNavforLectureDetail = ({ id }: { id: string | undefined }) => {
  const navigate = useNavigate();
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const DeleteLecture =()=>{
   
  }
  return (
    <Box bg="white" pt="20px" pb="20px">

<Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
        
          <ModalBody>
            <p>Do you want to delete this Lecture</p>
          </ModalBody>
          <ModalFooter>
          <Button variant="ghost" onClick={DeleteLecture}>
             Confirm Delete
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
          <Link to={`/admin/lectures`}>
            <Button
              h={isLargerThan900 ? "35px" : "auto"}
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
            >
              BACK
            </Button>
          </Link>
          <Link to={`/admin/lectures/edit/${id}`}>
            <Button
              h={isLargerThan900 ? "35px" : "auto"}
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
            >
              EDIT
            </Button>
          </Link>
          <Button
            bg="rgb(31 41 55)"
            h={isLargerThan900 ? "35px" : "auto"}
            color="white"
            _hover={{ bg: "rgb(76, 84, 95)" }}>
            DISCUSSIONS
          </Button>
          <Link to={`/admin/lectures/copy/${id}`}>
          <Button
            h={isLargerThan900 ? "35px" : "auto"}
            color="white"
            bg="rgb(31 41 55)"
            _hover={{ bg: "rgb(76, 84, 95)" }}
            
            >
            COPY
          </Button>
          </Link>
          <Button
            bg="red"
            h={isLargerThan900 ? "35px" : "auto"}
            color="white"
            _hover={{ bg: "red.200" }}
            onClick={ handleOpen}
            >
            DELETE
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default SecondNavforLectureDetail;
import React from "react";
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

// this component is lecture page navbar down below component
const SecondNavforLectureCreate = () => {
  const buttons =[{label:"Back",tag:"lectures"},{label:"Discussions",tag:"discussions"},{label:"Copy",tag:"copy"}]
  const navigate = useNavigate();
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Box bg="white" pt="20px" pb="20px">
      <Flex
        direction={isLargerThan900 ? "row" : "column"}
        alignItems="center"
        justifyContent="space-between"
        borderRadius="5px"
        maxW="1200px"
        mx="auto"
        flexWrap="wrap">
        <Box mb={isLargerThan900 ? 0 : 2}>
          <Heading size="md">Lectures</Heading>
        </Box>
        <ButtonGroup spacing={2}>
          {buttons.map((el)=>(
          <Link to={"/admin/"+el.tag}>
           <Button
              h={isLargerThan900 ? "35px" :"30px"}
              w={isLargerThan900 ? "120px" :"80px"}
              fontSize={isLargerThan900 ? "16px" :"12px"}
              color="white"
            bg="rgb(31 41 55)"
            _hover={{ bg: "rgb(76, 84, 95)"}}>
             { el.label}
            </Button>
          </Link>
          ))
        }
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default SecondNavforLectureCreate;
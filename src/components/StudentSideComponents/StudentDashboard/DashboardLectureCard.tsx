import { Badge, Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const DashboardLectureCard = () => {



  return (
    <div>
      <Box w="100%" p="10px" pb="10px">
        <Flex w="100%" h="auto" justifyContent="space-between">
          <Flex w="60%">
            <Box minWidth="100px" w="20%" textAlign="center" bg="rgb(20,110,190)" borderRadius="10px" color="white">
              <Flex justifyContent="center" mt="20px" alignItems="center">
                <i className="fa-solid fa-calendar-days"></i>
                <Text ml="20px">7:30 pm </Text>
              </Flex>
              <Text>Lecture</Text>
            </Box>
            <Box p="10px" pl="20px" w="70%">
              <Link to="">
                <Text
                  color="rgb(20,110,190)"
                  fontSize="18px"
                  fontWeight="medium"
                >
                  23 jan lecture
                </Text>
              </Link>
              <Text>kunal starting at 10.30 pm </Text>
              <Flex>
                <Badge
                  bg="blue.200"
                  size="sm"
                  borderRadius="10px"
                  color="blackAlpha.700"
                  p="6px"
                  ml="10px"
                >
                  {" "}
                  coding
                </Badge>
                <Badge
                  bg="blue.200"
                  size="sm"
                  color="blackAlpha.700"
                  borderRadius="10px"
                  p="6px"
                  ml="10px"
                >
                  live
                </Badge>
              </Flex>
            </Box>
          </Flex>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="15%"
          >
            <Link to="">
              <Text
                color="rgb(20,110,190)"
                mr="10px"
                fontSize="18px"
                fontWeight="medium"
              >
                Details{" "}
              </Text>
            </Link>
            <i className="fa-solid fa-angle-right"></i>
          </Box>
        </Flex>
      </Box>
      <Divider />
    </div>
  );
};

export default DashboardLectureCard;

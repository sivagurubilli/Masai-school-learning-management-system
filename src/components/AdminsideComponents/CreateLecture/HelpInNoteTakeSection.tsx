import { Box, Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { HelperSectionValues } from "../../../Pages/AdminSidePages/CreateLecturePage/ConstantsforCreateLecture";

const HelpInNoteTakeSection = () => {

  return (
    <div>
      <Box ml="20px" w="100%" h="auto" >
        <Text fontSize="25px">Mark Down Basics</Text>
        <Text>Below you will find some common mark down syntax.</Text>
        <Spacer />
        <Text mt="20px" fontSize={"22px"}>
          Bold & itallic
        </Text>
        <Flex mt="10px">
          <Text fontStyle="italic">italics</Text>{" "}
          
          <Text ml="20px">*asterics*</Text>
        </Flex>
        <Flex>
          <Text fontStyle="bold">Bold</Text>{" "}
          <Text ml="20px">**double asterics**</Text>
        </Flex>
        <Divider mt="20px"/>
        <Text mt="40px" fontSize={"22px"}>
          Code
        </Text>
        <Text mt="10px">inline Code</Text>
        <Text pl="10px" w="90px" bg="blue.100">
          `backtick`
        </Text>
        <Text mt="20px">Code Block</Text>
        <Text pl="10px" bg="blue.100">
          ```
          <br />
          Three backticks and enter your code blocks handleRemoveTag
          <br />
          ```
        </Text>
        <Divider mt="20px"/>
        <Text fontSize="24px" mt="30px">
          Heading
        </Text>
        <Text mt="10px" fontSize="22px">
          # This is Heading 1
        </Text>
        <Text fontSize="20px">## This is Heading 2</Text>
        <Text fontSize="18px">### This is Heading 3</Text>
        <Divider mt="20px"/>
        <Text fontSize="20px" mt="30px">
          Quotes
        </Text>
        <Text> type greater than simble and write your quote here</Text> 
        {HelperSectionValues.map((el) => (
          <div>
            <Text fontSize="20px" mt="30px">
              {el.heading}
            </Text>
            <Text mt="10px">{el.data}</Text>
            <Text mt="10px" bg="blue.100" p="10px">
              {el.example}
            </Text>
            <Divider mt="20px"/>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default HelpInNoteTakeSection;

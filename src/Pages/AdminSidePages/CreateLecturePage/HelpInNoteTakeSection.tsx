import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { HelperSectionValues } from "./ConstantsforCreateLecture";

const HelpInNoteTakeSection = () => {

  return (
    <div>
      <Box ml="20px" w="50%" h="auto">
        <Text>Below you will find some common mark down syntax.</Text>
        <Spacer />
        <Text mt="20px" fontSize={"25px"}>
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
        <Text mt="40px" fontSize={"25px"}>
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
          Three backticks and ener your code blocks handleRemoveTag
          <br />
          ```
        </Text>
        <Text fontSize="24px" mt="30px">
          Heading
        </Text>
        <Text mt="10px" fontSize="22px">
          # This is Heading 1
        </Text>
        <Text fontSize="20px">## This is Heading 2</Text>
        <Text fontSize="18px">### This is Heading 3</Text>
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
          </div>
        ))}
      </Box>
    </div>
  );
};

export default HelpInNoteTakeSection;

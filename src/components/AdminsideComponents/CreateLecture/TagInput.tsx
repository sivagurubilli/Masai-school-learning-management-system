import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  FormLabel,
} from "@chakra-ui/react";
import { Categoery } from "../../../assets/assets";


const TagInput = ({ LectureValues, setLectureValues }: any) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestion, setSuggestions] = useState<string[]>([]);


  //on clicking on tag it added tgs array lecturevalues as well

  const handleTagClick = (tag: string) => {
    if (!LectureValues.tags.includes(tag)) {
      setLectureValues({
        ...LectureValues,
        tags: [...LectureValues.tags, tag],
      });
    }
  };
  //removing tags from tag list
  const handleRemoveTag = (tag1: any) => {
    setLectureValues({
      ...LectureValues,
      tags: LectureValues.tags.filter((tag: any) => tag !== tag1),
    });
  };

  useEffect(() => {
    Categoery.map((el) => {
      if (el.key === LectureValues.category) {
        setSuggestions(el.tags);
      }
    });
  }, [LectureValues.category]);

  return (
    <div>
      <FormLabel mt="10px" color="rgb(75 85 99)">
        Tags (comma seperated)
      </FormLabel>
      <Flex
        flexWrap="wrap"
        minH="40px"
        maxH="auto"
        border="1px solid rgb(203,213,224)"
        p="7px"
        borderRadius="7px"
        onClick={() => setShowSuggestions(!showSuggestions)}
      >
        {LectureValues.tags?.map((tag: any) => (
          <Flex
            style={{ borderRadius: "10px" }}
            ml="10px"
            w="auto"
            p="4px"
            mt="5px"
            pl="10px"
            pr="10px"
            color="blackAlpha.900"
            justify="space-around"
            alignItems="center"
            fontSize="13px"
            bg="blue.100"
            key={tag}
          >
            {tag}{" "}
            <li
              style={{
                listStyle: "none",
                marginLeft: "10px",
                cursor: "pointer",
                color: "black",
              }}
              onClick={() => handleRemoveTag(tag)}
            >
              x
            </li>
          </Flex>
        ))}
      </Flex>
      {showSuggestions && (
        <Flex
          flexWrap="wrap"
          mt="10px"
          w="100%"
          bg="white"
          h="auto"
          border="1px soild grey"
        >
          {suggestion.map((suggestion) => (
            <Box
              style={{ borderRadius: "10px" }}
              ml="10px"
              h="auto"
              p="4px"
              pl="5px"
              pr="10px"
              color="blackAlpha.900"
              mt="5px"
              alignItems="center"
              fontSize="13px"
              bg="blue.100"
              cursor="pointer"
              key={suggestion}
              onClick={() => handleTagClick(suggestion)}
            >
              {suggestion}{" "}
            </Box>
          ))}
        </Flex>
      )}
    </div>
  );
};

export default TagInput;

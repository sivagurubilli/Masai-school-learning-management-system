import React, { useState, useEffect } from "react";
import { Box, Flex, FormLabel, Text } from "@chakra-ui/react";
import {  Categoery } from "../../../assets/assets";

const TagInput = ({ values, LectureValues, setLectureValues }: any) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestionTags, setSuggestionsTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(values.tags);

 
  //on clicking on tag it added tgs array lecturevalues as well
  const handleTagClick = (tag: string) => {
    if (!LectureValues.tags.includes(tag)) {
      setTags([...tags, tag]);
      setLectureValues({
        ...LectureValues,
        tags: [...LectureValues.tags, tag],
      });
    }
  };

  //removing tags from tag list
  const handleRemoveTag = (tag1: string) => {
    const Filtertag: any = tags.filter((tag: any) => tag !== tag1);
    setLectureValues({
      ...LectureValues,
      tags: Filtertag,
    });
    setTags(Filtertag);
  };

  const ShowSuggetion = () => {
    setShowSuggestions(!showSuggestions);
  };

  useEffect(() => {
    setLectureValues({ ...values, tags: tags });
  }, [values, setLectureValues, tags]);

  useEffect(() => {
    const categoryElement = Categoery.find((el) => el.id === values.category);
    if (categoryElement) {
      setSuggestionsTags(categoryElement.tags);
    } else {
      setSuggestionsTags([]);
    }
  }, [values.category]);


  return (
    <div>
      <FormLabel mt="10px" color="rgb(75 85 99)">
        Tags 
      </FormLabel>
      <Flex
        flexWrap="wrap"
        minH="40px"
        maxH="auto"
        border="1px solid rgb(203,213,224)"
        p="7px"
        borderRadius="7px"
        onClick={ShowSuggetion}
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
      {LectureValues.category && (
        <Flex
          flexWrap="wrap"
          mt="10px"
          w="100%"
          bg="white"
          h="auto"
          border="1px soild grey"
        >
          {suggestionTags.map((suggestionTag: any) => (
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
              key={suggestionTag}
              onClick={() => handleTagClick(suggestionTag)}
            >
              {suggestionTag}{" "}
            </Box>
          ))}
        </Flex>
      )}
      {!LectureValues.category && (
        <Text color="orange" fontSize="14PX">
          Select Category to get the relevent tags
        </Text>
      )}
    </div>
  );
};

export default TagInput;

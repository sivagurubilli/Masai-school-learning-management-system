import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { suggestions } from "./ConstantsforCreateLecture";

interface TagInputProps {
  suggestions: string[];
}

const TagInput = ({ LectureValues, setLectureValues }: any) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const selectWidth = useBreakpointValue({ base: "100%", md: "auto" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowSuggestions(!!event.target.value);
  };

  //based on keyboard keys this function add remove tags from tags list
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue && !tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
        setInputValue("");
        setShowSuggestions(false);
      }
    } else if (event.key === "Backspace" && !inputValue) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  //on clicking on tag it added tgs array lecturevalues as well
  const handleTagClick = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setLectureValues({ ...LectureValues, tags: tags });
      setShowSuggestions(false);
    }
  };
  //removing tags from tag list
  const handleRemoveTag = (tag1: any) => {
    setTags(tags.filter((tag) => tag !== tag1));
  };

  const filteredSuggestions = inputValue
    ? suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(inputValue.toLowerCase())): [];

  return (
    <div>
      <FormLabel mt="10px" color="rgb(75 85 99)">
        Tags (comma seperated)
      </FormLabel>
      <Flex>
        {tags.map((tag) => (
          <Flex
            style={{ borderRadius: "10px" }}
            ml="10px"
            w="auto"
            p="4px"
            pr="10px"
            color="white"
            justify="space-around"
            alignItems="center"
            fontSize="13px"
            bg="grey"
            key={tag}
            onClick={() => handleTagClick(tag)}
          >
            {tag}{" "}
            <li
              style={{
                listStyle: "none",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              color="black"
              onClick={() => handleRemoveTag(tag)}
            >
              x
            </li>
          </Flex>
        ))}
      </Flex>
      <Box mt="10px">
        <Input
          name="tag"
          width={selectWidth}
          w="100%"
          h="20px"
          placeholder="Enter tags"
          color="rgb(75 85 99)"
          value={LectureValues.tag}
          onChange={handleInputChange}
          type="text"
          onKeyDown={handleKeyDown}
        />
      </Box>
      {showSuggestions && (
        <Box w="50%" bg="white" border="1px soild grey" h="auto">
          <ul>
            {filteredSuggestions.map((suggestion) => (
              <Text
                p="5px"
                key={suggestion}
                onClick={() => handleTagClick(suggestion)}
              >
                {suggestion}
              </Text>
            ))}
          </ul>
        </Box>
      )}
    </div>
  );
};

export default TagInput;

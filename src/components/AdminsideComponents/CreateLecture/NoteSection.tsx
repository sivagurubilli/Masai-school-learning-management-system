import React, { useState } from "react";
import {
  Box,
  Flex,
  FormLabel,
  Grid,
  Input,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";
import "../../../Pages/AdminSidePages/CreateLecturePage/index.css";
import HelpInNoteTakeSection from "./HelpInNoteTakeSection";
import Markdown from "./MarkDown";

interface IActiveButtons {
  write: boolean;
  preview: boolean;
  help: boolean;
}
const NoteSection = ({ handleChange,values,LectureValues, setLectureValues }: any) => {
  const [activeButtons, setActiveButtons] = useState<IActiveButtons>({
    write: true,
    preview: false,
    help: false,
  });
  const [activeText, setActiveText] = useState<string>("write");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    setSelectedFiles(files);
    setLectureValues({ ...LectureValues, notes: selectedFiles });
  }
  const gridColumn = useBreakpointValue({
    base: "1 / -1", // Full width on small screens
    md: "1 / 4", // Span two columns on medium screens
    lg: "1 / 5", // Span two columns starting from the second column on large screens
  });

 

  // this function is for when i click on notes it display
  // notes section and if i click on preview it should shows preview section

  const handleClick = (text: string) => {
    setActiveText(text);
    if (text === "write") {
      setActiveButtons({ write: true, help: false, preview: false });
    } else if (text === "preview") {
      setActiveButtons({ write: false, help: false, preview: true });
    } else {
      setActiveButtons({ write: false, help: true, preview: false });
    }
  };

  return (
    <Box w="100%" h="auto" bg="white">
      <FormLabel mt="30px" color="rgb(75 85 99)">
        Notes:
      </FormLabel>
      <Box
        display="flex"
        borderRadius="10px"
        justifyContent="space-between"
        pl="18px"
        pt="10px"
        pb="2px"
        bg="rgb(243,244,246)"
        w="100%"
        h="auto"
      >
        <Box w="35%">
          <Flex justifyContent={"space-between"} w="100%">
            <div
              className={activeText === "write" ? "activeText" : "default"}
              onClick={() => handleClick("write")}
            >
              <i
                style={{ marginRight: "10px" }}
                className="fa-solid fa-pen-to-square"
              ></i>{" "}
              Write{" "}
            </div>
            <div
              className={activeText === "preview" ? "activeText" : "default"}
              onClick={() => handleClick("preview")}
            >
              <i
                style={{ marginRight: "10px" }}
                className="fa-solid fa-eye"
              ></i>{" "}
              Preview{" "}
            </div>
            <div
              className={activeText === "help" ? "activeText" : "default"}
              onClick={() => handleClick("help")}
            >
              <i
                style={{ marginRight: "10px" }}
                className="fa-solid fa-circle-info"
              ></i>
              Help{" "}
            </div>
          </Flex>
        </Box>
        <Box>
       
          <Input
            name="notes"   
            type="file"
            accept="image/jpeg, image/png"
            display="none"
            onChange={handleFileSelect}
          >
      </Input>
            
        </Box>
      </Box>

      <Box w="100%" h="auto">
        <Grid mt="20px" templateColumns="repeat(4, 1fr)" gap={4}>
          {activeButtons.write ? (
            <Textarea
              name="notes"
              w="100%"
              resize="vertical"
              minH="400px"
              maxH="auto"
              lineHeight="tall"
              borderRadius="md"
              boxShadow="md"
              value={values.notes}
              gridColumn={gridColumn}
              color="rgb(75 85 99)"
              placeholder="Enter text"
              onChange={handleChange}
            />
          ) : null}
          {activeButtons.preview ? (
            <Markdown content={values.notes} />
          ) : null}
        </Grid>
        {activeButtons.help ? (
          <Box h="auto">
            <HelpInNoteTakeSection />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default NoteSection;

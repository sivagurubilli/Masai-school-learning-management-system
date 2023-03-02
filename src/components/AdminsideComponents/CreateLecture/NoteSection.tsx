import ReactMarkdown from "react-markdown";
import React, { useState } from "react";
import {
  Box,
  Flex,
  FormLabel,
  Grid,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";
import "../../../Pages/AdminSidePages/AdminLecturePage/index.css";
import HelpInNoteTakeSection from "./HelpInNoteTakeSection";

interface IActiveButtons {
  write: boolean;
  preview: boolean;
  help: boolean;
}
const NoteSection = ({ LectureValues, setLectureValues }: any) => {
  const [activeButtons, setActiveButtons] = useState<IActiveButtons>({
    write: true,
    preview: false,
    help: false,
  });
  const [activeText, setActiveText] = useState<string>("write");
  const gridColumn = useBreakpointValue({
    base: "1 / -1", // Full width on small screens
    md: "1 / 4", // Span two columns on medium screens
    lg: "1 / 5", // Span two columns starting from the second column on large screens
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setLectureValues({ ...LectureValues, [name]: value });
  };

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
    <div>
      <FormLabel mt="30px" color="rgb(75 85 99)">
        Give Notes For Lecture
      </FormLabel>
      <Box w="100%" >
      <Box w="50%">
        <Flex justifyContent={"space-between"}>
          <div
            className={activeText === "write" ? "activeText" : "default"}
            onClick={() => handleClick("write")}
          >
            Write{" "}
            <i
              style={{ marginLeft: "20px" }}
              className="fa-solid fa-pen-to-square"
            ></i>
          </div>
          <div
            className={activeText === "preview" ? "activeText" : "default"}
            onClick={() => handleClick("preview")}
          >
            Preview{" "}
            <i style={{ marginLeft: "20px" }} className="fa-solid fa-eye"></i>
          </div>
          <div
            className={activeText === "help" ? "activeText" : "default"}
            onClick={() => handleClick("help")}
          >
            Help{" "}
            <i
              style={{ marginLeft: "20px" }}
              className="fa-solid fa-circle-info"
            ></i>
          </div>
        </Flex>
      </Box>

      <Grid mt="20px" templateColumns="repeat(4, 1fr)" gap={4}>
        {activeButtons.write ? (
          <Textarea
            name="notes"
            value={LectureValues.notes}
            size="lg"
            resize="vertical"
            minH="400px"
            maxH="auto"
            lineHeight="tall"
            borderRadius="md"
            boxShadow="md"
            gridColumn={gridColumn}
            color="rgb(75 85 99)"
            placeholder="Enter text"
            onChange={handleTextChange}
          />
        ) : null}
        {activeButtons.preview ? (
          <ReactMarkdown children={LectureValues.notes} />
        ) : null}
      </Grid>
      {activeButtons.help ? <HelpInNoteTakeSection /> : null}     
</Box>
    </div>
  );
};

export default NoteSection;

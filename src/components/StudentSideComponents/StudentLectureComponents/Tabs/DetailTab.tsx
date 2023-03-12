import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Video from "../NoteAndVideo/Video";
import Note from "../NoteAndVideo/Note";
const DetailTab = ({ lectureDetail, lectureId }:any) => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em" h="80px">
        <Tab
          _selected={{
            borderBottomWidth: "3px",
            borderBottomColor: "#504de6",
          }}
          _hover={{ bg: "#f9fafb" }}
        >
          <Link className="link" to={`/student/lectures/${lectureId}`}>
            Details
          </Link>
        </Tab>
        <Tab
          _selected={{
            borderBottomWidth: "3px",
            borderBottomColor: "#504de6",
          }}
          _hover={{ bg: "#f9fafb" }}
        >
          <Link
            className="link"
            to={`/student/lectures/${lectureId}/discussion`}
          >
            Discussions
          </Link>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {lectureDetail.video && <Video lectureDetail={lectureDetail} />}
          {lectureDetail.notes && <Note lectureDetail={lectureDetail} />}
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DetailTab;

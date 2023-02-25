import React from "react";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Wrap,
  WrapItem,
  Button
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./index.css";

const StudentDiscussions = () => {
  return (
    <div>
      <Navbar />

      <Flex
        justify="space-between"
        align="center"
        m="10"
        mt="50"
        boxShadow="base"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box>
          <Flex>
            <Box>CSBT Intervantion || Weekly Connect</Box>
          </Flex>
          <Box>lkdsnf</Box>
        </Box>
        <Box>
          <Wrap spacing={4}>
            <WrapItem>
      <Button >Create discussion</Button>
    </WrapItem>
            </Wrap>
        </Box>
      </Flex>
      <Box m="40px" boxShadow="md" p="6" rounded="base" bg="white">
        <Tabs isFitted variant="enclosed" defaultIndex={1}>
          <TabList mb="1em" h="80px">
            <Tab
              _selected={{
                borderBottomWidth: "5px",
                borderBottomColor: "#504de6",
              }}
              _hover={{ bg: 'gray.100' }}
            >
              <Link className="link" to="/student/lectures/:id">
                Details
              </Link>
            </Tab>
            <Tab
              _selected={{
                borderBottomWidth: "5px",
                borderBottomColor: "#504de6",
              }}
              _hover={{ bg: 'gray.100' }}
            >
              <Link className="link" to="/student/lectures/:id/discussion">
                Discussions
              </Link>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel></TabPanel>
            <TabPanel>
              <Box boxShadow="md" p="6" rounded="md" bg="white" mt="100px">
                Pintu Gouda
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default StudentDiscussions;

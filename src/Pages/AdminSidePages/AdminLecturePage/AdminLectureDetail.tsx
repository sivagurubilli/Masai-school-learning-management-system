import React, { useState } from "react";
import "./index.css";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar";
import { useParams } from "react-router-dom";
import SecondNavforLectureDetail from "./SecondNavforLectureview";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";

const AdminLectureDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [lectureDetail, setLectureDetail] = useState({});

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        bg="gray.50"
        pb="20%"
      >
        <Navbar />
        <SecondNavforLectureDetail id={id} />
        <Box
          flex="1"
          mx={{ base: "10%", md: "20%" }}
          mt={{ base: "10%", md: "3%" }}
          bg="white"
          textAlign="start"
          boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
          h="auto"
        >
          <Box p="3%" h="120px">
            <Text>React redux with crud app lecture</Text>

            <Flex alignItems="center" flexWrap="wrap">
              <Text>fw1233 |</Text>
              <Text ml="10px">rct 201 |</Text>
              <Badge
                bg="orange"
                size="sm"
                borderRadius="10px"
                p="6px"
                ml="10px"
              >
                Check Attendance
              </Badge>
            </Flex>
            <Text>Siva Gurubilli </Text>
          </Box>
          <Flex justifyContent={"space-around"}>
            <Box w="50%">
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>Title</Text>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex flexWrap="wrap">
                  <Text>Category-Type</Text>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>Schedule</Text>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex>
                  <Text>Concludes</Text>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>Schedule</Text>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex>
                  <Text>User</Text>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>Optional</Text>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex>
                  <Text>Hide Video</Text>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>Zoom Link</Text>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex>
                  <Text>Conclde At</Text>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>Updating At</Text>
                </Flex>
              </Box>
            </Box>
            <Box w="50%">
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>React redux with crud app lecture</Text>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex flexWrap="wrap">
                  <Badge p="6px" bg="orange" borderRadius="10px" color="white">
                    CODING
                  </Badge>
                  <Badge
                    ml="10px"
                    p="6px"
                    borderRadius="10px"
                    bg="blue.500"
                    color="white"
                  >
                    VIDEO
                  </Badge>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>1996-33-45 - 12.90pm</Text>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex>
                  <Text>1996-33-45 - 12.90pm</Text>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Badge
                    p="6px"
                    bg="blue.500"
                    borderRadius="10px"
                    color="white"
                  >
                    CODING
                  </Badge>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex>
                  <Text>Kovela</Text>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>Yes</Text>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex>
                  <Text>YES</Text>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>Zoom Link</Text>
                </Flex>
              </Box>
              <Box bg="white" h="60px" p="20px">
                <Flex>
                  <Text>Concluding Date</Text>
                </Flex>
              </Box>
              <Box bg="gray.100" h="60px" p="20px">
                <Flex>
                  <Text>Updating At</Text>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default AdminLectureDetail;

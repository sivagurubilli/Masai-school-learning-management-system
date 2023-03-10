import React from "react";
import { Link } from "react-router-dom";
import {
  ILectureResponse,
  ISearchResponse,
} from "../../../Services/LectureInterface";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Button,
  Flex,
  TableContainer,
  Box,
} from "@chakra-ui/react";
const TableHeading = ({ LecturesData }: ISearchResponse) => {
  return (
    <div>
      <Box overflow={"auto"}>
        <TableContainer>
          <Table position="relative" w="100%">
            <Thead h="50px" bg="rgb(243,244,246)">
              <Tr>
                <Th w="6%">ID</Th>
                <Th w="35%">TITLE</Th>
                <Th w="15%">BATCH</Th>
                <Th w="15%">START TIME/CONCLUDES</Th>
                <Th w="15%">Week/Day</Th>
                <Th w="15%">VIEW & EDIT</Th>
              </Tr>
            </Thead>
            <Tbody w="100%">
              {LecturesData &&
                LecturesData?.map((lecture: ILectureResponse) => (
                  <Tr key={lecture.lectureId}>
                    <Td w="6%">{lecture.lectureId}</Td>
                    <Td w="35%">
                      <Text fontSize="20px">
                        {lecture.title}{" "}
                        <Badge
                          colorScheme={"green"}
                          variant="solid"
                          h="20px"
                          w="auto"
                          pl="8px"
                        >
                          {lecture.type}
                        </Badge>
                      </Text>
                      <Text>
                        <>
                          Created by {lecture.createdBy} ({lecture.category}) at{" "}
                          {lecture.schedule}
                        </>
                      </Text>
                    </Td>
                    <Td w="15%">{lecture.batch}</Td>
                    <Td w="15%">
                      <Text>
                        <>
                          Start At {lecture.schedule}
                          <br />
                          Conclude At {lecture.concludes}
                        </>
                      </Text>
                    </Td>
                    <Td w="15%">
                      <Flex>
                        <Badge
                          colorScheme={"green"}
                          variant="solid"
                          h="20px"
                          w="auto"
                          pl="8px"
                        >
                          {lecture.week}
                        </Badge>
                        <Badge
                          colorScheme={"blue"}
                          variant="solid"
                          h="20px"
                          ml="10px"
                          w="auto"
                        >
                          {lecture.day}
                        </Badge>
                      </Flex>{" "}
                    </Td>
                    <Td w="15%">
                      <Flex>
                        <Link to={`/admin/lectures/${lecture.lectureId}`}>
                          {" "}
                          <Button
                            variant="link"
                            textDecoration={"none"}
                            color="blue"
                          >
                            View
                          </Button>
                        </Link>
                        <Link to={`/admin/lectures/edit/${lecture.lectureId}`}>
                          {" "}
                          <Button
                            variant="link"
                            textDecoration={"none"}
                            color="blue"
                          >
                            Edit
                          </Button>
                        </Link>
                      </Flex>
                      <Button
                        variant="link"
                        textDecoration={"none"}
                        color="blue"
                      >
                        Attendance
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default TableHeading;

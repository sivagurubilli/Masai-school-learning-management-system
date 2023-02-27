import React from "react";
import moment from "moment";
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
import { useNavigate } from "react-router-dom";

const TableHeading = ({ LecturesData }: ISearchResponse) => {
  const navigate = useNavigate();

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
                LecturesData?.map((ad: ILectureResponse) => (
                  <Tr key={ad.lecturid}>
                    <Td w="6%">{ad.lecturid}</Td>
                    <Td w="35%">
                      <Text fontSize="20px">
                        {ad.title}{" "}
                        <Badge
                          colorScheme={"green"}
                          variant="solid"
                          h="20px"
                          w="40px"
                          pl="8px"
                        >
                          LIVE
                        </Badge>
                      </Text>
                      <Text>
                        <>
                          {moment(ad.schedule).format("MMM DD, YYYY h:mm A")}
                          <br />
                          by created at date
                          <br />
                          {moment(ad.concludes).format("MMM DD, YYYY h:mm A")}
                        </>
                      </Text>
                    </Td>
                    <Td w="15%">{ad.batch}</Td>
                    <Td w="15%">
                      {moment(ad.schedule).format("MMM DD, YYYY h:mm A")}
                      {moment(ad.concludes).format("MMM DD, YYYY h:mm A")}
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
                          {ad.week}
                          </Badge>
                          <Badge
                            colorScheme={"blue"}
                            variant="solid"
                            h="20px"
                            ml="10px"
                            w="auto"
                          >
                            {ad.day}
                          </Badge>
                       
                      </Flex>{" "}
                    </Td>
                    <Td w="15%">
                      <Flex>
                        <Link to={`/admin/lectures/${ad.lecturid}`}>
                          {" "}
                          <Button
                            variant="link"
                            textDecoration={"none"}
                            color="blue"
                          >
                            View
                          </Button>
                        </Link>
                        <Link to={`/admin/lectures/edit/${ad.lecturid}`}>
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
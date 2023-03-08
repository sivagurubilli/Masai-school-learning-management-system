import React from "react";
import moment from "moment";

import {
    ILectureResponse,
    ISearchResponse,
} from "../../../../Services/LectureInterface";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  TableContainer,
  Box,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { boolean } from "yup";
import TimeDetails from "../Time/Time";



const TableHeading = ({ LecturesData }: ISearchResponse) => {
  const navigate = useNavigate();

  const handleRedirect=(ad:ILectureResponse)=>{
        navigate(`/student/lectures/${ad.lectureid}`);
  }
    return (
        <div>
            <Box overflow={"auto"}>
                <TableContainer>
                    <Table position="relative" w="100%">
                        <Thead h="50px" bg="rgb(243,244,246)">
                            <Tr>
                                <Th w="35%">TITLE</Th>
                            </Tr>
                        </Thead>
                        <Tbody w="100%">
                            {LecturesData &&
                                LecturesData?.map((ad: ILectureResponse) => (
                                    <Tr key={ad.lectureid}
                                        _hover={{ bgColor: "#f9fafb" }}
                                        onClick={() => handleRedirect(ad)}
                                    >
                                        <Td w="35%"  >
                                           <Box>
                                                <Text fontSize="20px"
                                                    color="#4f46e5"
                                                    _hover={{ textDecoration: "underline" }}
                                                    cursor="pointer"
                                                >
                                                    {ad.title}{" "}
                                                    <Badge
                                                        colorScheme={"green"}
                                                        variant="solid"
                                                        h="20px"
                                                        w="auto"
                                                        pl="8px"
                                                    >
                                                        {ad.type}
                                                    </Badge>
                                                </Text>
                                            </Box>
                                            {/* <Text>
                                                <>
                                                    Created by {ad.createdBy} ({ad.category}) at {ad.schedule}
                                                </>
                                            </Text> */}
                                            <TimeDetails lecture={ad}/>
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

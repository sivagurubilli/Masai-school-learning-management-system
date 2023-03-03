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
                                <Th w="35%">TITLE</Th>
                            </Tr>
                        </Thead>
                        <Tbody w="100%">
                            {LecturesData &&
                                LecturesData?.map((ad: ILectureResponse) => (
                                    <Tr key={ad.lectureid}
                                        _hover={{ bgColor: "#f9fafb" }}
                                    >
                                        <Td w="35%">
                                            <Link to={`/student/lectures/${ad.lectureid}`}>
                                                <Text fontSize="20px"
                                                    color="#4f46e5"
                                                    _hover={{ textDecoration: "underline" }}
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
                                            </Link>
                                            <Text>
                                                <>
                                                    Created by {ad.user} ({ad.category}) at {ad.schedule}
                                                </>
                                            </Text>
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

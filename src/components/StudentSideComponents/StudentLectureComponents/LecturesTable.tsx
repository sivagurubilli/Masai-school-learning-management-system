<<<<<<< HEAD
import React from "react";
=======
import React,{useState} from "react";
import moment from "moment";
>>>>>>> b257bb573b74fdb2db1a5d4258c9f69bfa6e7e90
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
    TableContainer,
    Box,
} from "@chakra-ui/react";
<<<<<<< HEAD

const TableHeading = ({ LecturesData }: ISearchResponse) => {
=======
import { useNavigate } from "react-router-dom";
import { boolean } from "yup";



const TableHeading = ({ LecturesData }: ISearchResponse) => {
    const navigate = useNavigate(); 
>>>>>>> b257bb573b74fdb2db1a5d4258c9f69bfa6e7e90

  const handleRedirect=(ad:ILectureResponse)=>{
    const previousTime=moment(ad.concludes, 'DD-MM-YYYY HH:mm:ss')
    const currentTime = moment();
    const differenceInSeconds = currentTime.diff(previousTime, 'seconds');
     if (differenceInSeconds < 0) {
        window.open(ad.zoomLink, "_blank");
      } else {
        navigate(`/student/lectures/${ad.lectureid}`);
      }
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
                                            <Text>
                                                <>
                                                    Created by {ad.createdBy} ({ad.category}) at {ad.schedule}
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

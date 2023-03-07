import React from "react";
import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Flex,
    Input,
    Select,
    Button,
    Center
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import Video from "../Video";
import { ILectureResponse } from "./../../../../Services/LectureInterface";
import EmptyTab from "./EmptyTab";

interface DetailTabProps {
    lectureDetail: ILectureResponse;
    lectureId: string;
}

const DiscussionTab = ({ lectureDetail, lectureId }: DetailTabProps) => {
    return (
        <Tabs isFitted variant="enclosed" defaultIndex={1}>
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
                <TabPanel></TabPanel>
                <TabPanel>
                    <Box
                        h="300px"
                        m="20px"
                        boxShadow="md"
                        p="6"
                        rounded="md"
                        bg="white"
                    >
                        <Flex
                            bg='RGBA(0, 0, 0, 0.04)'
                            h='70px'
                            alignItems='center'
                        >
                            <Input
                                w="350px"
                                placeholder="Title"
                                ml='20px'
                                bg='white'
                            />
                            <Select w="350px" ml='20px' bg='white'>
                                <option value="">Is open</option>
                                <option value="">Is close</option>
                            </Select>
                            <Button bg='black' color='white' ml='100px'>RESET</Button>
                        </Flex>
                        <EmptyTab />
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default DiscussionTab;

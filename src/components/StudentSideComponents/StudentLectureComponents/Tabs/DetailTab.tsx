import React from 'react'
import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Flex,
    WrapItem,
    Button,
    Wrap,
    Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import Video from '../NoteAndVideo/Video';
import Note from '../NoteAndVideo/Note'
import {
    ILectureResponse,

} from "./../../../../Services/LectureInterface";

interface DetailTabProps {
    lectureDetail: ILectureResponse;
    lectureId: string;
}


const DetailTab = ({ lectureDetail, lectureId }: DetailTabProps) => {
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
                    <Link className="link" to={`/student/lectures/${lectureId}/discussion`}>
                        Discussions
                    </Link>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Video lectureDetail={lectureDetail} />
                    <Note lectureDetail={lectureDetail} />
                </TabPanel>
                <TabPanel></TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default DetailTab
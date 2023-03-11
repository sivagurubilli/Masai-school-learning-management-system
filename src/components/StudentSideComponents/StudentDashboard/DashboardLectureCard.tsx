import moment from "moment";
import { Badge, Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonModalComponent from "../../../components/Modal/commonModal";

const DashboardLectureCard = ({ lectureData }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const navigate = useNavigate();

  const goTolecture = () => {
    const targetTime = new Date("2023-03-11 20:00:00");
    const currentTime = new Date();

    const diffInSeconds = Math.floor(
      (targetTime.getTime() - currentTime.getTime()) / 1000
    );
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes > 10) {
      setIsOpen(true);
      setModalErrorBody(
        "Lectures can only be attended before 10 minutes"
      );
    } else {
      navigate("/student/lectures/" + lectureData.lectureId);
    }
  };

  return (
    <div>
      <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
      <Box w="100%" p="10px" pb="10px">
        <Flex w="100%" h="auto" justifyContent="space-between">
          <Flex w="60%">
            <Box
              minWidth="100px"
              w="20%"
              textAlign="center"
              bg="rgb(20,110,190)"
              borderRadius="10px"
              color="white"
            >
              <Flex justifyContent="center" mt="30px" alignItems="center">
                <i className="fa-solid fa-calendar-days"></i>
                <Text ml="10px">
                  {moment(lectureData.schedule).format("h:mm A")}{" "}
                </Text>
              </Flex>
              <Text>{lectureData.type}</Text>
            </Box>
            <Box p="10px" pl="20px" w="70%">
              <Link to="" onClick={goTolecture}>
                <Text
                  color="rgb(20,110,190)"
                  fontSize="18px"
                  fontWeight="medium"
                >
                  {" "}
                  {lectureData.title}
                </Text>
              </Link>
              <Text fontSize="16px" fontWeight="medium">
                {moment(lectureData.schedule).format("MMM D")} {lectureData.day}
              </Text>
              <Text fontWeight={"900px"}>
                {lectureData.createdBy} starting at{" "}
                {moment(lectureData.schedule).format("h:mm A")}{" "}
              </Text>
              <Flex>
                <Badge
                  bg="blue.200"
                  size="sm"
                  borderRadius="10px"
                  color="blackAlpha.700"
                  p="6px"
                  ml="10px"
                >
                  {" "}
                  {lectureData.category}
                </Badge>
                <Badge
                  bg="blue.200"
                  size="sm"
                  color="blackAlpha.700"
                  borderRadius="10px"
                  p="6px"
                  ml="10px"
                >
                  {lectureData.type}
                </Badge>
              </Flex>
            </Box>
          </Flex>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="15%"
          >
            <Link to="" onClick={goTolecture}>
              <Text
                color="rgb(20,110,190)"
                mr="10px"
                fontSize="18px"
                fontWeight="medium"
              >
                Details{" "}
              </Text>
            </Link>
            <i className="fa-solid fa-angle-right"></i>
          </Box>
        </Flex>
      </Box>
      <Divider />
    </div>
  );
};

export default DashboardLectureCard;

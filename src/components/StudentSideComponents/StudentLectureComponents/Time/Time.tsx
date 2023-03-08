import React from "react";
import moment from "moment";
import { ILectureResponse } from "../../../../Services/LectureInterface";
import { Text } from "@chakra-ui/react";
import "./Time.css"


type LectureDetailsProps = {
  lecture: ILectureResponse;
};

const TimeDetails = ({ lecture }: LectureDetailsProps) => {
  const formattedSchedule = moment(lecture.schedule).format(
    "MMM Do YY, h:mm a"
  );

  return (
    <Text>
       <span className="bolderSpan">{lecture.createdBy}</span> scheduled <span className="bolderSpan">({lecture.category})</span> at {formattedSchedule}
    </Text>
  );
};

export default TimeDetails;

import React, { useEffect, useState } from "react";
import "../../../Pages/AdminSidePages/CreateLecturePage/index.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {
  Container,
  Box,
  Grid,
  Input,
  Select,
  useBreakpointValue,
  Flex,
  Button,
  FormLabel,
  Text,
  FormControl,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { Categoery } from "../../../Assets/Assets";
import NoteSection from "./NoteSection";
import TagInput from "./TagInput";
import {
  getBatchArrray,
  getSectionArray,
  getUserArray,
  getTypeArray,
} from "../../../Services/SelelctionService";
import { IBatchObject, ISectionObject, ITypeObject, IUserObject } from "../../../Services/SelectionInterface";

const InputTakingSection = ({ LectureValues, setLectureValues }: any) => {
  const [isZoomlinkValid, setZoomLinkValid] = useState<boolean>(false);
  const [touched, setTouched] = useState({ zoomLink: false });
  const [batchArray, setBatchArray] = useState<IBatchObject[]>();
  const [sectionArray, setSectionArray] = useState<ISectionObject[]>();
  const [userArray, setUserArray] = useState<IUserObject[]>();
  const [typeArray, setTypeArray] = useState<ITypeObject[]>();

  useEffect(() => {
    getBatchArrray().then((res) => {
      setBatchArray(res);
    });

    getSectionArray().then((res) => {
      setSectionArray(res);
    });
    getUserArray().then((res) => {
      setUserArray(res);
    });
    getTypeArray().then((res) => {
      setTypeArray(res);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setLectureValues({ ...LectureValues, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setLectureValues({ ...LectureValues, schedule: date._d });
  };

  const handleDateConcludeChange = (date: any) => {
    setLectureValues({ ...LectureValues, conclude: date._d });
  };
  //input blur is for only when error showing in user inters into input feild
  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prevState) => ({ ...prevState, [event?.target.name]: true }));
  };

  //handle change event for select tags
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLectureValues({ ...LectureValues, [name]: value });
  };

  //for hide or show video
  const handleToggleHide = () => {
    setLectureValues({ ...LectureValues, hideVideo: !LectureValues.hideVideo });
    console.log(LectureValues);
  };

  const handleToggleOptional = () => {
    setLectureValues({ ...LectureValues, optional: !LectureValues.optional });
  };

  //create Lecture service for create lecture
  const gridColumn = useBreakpointValue({
    base: "1 / -1", // Full width on small screens
    md: "1 / 4", // Span two columns on medium screens
    lg: "1 / 5", // Span two columns starting from the second column on large screens
  });
  const selectWidth = useBreakpointValue({ base: "100%", md: "auto" });

  //Zoom Link validation
  function isZoomLink(link: string): boolean {
    const zoomLinkRegex = /^https?:\/\/?zoom\.us\/(?:j\/\d{9,10}|[s,a]\/\w+)$/i

    return zoomLinkRegex.test(link);
  }
  //checking for zoomlink is valid or not
  function handleLinkChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newLink = event.target.value;
    setLectureValues({ ...LectureValues, zoomLink: newLink });
    console.log(isZoomLink(newLink))
    setZoomLinkValid(isZoomLink(newLink));
  }

  return (
    <div>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <FormLabel color="rgb(75 85 99)">Title</FormLabel>
        <Input
          name="title"
          value={LectureValues.title}
          gridColumn={gridColumn}
          placeholder="Enter text"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        mt={4}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
        }}
        gap={4} >
        <Box>
          {" "}
          <FormLabel color="rgb(75 85 99)">Categoery</FormLabel>
          <Select
            name="category"
            onChange={handleChange}
            width={selectWidth}
            value={LectureValues.category}
            color="rgb(75 85 99)"
            placeholder="Select Categoery"
          >
            {Categoery.map((el) => (
              <option value={el.key}>{el.key}</option>
            ))}
          </Select>
        </Box>
        <Box>
          {" "}
          <FormLabel color="rgb(75 85 99)">Batch</FormLabel>
          <Select
            name="batch"
            onChange={handleChange}
            width={selectWidth}
            value={LectureValues.batch}
            color="rgb(75 85 99)"
            placeholder="Select batch"
          >
            {batchArray?.map((el) => (
              <option value={el.batch_id}>{el.batch_name}</option>
            ))}
          </Select>
        </Box>
        <Box>
          {" "}
          <FormLabel color="rgb(75 85 99)">Section</FormLabel>
          <Select
            name="section"
            width={selectWidth}
            color="rgb(75 85 99)"
            value={LectureValues.section}
            placeholder="Select section"
            onChange={handleChange}
          >
            {sectionArray?.map((el) => (
              <option value={el.section_id}>{el.section_name}</option>
            ))}
          </Select>
        </Box>
      </Grid>
      <Grid
        mt={4}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
        }}
        gap={4}>
        <Box>
          <FormLabel color="rgb(75 85 99)">Type</FormLabel>
          <Select
            name="type"
            width={selectWidth}
            color="rgb(75 85 99)"
            placeholder="Select type"
            value={LectureValues.type}
            onChange={handleChange}
          >
            {typeArray?.map((el) => (
              <option value={el.id}>{el.typeName}</option>
            ))}
          </Select>
        </Box>
        <Box>
          <FormLabel color="rgb(75 85 99)">Schedule</FormLabel>
          <Box p="5px" border="1px solid rgb(226,232,240)" w="auto">
            <Datetime
              value={LectureValues.schedule}
              onChange={handleDateChange}
            />
          </Box>
        </Box>
        <Box>
          <FormLabel color="rgb(75 85 99)">Concludes</FormLabel>
          <Box p="5px" border="1px solid rgb(226,232,240)" w="auto">
            <Datetime
              value={LectureValues.conclude}
              onChange={handleDateConcludeChange}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        mt={4}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
        }}
        gap={4}>
         <Box>
       <TagInput
          LectureValues={LectureValues}
          setLectureValues={setLectureValues}
        />
        </Box>
        <Box mt="10px" minWidth="0">
          <FormLabel color="rgb(75 85 99)">User</FormLabel>
          <Select
            name="type"
            width={selectWidth}
            color="rgb(75 85 99)"
            placeholder="Select tags"
            value={LectureValues.tags}
            onChange={handleChange}
          >
            {userArray?.map((el) => (
              <option value={el.id}>{el.userName}</option>
            ))}
          </Select>
        </Box>

        <Box mt="10px" ml="20px" >
          <Flex>
            <Box mt="10px">
            <FormLabel color="rgb(75 85 99)">Optional</FormLabel>
              <Flex>
                <Switch
                   mt="7px"
                  isChecked={LectureValues.optional}
                  onChange={handleToggleOptional}
                />
              </Flex>
            </Box>
            <Box mt="10px">
            <FormLabel color="rgb(75 85 99)">Hide</FormLabel>
              <Flex>
                <Switch
                  mt="7px"
                  isChecked={LectureValues.hideVideo}
                  onChange={handleToggleHide}
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Grid>
      <Grid
        mt={4}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
        }}
        gap={4}
      >
        <Box>
          <FormLabel color="rgb(75 85 99)">Week</FormLabel>
          <Input
            name="week"
            width={selectWidth}
            w="100%"
            placeholder="Select week"
            color="rgb(75 85 99)"
            value={LectureValues.week}
            onChange={handleInputChange}
          />
        </Box>
        <Box>
          <FormLabel color="rgb(75 85 99)">Day</FormLabel>
          <Input
            name="day"
            width={selectWidth}
            w="100%"
            color="rgb(75 85 99)"
            placeholder="Select week day"
            value={LectureValues.day}
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid mt="20px" templateColumns="repeat(3, 1fr)" gap={4}>
        <FormLabel color="rgb(75 85 99)">ZoomLink</FormLabel>
        <Input
          name="zoomLink"
          value={LectureValues.zoomLink}
          gridColumn={gridColumn}
          color="rgb(75 85 99)"
          placeholder="Paste zoom link here"
          onBlur={(event) => handleInputBlur(event)}
          onChange={handleLinkChange}
        />
      </Grid>
      {touched.zoomLink && !isZoomlinkValid ? (
        <span style={{ color: "red" }}>inValid Zoom link</span>
      ) : (
        ""
      )}
      <NoteSection
        LectureValues={LectureValues}
        setLectureValues={setLectureValues}
      />
    </div>
  );
};

export default InputTakingSection;

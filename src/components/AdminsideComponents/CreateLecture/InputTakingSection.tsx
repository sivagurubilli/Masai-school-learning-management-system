import React, { useEffect, useState } from "react";
import "../../../Pages/AdminSidePages/CreateLecturePage/index.css";
import * as yup from "yup";
import { useFormik } from "formik";
import "react-datetime/css/react-datetime.css";
import {
  Box,
  Grid,
  Input,
  Select,
  useBreakpointValue,
  Flex,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import NoteSection from "./NoteSection";
import TagInput from "./TagInput";
import {
  getBatchArrray,
  getSectionArray,
  getUserArray,
  getTypeArray,
  getCategoryArrray,
} from "../../../Services/SelelctionService";
import {
  IBatchObject,
  ICategoryObject,
  ISectionObject,
  ITypeObject,
  IUserObject,
} from "../../../Services/SelectionInterface";
import { Categoery } from "../../../assets/assets";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("This feild is required")
    .min(3, "Name must be 3 character"),
  batch: yup.string().required("This feild is required"),
  section: yup.string().required("This feild is required"),
  category: yup.string().required("This feild is required"),
  type: yup.string().required("This feild is required"),
  createdBy: yup.string().required("This feild is required"),
  week: yup.string().required("This feild is required"),
  day: yup.string().required("This feild is required"),
  tags: yup.string().required("This feild is required"),
  zoomLink: yup
    .string()
    .matches(
      /^https:\/\/((www\.)?|us02web\.)zoom\.us\/(j|my)\/\w{10}\?*\S*$/,
      "Please enter a valid Zoom meeting link"
    )
    .required("Zoom meeting link is required"),
  schedule: yup
    .date()
    .min(new Date(), "Selected date nd time cannot be before current date and time.")
    .required("Please select a date and time."),
  concludes: yup
    .date()
    .min(
      yup.ref("schedule"),
      "Selected date and time cannot be earlier than scheduled date and time."
    )
    .required("Please select a date and time."),
});

const InputTakingSection = ({ LectureValues, setLectureValues }: any) => {
  const [batchArray, setBatchArray] = useState<IBatchObject[]>();
  const [sectionArray, setSectionArray] = useState<ISectionObject[]>();
  const [userArray, setUserArray] = useState<IUserObject[]>();
  const [typeArray, setTypeArray] = useState<ITypeObject[]>();
  const [categoryArray, setCategoryArray] = useState<ICategoryObject[]>();

  const initialValues = {
    title: LectureValues.title,
    batch: LectureValues.batch,
    category: LectureValues.category,
    section: LectureValues.section,
    type: LectureValues.type,
    schedule: LectureValues.schedule,
    concludes: LectureValues.concludes,
    createdBy: LectureValues.createdBy,
    tags: LectureValues.tags,
    hideVideo: LectureValues.hideVideo,
    optional: LectureValues.optional,
    zoomLink: LectureValues.zoomLink,
    week: LectureValues.week,
    day: LectureValues.day,
    notes: LectureValues.notes,
  };

  useEffect(() => {
    gettingBatchArrray();
    gettingSectionArray();
    gettingTypeArray();
    gettingUserArray();
    gettingCategoryArrray();
  }, []);

  const gettingBatchArrray = async () => {
    try {
      const response = await getBatchArrray();
      if (response.length) {
        setBatchArray(response);
      }
    } catch (error) {}
  };

  const gettingCategoryArrray = async () => {
    try {
      const response = await getCategoryArrray();
      if (response.length) {
        setCategoryArray(response);
      }
    } catch (error) {}
  };
  const gettingSectionArray = async () => {
    try {
      const response = await getSectionArray();
      if (response.length) {
        setSectionArray(response);
      }
    } catch (error) {}
  };
  const gettingTypeArray = async () => {
    try {
      const response = await getTypeArray();
      if (response.length) {
        setTypeArray(response);
      }
    } catch (error) {}
  };
  const gettingUserArray = async () => {
    try {
      const response = await getUserArray();
      if (response.length) {
        setUserArray(response);
      }
    } catch (error) {}
  };
  
   

  const { handleSubmit, handleBlur, touched, actions,handleChange, values, errors } =
    useFormik({
      initialValues,
      validationSchema,
    });



  //create Lecture service for create lecture
  const gridColumn = useBreakpointValue({
    base: "1 / -1", // Full width on small screens
    md: "1 / 4", // Span two columns on medium screens
    lg: "1 / 5", // Span two columns starting from the second column on large screens
  });
  const selectWidth = useBreakpointValue({
    base: "100%",
    md: "auto",
    sm: "auto",
  });

  return (
    <div>
      <Box
        w="96%"
        ml="2%"
        p="3%"
        h="auto"
        bg="white"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <FormLabel color="rgb(75 85 99)">Title</FormLabel>
            <Input
              name="title"
              value={values.title}
              gridColumn={gridColumn}
              placeholder="Enter text"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.title && errors.title && (
              <span style={{ color: "red" }}>{errors.title}</span>
            )}
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
              {" "}
              <FormLabel color="rgb(75 85 99)">Categoery</FormLabel>
              <Select
                name="category"
                onChange={handleChange}
                width={selectWidth}
                value={values.category}
                onBlur={handleBlur}
                color="rgb(75 85 99)"
                placeholder="Select Categoery"
              >
                {Categoery?.map((el) => (
                  <option value={el.key}>{el.key}</option>
                ))}
              </Select>
              {touched.category && errors.category && (
                <span style={{ color: "red" }}>{errors.category}</span>
              )}
            </Box>
            <Box>
              {" "}
              <FormLabel color="rgb(75 85 99)">Batch</FormLabel>
              <Select
                name="batch"
                onChange={handleChange}
                width={selectWidth}
                value={values.batch}
                onBlur={handleBlur}
                color="rgb(75 85 99)"
                placeholder="Select batch"
              >
                {batchArray?.map((el) => (
                  <option value={el.batchId}>{el.batchName}</option>
                ))}
              </Select>
              {touched.batch && errors.batch && (
                <span style={{ color: "red" }}>{errors.batch}</span>
              )}
            </Box>
            <Box>
              {" "}
              <FormLabel color="rgb(75 85 99)">Section</FormLabel>
              <Select
                name="section"
                width={selectWidth}
                color="rgb(75 85 99)"
                value={values.section}
                onBlur={handleBlur}
                placeholder="Select section"
                onChange={handleChange}
              >
                {sectionArray?.map((el) => (
                  <option value={el.sectionId}>{el.sectionName}</option>
                ))}
              </Select>
              {touched.section && errors.section && (
                <span style={{ color: "red" }}>{errors.section}</span>
              )}
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
              <FormLabel color="rgb(75 85 99)">Type</FormLabel>
              <Select
                name="type"
                width={selectWidth}
                color="rgb(75 85 99)"
                placeholder="Select type"
                value={values.type}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {typeArray?.map((el) => (
                  <option value={el.id}>{el.typeName}</option>
                ))}
              </Select>
              {touched.type && errors.type && (
                <span style={{ color: "red" }}>{errors.type}</span>
              )}
            </Box>
            <Box>
              <FormLabel color="rgb(75 85 99)">Schedule</FormLabel>

              <Input
                type="datetime-local"
                name="schedule"
                value={values.schedule}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.schedule && errors.schedule && (
                <span style={{ color: "red" }}>{errors.schedule}</span>
              )}
            </Box>
            <Box>
              <FormLabel color="rgb(75 85 99)">Concludes</FormLabel>
              <Input
                type="datetime-local"
                name="concludes"
                onBlur={handleBlur}
                value={values.concludes}
                onChange={handleChange}
              />
              {touched.concludes && errors.concludes && (
                <span style={{ color: "red" }}>{errors.concludes}</span>
              )}
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
              <TagInput
                values={values}
                actions={actions}
                handleChange={handleChange}
                LectureValues={LectureValues}
                setLectureValues={setLectureValues}
              />
            </Box>
            <Box mt="10px" minWidth="0">
              <FormLabel color="rgb(75 85 99)">User</FormLabel>
              <Select
                name="createdBy"
                width={selectWidth}
                color="rgb(75 85 99)"
                placeholder="Select user"
                value={values.createdBy}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {userArray?.map((el) => (
                  <option value={el.id}>{el.userName}</option>
                ))}
              </Select>
              {touched.createdBy && errors.createdBy && (
                <span style={{ color: "red" }}>{errors.createdBy}</span>
              )}
            </Box>

            <Box mt="10px" ml="20px">
              <Flex>
                <Box mt="10px">
                  <FormLabel color="rgb(75 85 99)">Optional</FormLabel>
                  <Flex>
                    <Switch
                      mt="7px"
                      name="optional"
                      value={values.optional}
                      isChecked={values.optional}
                      onChange={handleChange}
                    />
                  </Flex>
                </Box>
                <Box mt="10px">
                  <FormLabel color="rgb(75 85 99)">Hide</FormLabel>
                  <Flex>
                    <Switch
                      mt="7px"
                      name="hideVideo"
                      value={values.hideVideo}
                      isChecked={values.hideVideo}
                      onChange={handleChange}
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
                placeholder="Enter week"
                color="rgb(75 85 99)"
                value={LectureValues.week}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.week && errors.week && (
                <span style={{ color: "red" }}>{errors.week}</span>
              )}
            </Box>
            <Box>
              <FormLabel color="rgb(75 85 99)">Day</FormLabel>
              <Input
                name="day"
                width={selectWidth}
                w="100%"
                color="rgb(75 85 99)"
                placeholder="Enter day"
                onBlur={handleBlur}
                value={LectureValues.day}
                onChange={handleChange}
              />
              {touched.day && errors.day && (
                <span style={{ color: "red" }}>{errors.day}</span>
              )}
            </Box>
          </Grid>
          <Grid mt="20px" templateColumns="repeat(3, 1fr)" gap={4}>
            <FormLabel color="rgb(75 85 99)">ZoomLink</FormLabel>
            <Input
              name="zoomLink"
              value={values.zoomLink}
              gridColumn={gridColumn}
              color="rgb(75 85 99)"
              placeholder="Paste zoom link here"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>

          {touched.zoomLink && errors.zoomLink && (
            <span style={{ color: "red" }}>{errors.zoomLink}</span>
          )}

          <Box>
            <NoteSection
              values={values}
              handleChange={handleChange}
              LectureValues={LectureValues}
              setLectureValues={setLectureValues}
            />
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default InputTakingSection;

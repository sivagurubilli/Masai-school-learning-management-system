import React, { useState, useEffect, useCallback } from "react";
import "../../../Pages/AdminSidePages/CreateLecturePage/index.css";
import validationSchema from "./FormikYupValidation";
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
  Button,
  useMediaQuery,
  Divider,
} from "@chakra-ui/react";
import NoteSection from "./NoteSection";
import TagInput from "./TagInput";
import {
  IBatchObject,
  ICategoryObject,
  ISectionObject,
  ITypeObject,
  IUserObject,
} from "../../../Services/SelectionInterface";
import CommonModalComponent from "../../../components/Modal/commonModal";
import {
  getBatchArrray,
  getCategoryArray,
  getSectionArray,
  getTypeArray,
  getUserArray,
} from "../../../Services/SelelctionService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { actionCreators } from "../../../redux/SelectionReducer/index";
import { bindActionCreators } from "redux";

const InputTakingSection = ({
  buttonName,
  LectureValues,
  setLectureValues,
  LectureSendService,
  id,
}: any) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [batchArray, setBatchArray] = useState<IBatchObject[]>();
  const [sectionArray, setSectionArray] = useState<ISectionObject[]>();
  const [userArray, setUserArray] = useState<IUserObject[]>();
  const [typeArray, setTypeArray] = useState<ITypeObject[]>();
  const [categoryArray, setCategoryArray] = useState<ICategoryObject[]>();
  const dispatch = useDispatch();
  const {
    GetBatchData,
    GetCategoeryData,
    GetSectionData,
    GetTypeData,
    
  } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state: RootState) => state);

  // getSelected array to get all selected tags values from backend
  const getArrays = useCallback(async () => {
    try {
      const [batchArray, categoryArray, sectionArray, typeArray, userArray] =
        await Promise.all([
          getBatchArrray(),
          getCategoryArray(),
          getSectionArray(),
          getTypeArray(),
          getUserArray(),
        ]);
      if (batchArray.length) {
        GetBatchData(batchArray);
        setBatchArray(batchArray);
      }
      if (categoryArray.length) {
        GetCategoeryData(categoryArray);
        setCategoryArray(categoryArray);
      }
      if (sectionArray.length) {
        GetSectionData(sectionArray);
        setSectionArray(sectionArray);
      }
      if (typeArray.length) {
        GetTypeData(typeArray);
        setTypeArray(typeArray);
      }
      if (userArray.length) {
        setUserArray(userArray);
      }
    } catch (error) {
      setIsOpen(true);
      setModalErrorBody(
        "Oh no! There was a problem with getting the items from the selecting list"
      );
    }
  }, [GetBatchData, GetSectionData, GetCategoeryData, GetTypeData]);

  useEffect(() => {
    const setSelectBatchValues = () => {
      setBatchArray(state.BatchReducer.Batch);
      setSectionArray(state.SectionReducer.Section);
      setCategoryArray(state.CategoeryReducer.Categoery);
      setTypeArray(state.TypeReducer.Type);
    };
    if (state.BatchReducer.Batch.length) {
      setSelectBatchValues();
    } else {
      getArrays();
    }
  }, [
    state.CategoeryReducer.Categoery,
    state.TypeReducer.Type,
    getArrays,
    state.BatchReducer.Batch,
    state.SectionReducer.Section,
  ]);

  // state.BatchReducer.Batch , state.SectionReducer.Section, state.CategoeryReducer.Categoery,GetBatchData,state.TypeReducer.Type

  //&& state.SectionReducer.Section.length && state.CategoeryReducer.Categoery.length

  //initial values for formik
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

  // onSubmitting it calls the services based on type of action like addlecture and edit lecture and copy lecture
  const onSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (buttonName === "Copy Lecture" || buttonName === "Edit Lecture") {
      try {
        const response = await LectureSendService(LectureValues, id);
        if (response.message) {
          setIsOpen(true);
          setModalErrorBody("The lecture was Success fully added with Changes");
        }
      } catch (error) {
        setIsOpen(true);
        setModalErrorBody(
          "Sorry about that! There is a scheduled downtime on your servers, so please check them"
        );
      }
    } else {
      try {
        const response = await LectureSendService(LectureValues);
        if (response.message) {
          setIsOpen(true);
          setModalErrorBody("The lecture was Success fully added");
        }
      } catch (error) {
        setIsOpen(true);
        setModalErrorBody(
          "Sorry about that! There is a scheduled downtime on your servers, so please check them"
        );
      }
    }
  };

  //using useFormik get the methods for handlesubmit and hadlechange and values
  const {
    handleSubmit,
    handleBlur,
    touched,
    actions,
    handleChange,
    values,
    errors,
  } = useFormik({
    onSubmit,
    initialValues,
   validationSchema
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
      <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
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
                {categoryArray?.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.categoryName}
                  </option>
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
                  <option key={el.batchId} value={el.batchId}>
                    {el.batch}
                  </option>
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
                  <option key={el.sectionId} value={el.sectionId}>
                    {el.section}
                  </option>
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
                  <option key={el.id} value={el.id}>
                    {el.type}
                  </option>
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
                  <option key={el.id} value={el.id}>
                    {el.user}
                  </option>
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
          <Divider mt="10px" />
          <Flex justifyContent={"flex-end"}>
            <Button
              fontSize={isLargerThan900 ? "16px" : "12px"}
              mt="20px"
              color="white"
              w="auto"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              type="submit"
              isLoading={isLoading}
            >
              {buttonName}
            </Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
};

export default InputTakingSection;

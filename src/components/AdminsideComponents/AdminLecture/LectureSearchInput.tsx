import React, { useState, useEffect, useCallback } from "react";
import {
  Divider,
  Grid,
  Input,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  getBatchArrray,
  getSectionArray,
  getUserArray,
  getTypeArray,
  getCategoryArray,
} from "../../../Services/SelelctionService";
import {
  IBatchObject,
  ISectionObject,
  ITypeObject,
  IUserObject,
} from "../../../Services/SelectionInterface";
import CommonModalComponent from "../../../components/Modal/commonModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { actionCreators } from "../../../redux/SelectionReducer/index";
import { bindActionCreators } from "redux";



const LectureSearchInput = ({ filterValues, setFilterValues ,setLecturesData,search,updateSearch}: any) => {
  const [batchArray, setBatchArray] = useState<IBatchObject[]>();
  const [sectionArray, setSectionArray] = useState<ISectionObject[]>();
  const [userArray, setUserArray] = useState<IUserObject[]>();
  const [typeArray, setTypeArray] = useState<ITypeObject[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  
  const dispatch = useDispatch();
  const { GetBatchData, GetSectionData, GetTypeData, GetUserData,GetCategoeryData } =
    bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state: RootState) => state);

  // Get Selection Arrays
  const getDropDownArrays = useCallback(async () => {
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

      if (sectionArray.length) {
        GetSectionData(sectionArray);
        setSectionArray(sectionArray);
      }
      if (categoryArray.length) {
        GetCategoeryData(categoryArray);
      }
      if (typeArray.length) {
        GetTypeData(typeArray);
        setTypeArray(typeArray);
      }
      if (userArray.length) {
        GetUserData(userArray)
        setUserArray(userArray);
      }
    } catch (error) {
      setIsOpen(true);
      setModalErrorBody(
        "Oh no! There was a problem with getting the items from the selecting list"
      );
    }
  }, [GetBatchData, GetSectionData,GetUserData, GetTypeData, GetCategoeryData]);

  useEffect(() => {
    const setSelectBatchValues = () => {
      setBatchArray(state.BatchReducer.Batch);
      setSectionArray(state.SectionReducer.Section);
      setTypeArray(state.TypeReducer.Type);
      setUserArray(state.UserReducer.User);
    };
    if (
      state.BatchReducer.Batch.length &&
      state.CategoeryReducer.Categoery.length
    ) {
      setSelectBatchValues();
    } else {
      getDropDownArrays();
    }
  }, [
    getDropDownArrays,
    state.BatchReducer.Batch,
    state.TypeReducer.Type,
    state.UserReducer.User,
    state.SectionReducer.Section,
    state.CategoeryReducer.Categoery.length,
  ]);



  
  // this is setting values from select tags
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let { name, value} = event.target;
    let value1= value
    if(name==="batch"){
      batchArray?.map((el)=>{
        if(el.batchId=== Number(value)){
          value=el.batch
        }
      })
    }
    if(name==="section"){
      sectionArray?.map((el)=>{
        if(el.sectionId=== Number(value)){
          value=el.section
        }
      })
    }
    if(name==="type"){
      typeArray?.map((el)=>{
        if(el.id=== Number(value)){
          value=el.type
        }
      })
    }
    if(name==="createdBy"){
      userArray?.map((el)=>{
        if(el.id=== Number(value)){
          value=el.name
        }
      })
    }
    updateSearch({
      ...search,
      [name]: value,
    });
    setFilterValues({ ...filterValues, [name]: value1 });
  };

  //this is setting values from input elements
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateSearch({
      ...search,
      [name]: value,
    });
    setFilterValues({ ...filterValues, [name]: value });
  };


  const gridColumn = useBreakpointValue({
    base: "1 / -1", // Full width on small screens
    md: "1 / 4", // Span two columns on medium screens
    lg: "1 / 5", // Span two columns starting from the second column on large screens
  });
  const selectWidth = useBreakpointValue({
    base: "100%",
    md: "100%",
    sm: "100%",
  });

  return (
    <div>
      <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
      <Grid
        templateColumns={{
          base: "1fr 1fr",
        }}
        gap={4}
        
      >
        <Input
          name="title"
          value={filterValues.title}
          gridColumn={gridColumn}
          placeholder="Enter title"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        mt={4}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr 1fr 1fr",
          lg: "1fr 1fr 1fr 1fr",
        }}
        gap={4}
      >
        <Select
          name="batch"
          value={filterValues.batch}
          onChange={handleChange}
          width={selectWidth}
          color="rgb(75 85 99)"
          placeholder="Select batch"
        >
          {batchArray?.map((el) => (
            <option key={el.batchId} value={el.batchId}>
              {el.batch}
            </option>
          ))}
        </Select>
        <Select
          name="section"
          width={selectWidth}
          value={filterValues.section}
          color="rgb(75 85 99)"
          placeholder="Select section"
          onChange={handleChange}
        >
          {sectionArray?.map((el) => (
            <option key={el.sectionId} value={el.sectionId}>
              {el.section}
            </option>
          ))}
        </Select>
        <Select
          name="type"
          width={selectWidth}
          color="rgb(75 85 99)"
          value={filterValues.type}
          placeholder="Select type"
          onChange={handleChange}
        >
          {typeArray?.map((el) => (
            <option key={el.id} value={el.id}>
              {el.type}
            </option>
          ))}
        </Select>
        <Input
          type="date"
          name="startTime"
          width={selectWidth}
          color="rgb(75 85 99)"
          value={filterValues.date}
          placeholder="Select date"
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
        gap={4}
      >
        <Input
          name="week"
          width={selectWidth}
          placeholder="Enter week"
          value={filterValues.week}
          onChange={handleInputChange}
        />
        <Input
          name="day"
          width={selectWidth}
          placeholder="Enter day"
          value={filterValues.day}
          onChange={handleInputChange}
        />
        <Select
          name="createdBy"
          width={selectWidth}
          color="rgb(75 85 99)"
          value={filterValues.createdBy}
          placeholder="Select user"
          onChange={handleChange}
        >
          {userArray?.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </Select>
      </Grid>
      <Divider mt="20px" />
      
    </div>
  );
};

export default LectureSearchInput;

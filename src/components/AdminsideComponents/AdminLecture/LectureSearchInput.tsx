import React, { useState, useEffect } from "react";
import { Divider, Grid, Input, Select, useBreakpointValue } from "@chakra-ui/react";
import {
  getBatchArrray,
  getSectionArray,
  getUserArray,
  getTypeArray,
} from "../../../Services/SelelctionService";
import {
  IBatchObject,
  ISectionObject,
  ITypeObject,
  IUserObject,
} from "../../../Services/SelectionInterface";
import CommonModalComponent from "../../../components/Modal/commonModal";

const LectureSearchInput = ({ filterValues, setFilterValues }: any) => {
  const [batchArray, setBatchArray] = useState<IBatchObject[]>();
  const [sectionArray, setSectionArray] = useState<ISectionObject[]>();
  const [userArray, setUserArray] = useState<IUserObject[]>();
  const [typeArray, setTypeArray] = useState<ITypeObject[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");


  useEffect(() => {
    gettingBatchArrray();
    gettingSectionArray();
    gettingTypeArray();
    gettingUserArray();
  }, []);

  const gettingBatchArrray = async () => {
    try {
      const response = await getBatchArrray();
      if(response.length){
        setBatchArray(response);
      }
    } catch (error) {
      setIsOpen(true);
      setModalErrorBody("We were unable to find batch data. It seems that something has gone wrong!");
    }
  };
  const gettingSectionArray = async () => {
    try {
      const response = await getSectionArray();
      if(response.length){
      setSectionArray(response);
      }
    } catch (error) {
    
    }
  };
  const gettingTypeArray = async () => {
    try {
      const response = await getTypeArray();
      if(response.length){
      setTypeArray(response);
      }
    } catch (error) {}
  };
  const gettingUserArray = async () => {
    try {
      const response = await getUserArray();
      if(response.length){
      setUserArray(response);
      }
    } catch (error) {}
  };

  // this is setting values from select tags
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  //this is setting values from input elements
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
          placeholder="Enter text"
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
            <option key={el.batchId} value={el.batchId}>{el.batch}</option>
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
            <option key={el.sectionId} value={el.sectionId}>{el.section}</option>
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
            <option key={el.id} value={el.id}>{el.type}</option>
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
          name="user"
          width={selectWidth}
          color="rgb(75 85 99)"
          value={filterValues.user}
          placeholder="Select user"
          onChange={handleChange}
        >
          {userArray?.map((el) => (
            <option key={el.id} value={el.id}>{el.user}</option>
          ))}
        </Select>
      </Grid>
      <Divider mt="20px" />
    </div>
  );
};

export default LectureSearchInput;

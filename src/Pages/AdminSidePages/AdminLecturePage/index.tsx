import {
  Container,
  Box,
  Grid,
  Input,
  Select,
  useBreakpointValue,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./index.css";
import Secondnav from "../../../components/AdminsideComponents/AdminLecture/Secondnav";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import TableHeading from "./TableHeading";
import { LectureSearchService } from "../../../Services/LectureServices";
import { ISearchResponse } from "../../../Services/LectureInterface";

interface IFilteredValues {
  title: string ,
  batch: string ,
  section:  string ,
  type: string ,
  user:  string ,
  date:  string ,
  week:  string ,
  day:  string ,
}


const AdminLecture = () => {
  const [filterValues, setFilterValues] = useState<IFilteredValues>({
    title: "",
    batch: "",
    section: "",
    type: "",
    user: "",
    date: "",
    week: "" ,
    day: "",
  });
   const [lecturesData,setLecturesData] = useState()

// this is setting values from select tags
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilterValues({ ...filterValues, [name]: value });
    GetLectures()
  };

  //this is setting values from input elements
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilterValues({ ...filterValues, [name]: value });
           GetLectures()
  };

  // calling service for getting list for lectures
const GetLectures =()=>{
  LectureSearchService(filterValues).then((res:any)=>{
    console.log(res)
    setLecturesData(res)
  })
}
  const Reset = () => {
    setFilterValues({
      title: "",
    batch: "",
    section: "",
    type: "",
    user: "",
    date: "",
    week: "",
    day: "",
    })
  };

  const gridColumn = useBreakpointValue({
    base: "1 / -1", // Full width on small screens
    md: "1 / 4", // Span two columns on medium screens
    lg: "1 / 5", // Span two columns starting from the second column on large screens
  });
  const selectWidth = useBreakpointValue({ base: "100%", md: "auto" });

  return (
    <div className="container">
      <Navbar />
      <Secondnav />
      <Box w="80%" ml="10%" mt="60px" h="auto"    boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
        <Box w="100%" p="2%" bg="white" h="auto">
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
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
            gap={4}>
            <Select
              name="batch"
              value={filterValues.batch}
              onChange={handleChange}
              width={selectWidth}
              color="rgb(75 85 99)"
              placeholder="Select branch" >
              <option value="batch1">Batch 1</option>
              <option value="batch2">Batch 2</option>
              <option value="batch3">Batch 3</option>
            </Select>

            <Select
              name="section"
              width={selectWidth}
              value={filterValues.section}
              color="rgb(75 85 99)"
              placeholder="Select section"
              onChange={handleChange}>
              <option value="section1">Section 1</option>
              <option value="section2">Section 2</option>
              <option value="section3">Section 3</option>
            </Select>

            <Select
              name="type"
              width={selectWidth}
              color="rgb(75 85 99)"
              value={filterValues.type}
              placeholder="Select type"
              onChange={handleChange}>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
              <option value="type4">Type 4</option>
            </Select>

            <Input
            type ="date"
              name="date"
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
              placeholder="Select week"
              value={filterValues.week}
              onChange={handleInputChange}
            />
            <Input
              name="day"
              width={selectWidth}
              placeholder="Select week day"
              value={filterValues.day}
              onChange={handleInputChange}/>
            
            <Select
              name="user"
              width={selectWidth}
              color="rgb(75 85 99)"
              value={filterValues.user}
              placeholder="Select user"
              onChange={handleChange}
            >
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </Select>
          </Grid>
          <Flex justifyContent={"flex-end"}>
            <Button
              w="32%"
              mt="20px"
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={Reset}>
              Reset
            </Button>
          </Flex>
        </Box>
      </Box>
      <Box w="80%" ml="10%" bg="white" h="100vh">
        <TableHeading LecturesData= {lecturesData} />
      </Box>
    </div>
  );
};

export default AdminLecture;
import {
  Container,
  Box,
  Grid,
  Input,
  Select,
  useBreakpointValue,
  Flex,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./index.css";
import Secondnav from "../../../components/AdminsideComponents/AdminLecture/Secondnav";
import Navbar from "../../../components/AdminsideComponents/AdminNavbar/index";
import TableHeading from "../../../components/AdminsideComponents/AdminLecture/LecturesTable";
import { LectureSearchService } from "../../../Services/LectureServices";
import { ISearchResponse,ILectureResponse } from "../../../Services/LectureInterface";
import { getBatchArrray, getSectionArray,getUserArray,getTypeArray } from "../../../Services/SelelctionService";
import { IBatchObject, IBatchResponse, ISectionObject, ITypeObject, ITypeResponse, IUserObject,  IUserResponse } from "../../../Services/SelectionInterface";

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
   const [lecturesData,setLecturesData] = useState<ILectureResponse[]>()
   const [batchArray,setBatchArray] = useState<IBatchObject[]>()
   const [sectionArray,setSectionArray] = useState<ISectionObject[]>()
   const [userArray,setUserArray] = useState<IUserObject[]>()
   const [typeArray,setTypeArray] = useState<ITypeObject[]>()

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

  // calling service for getting list for lectures
const GetLectures =()=>{
  LectureSearchService(filterValues).then((res:any)=>{
    setLecturesData(res)
  })
}

useEffect(()=>{
  getBatchArrray().then((res)=>{
    setBatchArray(res)
  })
  
  getSectionArray().then((res)=>{
    setSectionArray(res)
  })
  getUserArray().then((res)=>{
    setUserArray(res)
  })
  getTypeArray().then((res)=>{
    setTypeArray(res)
  })
},[])

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
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  return (
    <div className="container">
      <Navbar />
      <Secondnav />
      <Box w="80%" ml="10%" mt="60px" h="auto"    boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
        <Box w="100%" p="2%" bg="white" h="auto">
          <Grid templateColumns={{
              base: "1fr 1fr",
            }} gap={4}>
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
              placeholder="Select branch">
                 {batchArray?.map((el)=>(
                      <option value={el.batch_id}>{el.batch_name}</option>
                    ))}
            </Select>     
            <Select
              name="section"
              width={selectWidth}
              value={filterValues.section}
              color="rgb(75 85 99)"
              placeholder="Select section"
              onChange={handleChange}>
                {sectionArray?.map((el)=>(
                      <option value={el.section_id}>{el.section_name}</option>
                    ))}
            </Select>
            <Select
              name="type"
              width={selectWidth}
              color="rgb(75 85 99)"
              value={filterValues.type}
              placeholder="Select type"
              onChange={handleChange}>
             {typeArray?.map((el)=>(
                      <option value={el.id}>{el.typeName}</option>
                    ))}
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
            {userArray?.map((el)=>(
            <option value={el.id}>{el.userName}</option>
                    ))}
            </Select>
          </Grid>
          <Flex justifyContent={"flex-end"}>
          <Button
              w="20%"
              mt="20px"
              fontSize={isLargerThan900 ? "16px" :"12px"}
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={GetLectures}>
             Filter
            </Button>
            <Button
              w="20%"
              mt="20px"
              color="white"
              ml="20px"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              fontSize={isLargerThan900 ? "16px" :"12px"}
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
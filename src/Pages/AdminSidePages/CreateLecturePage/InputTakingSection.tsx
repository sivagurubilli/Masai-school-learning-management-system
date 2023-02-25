import React, { useEffect, useState } from 'react'
import "./index.css"
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
  import { ICreateLectureValues } from '../../../Services/LectureInterface';
import { Categoery } from "../../../assets/assets";
import NoteSection from './NoteSection';
import TagInput from './TagInput';

const InputTakingSection = ({LectureValues,setLectureValues}:any) => {

    const [isZoomlinkValid,setZoomLinkValid ] = useState<boolean>(false)
    const [touched, setTouched] = useState({zoomLink: false });
  const [startTime,onStartChange] = useState<Date>(new Date())
  const [endTime,onEndChange] = useState<Date>(new Date())
 
    useEffect(()=>{
          setLectureValues({ ...LectureValues,schedule:startTime,conclude:endTime });
          console.log(LectureValues)
              },[startTime,endTime])

        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setLectureValues({ ...LectureValues, [name]: value });
      };

    

      //input blur is for only when error showing in user inters into input feild
      function handleInputBlur(event:React.FocusEvent<HTMLInputElement>) {
        setTouched((prevState) => ({ ...prevState, [event?.target.name]: true }));
      }
    
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
        setLectureValues({...LectureValues,optional:!LectureValues.optional})
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
        const zoomLinkRegex = /^https?:\/\/(?:www\.)?zoom.us\/(?:j\/)?(?:[0-9]{9,15})(?:\?pwd=[a-zA-Z0-9_-]+)?$/;
        return zoomLinkRegex.test(link);
      }
//checking for zoomlink is valid or not
      function handleLinkChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newLink = event.target.value;
        setLectureValues({...LectureValues,zoomLink:newLink})
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
            gap={4}
          >
            <Box>
              {" "}
              <FormLabel color="rgb(75 85 99)">Categeoty</FormLabel>
              <Select
                name="categoery"
                onChange={handleChange}
                width={selectWidth}
                value={LectureValues.categoery}
                color="rgb(75 85 99)"
                placeholder="Select Categeory"
              >
                {Categoery.map((el) => (
                  <option value="el">{el}</option>
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
                <option value="batch1">Batch 1</option>
                <option value="batch2">Batch 2</option>
                <option value="batch3">Batch 3</option>
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
                <option value="section1">Section 1</option>
                <option value="section2">Section 2</option>
                <option value="section3">Section 3</option>
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
            gap={4}
          >
             <Box>
              <FormLabel color="rgb(75 85 99)">
                Type
              </FormLabel>
              <Select
                name="type"
                width={selectWidth}
                color="rgb(75 85 99)"
                placeholder="Select type"
                value={LectureValues.type}
                onChange={handleChange}
              >
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
                <option value="type3">Type 3</option>
              </Select>
            </Box>
            <Box>
              <FormLabel color="rgb(75 85 99)">Schedule</FormLabel>

            </Box>
            <Box>
              <FormLabel  color="rgb(75 85 99)">Concludes</FormLabel>
            </Box>
          </Grid>

          <Grid templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
              <TagInput LectureValues ={LectureValues} setLectureValues={setLectureValues} />
              
            <Box mt='10px'>
              <FormLabel color="rgb(75 85 99)">User</FormLabel>
              <Select
                name="type"
                width={selectWidth}
                color="rgb(75 85 99)"
                placeholder="Select tags"
                value={LectureValues.tags}
                onChange={handleChange}
              >
                <option value="type1">User 1</option>
                <option value="type2">User 2</option>
                <option value="type3">User 3</option>
              </Select>
            </Box>    
            <Box mt='10px' gridColumn={{ sm: "span 2", md: "span 1" }} w="100%"> 
            <FormLabel color="rgb(75 85 99)">Hide or Show</FormLabel>
              <Flex>
              <Box mt="10px">
              <Flex>
              <p color="rgb(75 85 99)">Optional</p>
               <Switch w="100px"  ml="20px"  mt="7px" isChecked={LectureValues.optional} onChange={handleToggleOptional}/>
                </Flex>
                </Box>
              <Box mt="10px">
              <Flex>
              <p color="rgb(75 85 99)">Hide</p>
            <Switch ml="20px" mt="7px" isChecked={LectureValues.hideVideo} onChange={handleToggleHide}/>
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
            gap={4} >
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
              onBlur={(event) =>handleInputBlur(event)}
              onChange={handleLinkChange}
            />
          </Grid>
          {touched.zoomLink && !isZoomlinkValid ? <span style={{ color: "red" }}>inValid Zoom link</span> : ""}
         <NoteSection LectureValues={LectureValues} setLectureValues={setLectureValues} />
    </div>
  )
}

export default InputTakingSection

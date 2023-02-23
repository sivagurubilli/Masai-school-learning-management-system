import React, { useEffect, useState } from 'react'

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
  } from "@chakra-ui/react";
  import { ICreateLectureValues } from '../../../Services/LectureServices';
import { Categoery } from "../../../assets/assets";

const InputTakingSection = ({LectureValues,setLectureValues}:any) => {

    const [isZoomlinkValid,setZoomLinkValid ] = useState(false)
    const [touched, setTouched] = useState({zoomLink: false });
  const [startTime,onStartChange] = useState(new Date())
  const [endTime,onEndChange] = useState(new Date())
 
    useEffect(()=>{
          setLectureValues({ ...LectureValues,schedule:startTime,conclude:endTime });
          console.log(LectureValues)
              },[startTime,endTime])

              const handleToggle = () => {
              setLectureValues({...LectureValues,hideVideo:!LectureValues.hideVideo})
              };
                          const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setLectureValues({ ...LectureValues, [name]: value });
      };

      //input blur is for only when error showing in user inters into input feild
      function handleInputBlur(inputName: string) {
        setTouched((prevState) => ({ ...prevState, [inputName]: true }));
      }
    
      //handle change event for select tags
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLectureValues({ ...LectureValues, [name]: value });
       
      };
    //for hide or show video
      const Hidevideo = () => {
        setLectureValues({ ...LectureValues, hideVideo: !LectureValues.hideVideo });
        console.log(LectureValues);
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
            <FormLabel color="rgb(75 85 99)">Give Title For lecture</FormLabel>
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
              md: "1fr 1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}
            gap={4}
          >
            <Box>
              {" "}
              <FormLabel color="rgb(75 85 99)">Select Categeoty</FormLabel>
              <Select
                name="categoery"
                onChange={handleChange}
                width={selectWidth}
                value={LectureValues.categoery}
                color="rgb(75 85 99)"
                placeholder="Select branch"
              >
                {Categoery.map((el) => (
                  <option value="el">{el}</option>
                ))}
              </Select>
            </Box>

            <Box>
              {" "}
              <FormLabel color="rgb(75 85 99)">Select Batch</FormLabel>
              <Select
                name="batch"
                onChange={handleChange}
                width={selectWidth}
                value={LectureValues.batch}
                color="rgb(75 85 99)"
                placeholder="Select branch"
              >
                <option value="batch1">Batch 1</option>
                <option value="batch2">Batch 2</option>
                <option value="batch3">Batch 3</option>
              </Select>
            </Box>
            <Box>
              {" "}
              <FormLabel color="rgb(75 85 99)">Select Section</FormLabel>
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
            <Box>
              <FormLabel color="rgb(75 85 99)">
                Select Type of Lecture
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
              <FormLabel color="rgb(75 85 99)">Start time</FormLabel>
               {/* <DateTimePicker  value={startTime}
                onChange={onStartChange} /> */}
            </Box>
            <Box>
              <FormLabel  color="rgb(75 85 99)">End time</FormLabel>
              {/* <DateTimePicker  name="conclude"  width={selectWidth} color="rgb(75 85 99)"  value={endTime}
                onChange={onEndChange} /> */}
            </Box>
            <Box>
              <FormLabel color="rgb(75 85 99)">Select Tags</FormLabel>
              <Select
                name="type"
                width={selectWidth}
                color="rgb(75 85 99)"
                placeholder="Select tags"
                value={LectureValues.tags}
                onChange={handleChange}
              >
                <option value="type1">Tag 1</option>
                <option value="type2">Tag 2</option>
                <option value="type3">Tag 3</option>
              </Select>
            </Box>
           
          </Grid>
          <Grid templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
            <Box  gridColumn={{ sm: "span 2", md: "span 2" }} w="100%">
              <FormLabel color="rgb(75 85 99)">Zoom Link</FormLabel>
            
              <Input
                name="week"
                width={selectWidth}
                w="100%"
                color="rgb(75 85 99)"
                placeholder="paste Zoom-link"
                value={LectureValues.zoomLink}
                onBlur={() => handleInputBlur("zoomLink")}
                onChange={handleInputChange}
              />
              {touched.zoomLink && !isZoomlinkValid ? <span style={{ color: "red" }}>inValid Zoom link</span> : ""}
            </Box>
             
            <Box  gridColumn={{ sm: "span 2", md: "span 1" }} w="100%"> 
              <FormLabel color="rgb(75 85 99)">
                Hide video or Show video
              </FormLabel>
              <Flex>
              <FormControl display='flex' alignItems='center'>
              
               <Switch w="100px" isChecked={LectureValues.hideVideo} onChange={handleToggle}/>
              </FormControl>
              <p>  {LectureValues.hideVideo ? "showing" : "hidden"}</p>
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
              <FormLabel color="rgb(75 85 99)">Select Tags</FormLabel>
              <Select
                name="user"
                width={selectWidth}
                color="rgb(75 85 99)"
                placeholder="Select user"
                value={LectureValues.user}
                onChange={handleChange}
              >
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
                <option value="user3">User 3</option>
              </Select>
            </Box>
            <Box>
              <FormLabel color="rgb(75 85 99)">Enter week</FormLabel>
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
              <FormLabel color="rgb(75 85 99)">Enter Day</FormLabel>
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

          <Grid mt="20px" templateColumns="repeat(4, 1fr)" gap={4}>
            <FormLabel color="rgb(75 85 99)">Give Notes For Lecture</FormLabel>
            <Input
              name="notes"
              value={LectureValues.notes}
              gridColumn={gridColumn}
              color="rgb(75 85 99)"
              placeholder="Enter text"
              onChange={handleInputChange}
            />
             
          </Grid>

    </div>
  )
}

export default InputTakingSection

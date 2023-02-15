
import React, { useState } from 'react';
import "./Navbar.css"
import Profilecomponent from "./Profilecomponent"
import { Link,NavLink } from "react-router-dom";
 import { Divider, Text,Flex, Image,Box,  Heading, Hide,  Show,  Tooltip, } from '@chakra-ui/react'
import { masaiimage } from '../../assets/assets';




    const Navbar: React.FC = () => {
        const [clicked, setClicked] = useState(false);
        const [showProfile, setShowProfile] = useState(false);
      
        // handle click function for opening and closing the side navbar on smaller screens
        const handleClick = (): void => {
          setClicked(!clicked);
        };

  return (
   
    <Box position={'sticky'} top='0' bg='whiteAlpha.900' w='100%' zIndex='1'>
        <Box boxShadow='sm' >
            <Flex position={'relative'} 
                 w={"97%"} 
                 align="center" 
                 m='auto'  
                 h={{ sm: "40px", md: "60px" }}  
                 justifyContent={"space-between"} 
                 color={"gray.600"}>
             <Flex align="center" flex={'2'}>
              <Link  to="/dashboard"> <Image  objectFit='contain'  src={masaiimage} alt='Masai logo' /></Link>

              {/* navbar part links for each element  */}

        <Hide below='md'>
           <Flex w="70%" justifyContent={"space-around"} align="center" >
             <Box className='li' >
              <NavLink  activeClassName="active-link" to ="/lectures" >Lectures</NavLink></Box>
               <Box className='li' ><NavLink  activeClassName="active-link" to ="/assignments" >Assignments</NavLink></Box>
              <Box className='li' > <NavLink  activeClassName="active-link" to ="/quizzes" >Quizzes</NavLink></Box>
             <Box className='li' ><NavLink  activeClassName="active-link" to ="/tickets" >Tickets</NavLink></Box>
             <Box className='li' > <NavLink  activeClassName="active-link" to ="/discussions" >Discussions</NavLink></Box>
              <Box className='li' ><NavLink  activeClassName="active-link" to ="/notifications" >Notifications</NavLink></Box>
            <Box className='li' ><NavLink  activeClassName="active-link" to ="/messages" >Messages</NavLink></Box>
           <Box className='li' ><NavLink  activeClassName="active-link" to ="/electives" >Electives</NavLink></Box>
           <Box className='li' ><NavLink  activeClassName="active-link" to ="/announcements" >Announcements</NavLink></Box>
           <Box className='li' ><NavLink  activeClassName="active-link" to ="/courses" >Courses</NavLink></Box>
        </Flex>
       
        {/* when getting authonticated user name dispaly here */}
            <Box ml={"100px"} onClick={()=>setshow1(!show1)}>  gurubilli siva
             <i style={{marginLeft:"20px"}} className="fa-solid fa-circle-chevron-down" ></i>
           </Box> 
        </Hide>
     </Flex>
  </Flex>

 {show1 && <Profilecomponent setshow1={setshow1} />}
    

{/*  this part is about display hamburger in menu item for small screeens  */}
      <Show  below="md" >
         <Box ml="90%" ><i id ="bar" onClick={handleclick}  className={clicked ? "fas fa-times":"fas fa-bars"}></i></Box>
    </Show>

{/* this is part is like when user enter into smaller screens the navbar apper on left down side as side bar  */}
   
    <div id="navbar-mobile"   className={clicked ? "navbar-mobile active":"navbar-mobile"}>
        <li><NavLink  activeClassName="active-link" to ="/lectures" >Lectures</NavLink></li>
          <li><NavLink  activeClassName="active-link" to ="/assignments" >Assignments</NavLink></li>
          <li><NavLink  activeClassName="active-link" to ="/admin/signup" >Quizzes</NavLink></li>
           <li><NavLink  activeClassName="active-link" to ="/tickets" >Tickets</NavLink></li>
           <li><NavLink  activeClassName="active-link" to ="/discussons" >Discussons</NavLink></li>
          <li><NavLink  activeClassName="active-link" to ="/notifications" >Notifications</NavLink></li>
          <li><NavLink  activeClassName="active-link" to ="/messages" >Messages</NavLink></li>
          <li><NavLink  activeClassName="active-link" to ="/electives" >Electives</NavLink></li>
           <li><NavLink  activeClassName="active-link" to ="/announcements" >Announcements</NavLink></li>
           <li><NavLink  activeClassName="active-link" to ="/courses" >Courses</NavLink></li>
           <Divider borderColor="gray.300"/>
        <Text color="black"  padding="10px"><NavLink activeClassName ="active-link" to="/user/profile" >Profile</NavLink></Text>
        <Text color="black"  padding="10px"><NavLink activeClassName ="active-link" to="/transcript" >Transcript </NavLink></Text>
        <Text color="black"  padding="10px">Logout</Text>   
    </div>
    </Box>
 </Box>
 
  );
};

export default Navbar;

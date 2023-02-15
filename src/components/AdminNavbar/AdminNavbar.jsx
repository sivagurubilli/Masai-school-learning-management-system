import React, { useState } from 'react';
import "./AdminNavbar.css"
import Profilecomponent from "../StudentNavbar/Profilecomponent"
import { Link,NavLink } from "react-router-dom";
 import { Divider, Text,Flex, Image,Box,  Heading, Hide,  Show,  Tooltip, } from '@chakra-ui/react'
import { masaiimage } from '../../assets/assets';
import AdminProfileComponent from './AdminProfileComponent';


const Navbar = () => {

  const [clicked,setcliked] = useState(false)
  const [show1,setshow1] =    useState(false)

//   this handleclick function for open and closing of side navbar in smaller screens
 const handleclick=()=>{
    setcliked(!clicked)
  }


  
  return (
   
    <Box zIndex={'1'} position={'sticky'} top='0' bg='whiteAlpha.900' w='100%'>
        <Box boxShadow='sm' >
            <Flex position={'relative'} w={"97%"} align="center" m='auto'  h={"60px"} justifyContent={"space-between"} color={"gray.600"}>
      
            <Flex align="center" flex={'2'}>
            <Link  to="/dashboard"> <Image objectFit='contain'  src={masaiimage} alt='Masai logo' /></Link>

              {/* navbar part links for each element  */}

                <Hide below='md'>
     
           <Flex w="70%" justifyContent={"space-around"} align="center" >
             <Box className='li' >
              <NavLink  activeClassName="active-link" to ="/admin/lectures" >Lectures</NavLink></Box>
               <Box className='li' ><NavLink  activeClassName="active-link" to ="/admin/assignments" >Assignments</NavLink></Box>
              <Box className='li' > <NavLink  activeClassName="active-link" to ="/admin/quizzes" >Quizzes</NavLink></Box>
             <Box className='li' ><NavLink  activeClassName="active-link" to ="/admin/tickets" >Tickets</NavLink></Box>
             <Box className='li' > <NavLink  activeClassName="active-link" to ="/admin/discussions" >Discussions</NavLink></Box>
              <Box className='li' ><NavLink  activeClassName="active-link" to ="/admin/notifications" >Notifications</NavLink></Box>
            <Box className='li' ><NavLink  activeClassName="active-link" to ="/admin/messages" >Messages</NavLink></Box>
           <Box className='li' ><NavLink  activeClassName="active-link" to ="/admin/electives" >Electives</NavLink></Box>
           <Box className='li' ><NavLink  activeClassName="active-link" to ="/admin/announcements" >Announcements</NavLink></Box>
           <Box className='li' ><NavLink  activeClassName="active-link" to ="/admin/questions" >Questions</NavLink></Box>
           <Box className='li' ><NavLink  activeClassName="active-link" to ="/admin/problems" >problems</NavLink></Box>

        </Flex>
        
{/*  this part is about display hamburger in menu item for small screeens  */}
            <Box ml={"100px"} onClick={()=>setshow1(!show1)}>  gurubilli siva
             <i style={{marginLeft:"20px"}} className="fa-solid fa-circle-chevron-down" ></i>
           </Box> 
        </Hide>
     </Flex>
  </Flex>
  
 {show1 && <AdminProfileComponent setshow1={setshow1} />}
    

{/*  this part is about display hamburger in menu item for small screeens  */}

    <Show  below="md" >
         <Box ml="90%" ><i id ="bar" onClick={handleclick}  className={clicked ? "fas fa-times":"fas fa-bars"}></i></Box>
    </Show>

{/* this is part is like when user enter into smaller screens the navbar apper on left down side as side bar  */}
   
    <div id="navbar-mobile"   className={clicked ? "navbar-mobile active":"navbar-mobile"}>
    <li> <NavLink  activeClassName="active-link" to ="/admin/lectures" >Lectures</NavLink></li>
        <li>  <NavLink  activeClassName="active-link" to ="/admin/assignments" >Assignments</NavLink></li>
          <li> <NavLink  activeClassName="active-link" to ="/admin/admin/signup" >Quizzes</NavLink></li>
         <li> <NavLink  activeClassName="active-link" to ="/admin/tickets" >Tickets</NavLink></li>
         <li> <NavLink  activeClassName="active-link" to ="/admin/discussons" >Discussons</NavLink></li>
          <li> <NavLink  activeClassName="active-link" to ="/admin/notifications" >Notifications</NavLink></li>
        <li> <NavLink  activeClassName="active-link" to ="/admin/messages" >Messages</NavLink></li>
        <li> <NavLink  activeClassName="active-link" to ="/admin/electives" >Electives</NavLink></li>
        <li> <NavLink  activeClassName="active-link" to ="/admin/announcements" >Announcements</NavLink></li>
        <li><NavLink  activeClassName="active-link" to ="/admin/questions" >Questions</NavLink></li>
        <li><NavLink  activeClassName="active-link" to ="/admin/problems" >problems</NavLink></li>
           <Divider borderColor="gray.300"/>
        <Text color="black"  padding="10px"><NavLink activeClassName ="active-link" to="/admin/profile" >Profile</NavLink></Text>
        <Text color="black"  padding="10px"><NavLink activeClassName ="active-link" to="/transcript" >Transcript </NavLink></Text>
        <Text color="black"  padding="10px">Logout</Text>   
    </div>
    </Box>
 </Box>
 
  );
};

export default Navbar;

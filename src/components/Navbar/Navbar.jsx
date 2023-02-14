import React, { useState } from 'react';
import "./Navbar.css"
import { Link,NavLink } from "react-router-dom";
import { masaiimage } from '../../assets/assets';
import Profilecomponent from '../ProfileComponent/Profilecomponent.jsx';
 import { Divider, Text,Flex, Image } from '@chakra-ui/react';
import { Navbararr } from '../../assets/assets';



const Navbar = () => {
  const [clicked,setcliked] = useState(false)
  const [show1,setshow1] =    useState(false)

//   this handleclick function for open and closing of side navbar in smaller screens
 const handleclick=()=>{
    setcliked(!clicked)
  }


  
  return (
    <>
    <nav>
    <Link  to="/"> <Image objectFit='contain' src={masaiimage} alt='Masai logo' /></Link>

    {/* navbar part links for each element  */}
    {/* Navbararr is like all elements which should display on navbar is mapped using map function */}

    <div >
        <ul id ="navbar" className={clicked ? "#navbar active" : "#navbar"}>
        {Navbararr.map((el)=>(<li><NavLink activeClassName ="active-link" to={el.toLowerCase()} >{el}</NavLink> </li>))}
          <Flex>
             <li> <button className='login-name' onClick={()=>setshow1(!show1)}>name   <i  className="fa-solid fa-caret-down"></i> </button></li >  
          </Flex>
        </ul>
          {show1 && <Profilecomponent setshow1={setshow1} />}
    </div>

{/*  this part is about display hamburger in menu item for small screeens  */}

    <div id ="mobile" onClick={handleclick}>
         <i id ="bar"  className={clicked ? "fas fa-times":"fas fa-bars"}></i>
    </div>

{/* this is part is like when user enter into smaller screens the navbar apper on left down side as side bar  */}
   
    <div id="navbar-mobile"   className={clicked ? "navbar-mobile active":"navbar-mobile"}>
        {Navbararr.map((el)=>(<li><NavLink activeClassName ="active-link" to={el.toLowerCase()} >{el}</NavLink> </li>))}
        <Divider borderColor="gray.300"/>
        <Text color="black"  padding="10px"><NavLink activeClassName ="active-link" to="/user/profile" >Profile</NavLink></Text>
        <Text color="black"  padding="10px"><NavLink activeClassName ="active-link" to="/transcript" >Transcript </NavLink></Text>
        <Text color="black"  padding="10px">Logout</Text>   
    </div>
  </nav> 
 <Divider />
    </>  
  );
};

export default Navbar;

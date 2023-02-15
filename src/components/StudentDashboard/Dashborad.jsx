import React from 'react'
import Secondnavbar from './Secondnavbar'
import {useParams} from "react-router-dom";
import {Box} from "@chakra-ui/react"
import '../../App.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Navbar from '../StudentNavbar/Navbar';

const Dashborad = () => {
    
   
  return (
   <>
   
    <div className='container' >
    <Navbar/> 
    <Secondnavbar  />
      <Box  
      w="80%" 
      p="10px" 
      borderRadius="10px" 
      minHeight="40px" 
      maxHeight="auto" 
      bg='white' 
      ml="10%" 
      mt="70px"  
       >
  
      </Box>

    </div>
    </>

  )
}

export default Dashborad
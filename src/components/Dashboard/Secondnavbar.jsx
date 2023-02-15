import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from "react-router-dom"
import { Box,Text,Flex,Heading,ButtonGroup,Button,Spacer } from '@chakra-ui/react'
import "../../App.css"
import { referAndEarnLink, sprintplanlink } from '../../assets/assets'

const SecondNavbar = () => {
   const navigate = useNavigate()

return (
  <div className='container'>
        
      <Flex  style={{ borderRadius: '5px' }}  bg="white" h="70px"   w="100%" alignItems='center' justifyContent="space-around" >
         <Box p='2' mr="300px">
           <Heading size='md'>Todays Schedule</Heading>
        </Box>
        
           <ButtonGroup gap='2'>
               <Button bg="rgb(51,61,76)" h='35px' color="white" w="140px" onClick={()=>navigate("/bookmarks")}>Book Marks</Button>
               <Button bg="rgb(51,61,76)" h='35px' color="white" w="140px"> <Link to ={sprintplanlink}>Sprint Plan</Link></Button>
               <Button bg="rgb(51,61,76)" h='35px' color="white" w="140px" ><Link to={referAndEarnLink}>Refer & Earn </Link></Button>
          </ButtonGroup>
       </Flex>
    </div>
  )
}

export default SecondNavbar
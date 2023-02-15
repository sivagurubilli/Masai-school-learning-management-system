import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from "react-router-dom"
import { Box,Text,Flex,Heading,ButtonGroup,Button,Spacer } from '@chakra-ui/react'
import "../../App.css"

const Secondnav = () => {
 

    const navigate = useNavigate()
    
return (
  <div className='container'>
        
      <Flex  style={{ borderRadius: '10px' }} bg="white" h="70px" p ="20px" mt="-10px" minWidth='max-content' alignItems='center' justifyContent="space-around" >
         <Box p='2' >
           <Heading size='md'>Lectures</Heading>
        </Box>
         <Spacer />
           <ButtonGroup gap='2'>
               <Button bg="rgb(51,61,76)" h='35px' color="white" w="140px" >Create Bulk Lectures</Button>
               <Button bg="rgb(51,61,76)" h='35px' color="white" w="140px"> Create Lectures</Button>

          </ButtonGroup>
       </Flex>
    </div>
  )
}

export default Secondnav
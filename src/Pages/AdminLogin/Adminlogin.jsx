import React , { useState } from 'react';
import './Adminlogin.css';
import { masaiimage } from '../../assets/assets';
import Tooltip from "../../components/Tooltip/Tooltip";
import { Flex, Box, Input,FormControl,FormLabel, Image, Checkbox,  Button,Container,  HStack} from "@chakra-ui/react";
import { validatePassword,validateEmail} from '../../components/Helper';



const Adminlogin = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [forgotPass, setForgotPass] = useState(false);
   const [show,setShow]= useState(false)
   const [passwordError,setPasswordError] = useState()
 const [showPasswordError,setShowPasswordError] =useState(false)

// const passwordError = "Password must have more than 8 characters, contain a capital letter, contain a number, and should not contain an underscore."

const handleSubmit = (e) => {
  e.preventDefault();
  
  let res= validatePassword(loginPassword)
    if(res){
    setPasswordError(res)
     setShowPasswordError(true)
      }

     if (validateEmail(loginEmail)===false) {
    setShow(true)
    } 
    else {
    
    //  code to submit the form goes here. after get api
  
    
  }
};


  return (
 <div className='container'>    
  <Container w="100%"  centerContent>
    <Image boxSize='150px'  objectFit='contain' mt='40px' src={masaiimage} alt='Masai logo' />
       <Box w={["full","md"]}
         p="10px 20px 20px 30px"
         mx="auto"
         border={['none']}
         bg="white"
         borderColor={["",'grey.300']}
         borderRadius={10}
         boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">


 {/* {<p>Whoops! Something went wrong
  <ul>  These credentials do not match our records.</ul></p>} */}


        <FormControl>
             <FormLabel fontWeight="500" color="rgb(31,41,55)" fontSize="15px" mt={4}>Email</FormLabel>
                 <Input required="true" variant='outline'  placeholder='email' onChange={(e)=>setLoginEmail(e.target.value)}/>
                    {show && (<Tooltip value={"Please enter a valid email address."} show={show} setShow={setShow}/>)}
        </FormControl>


       <FormControl>
          <FormLabel  fontWeight="500" color="rgb(31,33,40)" fontSize="15px" mt={4} >Password</FormLabel>
             <Input variant='outline' required placeholder='password' onChange={(e)=>setLoginPassword(e.target.value)} />
                   {showPasswordError && (<Tooltip value ={passwordError} show={showPasswordError} setShow={setShowPasswordError}/>)}
        </FormControl>



         <HStack mt='10px' w='full' justify="space-between">
               <Checkbox>Remember Me</Checkbox>
          </HStack>

      <Flex justifyContent="flex-end">
        <HStack>
           <Button variant="link" textDecoration="underline" color="fire">Forget your password?</Button>
           <Button bg="black" h="35px"   w="80px" color="white"  rounded="10px" onClick={handleSubmit}>Login</Button>
        </HStack>
      </Flex>
   </Box>
 </Container>
</div>

  )
}

export default Adminlogin
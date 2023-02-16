import React, { useState  ,Dispatch } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Adminlogin.css";
import { masaiimage } from "../../../Assets/Assets";
import Tooltip from "../../../components/Tooltip/Tooltip";
import  {RootState}  from "../../../redux/store";
import { AdminLoginAction } from "../../../redux/Authreducer/actions";

import {
  Flex,
  Text,
  Box,
  Input,
  FormControl,
  FormLabel,
  Image,
  Checkbox,
  Button,
  Container,
  HStack,
} from "@chakra-ui/react";
import {
  validatePassword,
  validateEmail,
} from "../../../components/Emailvalidator";


interface IAdminLoginProps {

  loginEmail: string;
  loginPassword: string;
}

//validation Error state
interface IValidationError {
  message: string;
  value?: string | IValidationError;
}

const Adminlogin = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [forgotPass, setForgotPass] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch: Dispatch<any> = useDispatch()
  const {isAuthenticated,isAdmin } = useSelector((store: RootState) => store.Authreducer)


  const handleEmail=(event: React.ChangeEvent<HTMLInputElement>)=>{
    setShow(false)
    setLoginEmail(event.target.value)
    if(validateEmail(event.target.value)===false){
      setShow(true)

    }
  } 

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
   
   
   dispatch(AdminLoginAction({  loginEmail,loginPassword}))
      // code to submit the form goes here. after get api
    
  };

  return (
    <div className="container">
     
      <Container mt= "120px" alignItems="center" w="100%" centerContent>
        <Image
         height="60px"
          objectFit="contain"
         
          src={masaiimage}
          alt="Masai logo"
        />
        <Box
          w={["full", "md"]}
          p="10px 20px 20px 30px"
          mx="auto"
          mt="30px"
          border={["none"]}
          bg="white"
          borderColor={["", "grey.300"]}
          borderRadius={10}
          boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <FormControl >
            <FormLabel
              fontSize=".875rem"
              fontWeight="500"
              color="rgb(55 65 81)"
              mt={4}
            >
              Email
            </FormLabel>
            <Input
              variant="outline"
              placeholder="Email"
              onChange={handleEmail}
            />
            {show && (
              <Tooltip
                value={"Please enter a valid email address."}
                show={show}
                setShow={setShow}
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel
              fontSize=".875rem"
              fontWeight="500"
              color="rgb(55 65 81)"
              mt={4}
            >
              Password
            </FormLabel>
            <Input
              variant="outline"
              required
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
           
          
          </FormControl>
          <HStack mt="10px" w="full">
            <Checkbox></Checkbox>
            <Text color={"rgb(75 85 99)"} fontSize=".900rem">
              Remember me
            </Text>
          </HStack>
          <Flex justifyContent="flex-end">
            <HStack>
              <Button
                variant="link"
                _hover={{ color: "black" }}
                fontSize={".850rem"}
                textDecoration="underline"
                color="rgb(75 85 99)"
              >
                Forget your password?
              </Button>
              <Button
                bg="rgb(31 41 55)"
                _hover={{bg: "black" }}
                h="35px"
                w="90px"
                color="white"
                rounded="10px"
                onClick={
                  handleSubmit as React.MouseEventHandler<HTMLButtonElement>
                }
              >
               <Text fontSize="14px"> LOG IN</Text>
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </div>
  );
};

export default Adminlogin;

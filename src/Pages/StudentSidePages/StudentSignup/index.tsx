import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

import { Box, Image } from "@chakra-ui/react";
import {
  batchValues,
  masaiimage,
  sectionValues,
} from "../../../Assets/Assets";
import {IBatchObject,ISectionObject,} from "../../../Services/SelectionInterface"
import {getBatchArrray,
  getSectionArray,} from "../../../Services/SelelctionService"
import {
   IAuthsignupResponse} from "../../../Services/AuthInterface"
import {
  StudentSignupService,
} from "../../../Services/AuthServices";
import "./index.css";
import { useNavigate } from "react-router-dom";

//interface for form data
interface IFormData {
  name: string;
  batchId: number;
  sectionId: number;
  email: string;
  password: string;
  reEnterPassword: string;
}

//validation schema for validating form values using yup library
const validationSchema = yup.object().shape({
  name: yup.string().required("This feild is required").min(3, "Name must be 3 character"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string().required("Password is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[A-Z]/, "Password requires a uppercase letter")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[_]/, "Password requires a underScore Symbol"),
  reEnterPassword: yup
    .string().required("Please Re-enter the password")
    .oneOf([yup.ref("password")], "ReEntered Password must match witch previous password"),
});

const initialValues: IFormData = {
  name: "",
  email: "",
  batchId: 1,
  sectionId: 1,
  password: "",
  reEnterPassword: "",
 
};

// student Signup component
export default function StudentSignup({setGotoSignup}:any) {
 
  const [BackendError,setBackendError] = useState({
    backendErrorMessage:"",
    errorFromBackend:false
  })
const [isLoading,setLoading] = useState(false)
  const [batchDetails,setBatchDetails] = useState([])
  const [sectionDetails,setSectionDetails] = useState([])
   
  const navigate = useNavigate();

  useEffect(()=>{
  getBatchArrray().then((res:any)=>{
  setBatchDetails(res)
  })
  getSectionArray().then((res:any)=>{
    setSectionDetails(res)
    })
   },[])


//onsubmitting call services for manage apis
  const onSubmit = async (values: IFormData) => {
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },3000)

    StudentSignupService(values).then((res:IAuthsignupResponse)=>{
       if(res.name){
        setGotoSignup(false)
       }
       if(!res.name){
        setBackendError({...BackendError, errorFromBackend:true});
       }
    })
    }

//destructuring methods from useformik library 
  const { handleSubmit, handleBlur, touched, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

    // function toggle go to sign up and login components
  const gotoLogin = () => {
   setGotoSignup(false)
  }

  return (
    <>
      <div className="container">
        <Container mt="60px" paddingBottom={"100px"} alignItems="center" w="100%" centerContent>
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
            h="auto"
            border={["none"]}
            bg="white"
            borderColor={["", "grey.300"]}
            borderRadius={10}
            boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
          >
           { BackendError.errorFromBackend && <div className="errorlist">
              <ul>
               <p >Whoops! Something went wrong.
                   <li>User is already registered with theese credintials</li>

                   </p>
                    </ul>
              </div>}
            <form onSubmit={handleSubmit}>
              <div>
                <FormLabel
                  fontSize=".875rem"
                  fontWeight="500"
                  color="rgb(55 65 81)"
                  mt={4}
                >
                  Name
                </FormLabel>
                <Input
                  variant="outline"
                  type="name"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {touched.name && errors.name && <div className="error-showing-popup">{errors.name}</div>}
              </div>
              <FormLabel
                fontWeight="500"
                color="rgb(55 65 81)"
                fontSize=".900rem"
                mt={4}
              >
                Select batch
              </FormLabel>
              <Select
                className="selectbatch"
                name="batchId"
                onChange={handleChange}
                value={values.batchId}
                placeholder="Select an option"
              >
                
              </Select>
              <FormLabel
                fontWeight="500"
                color="rgb(55 65 81)"
                fontSize=".900rem"
                mt={4}>
                Select Section
              </FormLabel>
              <Select
                className="selectbatch"
                placeholder="Select an option"
                name="sectionId"
                onChange={handleChange}
                value={values.sectionId}
              >
              
              </Select>
              <div>
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
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors.email && <div className="error-showing-popup">{errors.email}</div>}
              </div>
              <div>
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
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {touched.password && errors.password && <div className="error-showing-popup">{errors.password}</div>}
              </div>
              <div>
                <FormLabel
                  fontSize=".875rem"
                  fontWeight="500"
                  color="rgb(55 65 81)"
                  mt={4}
                >
                  Re Enter Password
                </FormLabel>
                <Input
                  variant="outline"
                  type="password"
                  placeholder="Re Enter Password"
                  name="reEnterPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.reEnterPassword}
                />
                {touched.reEnterPassword && errors.reEnterPassword && <div className="error-showing-pop-up">{errors.reEnterPassword}</div>}
              </div>
                 
              <Flex justifyContent="flex-between">
                <button className="buttonlogin" type="button"  onClick={gotoLogin}>
                  <Text fontSize="14px">
                    If Already Signup? please Log in here
                  </Text>
                </button>
              
                  <Button
                isLoading={isLoading}
                bg="rgb(31 41 55)"
                color="white"
                _hover={{ bg: "rgb(55 65 81)" }}
                type="submit"
                w="90px"
                h="35px"
                ml="10px"
                mt="20px"
              >
              <Text fontSize="14px">SIGN UP</Text>
              </Button>
              </Flex>
            </form>
          </Box>
        </Container>
      </div>
    </>
  );
}

import * as yup from "yup";
import { useFormik } from "formik";
import React,{useState} from "react";
import "./index.css";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  FormLabel,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { Box, Image } from "@chakra-ui/react";
import { masaiimage } from "../../../assets/assets";
import {IAuthloginResponse} from "../../../Services/AuthInterface"
import { LoginService } from "../../../Services/AuthServices";
import { useNavigate } from "react-router-dom";

//interface for form data
interface IFormData {
  username: string;
  password: string;
  rememberMe: boolean;
 
}
interface IErrorDisplay{
  backendErrorMessage:string
 errorFromBackend:boolean
}

//valiadation schema for yup library
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .email("Invalid Email address")
    .required("Email is required"),
  password: yup
    .string().required("Password is required")
    .min(8, "Password must be at least 8 characters")
   
});

const initialValues : IFormData={
  username: "",
  password: "",
  rememberMe: false,
}

//student login component
export default function StudentLogin({setGotoSignup}:any) {
  const [BackendError,setBackendError] = useState({
    backendErrorMessage:"",
    errorFromBackend:false
  })
  const [isLoading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate();
 
  // function toggle go to sign up and login components
   const GotoSignup = ()=>{
    setGotoSignup(true)
   }

  //on submitting form it checks the validations using formik and use services here 
  const onSubmit = async (values: IFormData) => {
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },3000)

LoginService(values).then((res:IAuthloginResponse)=>{

   if(res.token){
    if(res.user.roles[0].name==="STUDENT_USER"){
    navigate("/student/dashboard")
    }

    if(res.user.roles[0].name !=="STUDENT_USER"){
      navigate("/admin/dashboard")
      }
   }
     
  if(!res.token){
    setBackendError({ ...BackendError,
    errorFromBackend:true})
    }
 });

  }
//destructuring methods from useFormik
 const { handleSubmit, handleChange, touched, values, errors } = useFormik({
 initialValues,
  validationSchema,
  onSubmit,
});

  return (
    <>
      <div className="container">
        <Container mt="120px" alignItems="center" w="100%" centerContent>
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
            h="auto"
            mt="30px"
            border={["none"]}
            bg="white"
            borderColor={["", "grey.300"]}
            borderRadius={10}
            boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)" >

            {BackendError.errorFromBackend && 
            <div className="errorlist">
              <ul>
               <p >Whoops! Something went wrong.
                   <li> These credentials do not match our records.</li>
                   </p>
                    </ul>
              </div>}
            <form onSubmit={handleSubmit}>
              <div>
                <FormLabel
                  fontSize=".875rem"
                  fontWeight="500"
                  color="rgb(55 65 81)"
                  mt={4}>
                  Email
                </FormLabel>
                <Input
                  variant="outline"
                  type="username"
                  placeholder="Email"
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                />
                {touched.username && errors.username && <div className="error-showing-popup">{errors.username}</div>}
              </div>
              <div>
                <FormLabel
                  fontSize=".875rem"
                  fontWeight="500"
                  color="rgb(55 65 81)"
                  mt={4}>
                  Password
                </FormLabel>
                <Input
                  variant="outline"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
                {touched.password && errors.password && <div className="error-showing-popup">{errors.password}</div>}
              </div>
              <HStack mt="10px" w="full">
                <Checkbox
                  type="checkbox"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                ></Checkbox>
                <Text color={"rgb(75 85 99)"} fontSize=".900rem">
                  Remember me
                </Text>
              </HStack>

              <Flex mt ="10px"  justifyContent="space-between" flexWrap="wrap" justifyItems={"flex-end"}>
                <Box >
                  <Button
                    variant="link"
                   h="auto"
                   mt="20px"
                    _hover={{ color: "black" }}
                    fontSize={".850rem"}
                    textDecoration="underline"
                    color="rgb(75 85 99)"
                    ml="50px"
                    onClick={() => navigate("/forgot-password")}>
                    Forget your password?
                  </Button>
                  </Box>
                  <Box>
                  <Button
                bg="rgb(31 41 55)"
                color="white"
                _hover={{ bg: "rgb(55 65 81)" }}
                w="90px"
                h="35px"
                ml="10px"
                mt="10px"
               onClick={GotoSignup} >
              <Text fontSize="14px">SIGN UP</Text>
              </Button>
                  <Button
                isLoading={isLoading}
                bg="rgb(31 41 55)"
                color="white"
                _hover={{ bg: "rgb(55 65 81)" }}
                type="submit"
                w="90px"
                h="35px"
                ml="10px"
                mt="10px"
              >
              <Text fontSize="14px">LOG IN</Text>
              </Button>
                  </Box>
              </Flex>
            </form>
          </Box>
        </Container>
      </div>
    </>
  );
}

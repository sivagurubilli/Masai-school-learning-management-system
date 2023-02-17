import React, { useState, Dispatch, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { masaiimage } from "../../../Assets/Assets";
import Tooltip from "../../../Components/Tooltip/Tooltip";
import { RootState } from "../../../Redux/store";
import CaptchaTest from "../../../Components/CaptchaTest"
 import { AdminLoginAction } from "../../../Redux/Authreducer/actions";
 import { IAuthAdminlogin ,AdminLoginService} from "../../../Services/AuthServices";
 import {
  validatePassword,
  validateEmail,
} from "../../../Components/Emailvalidator";
import { useNavigate } from "react-router-dom";
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
  FormErrorMessage,
} from "@chakra-ui/react";



// interface for form values
interface ILoginFormState {
  email: string;
  password: string;
  rememberMe:boolean
}
//interface for error handling values
interface IFormErrorState {
  forgotPass: boolean;
  emailError: boolean;
  loginErrorFromBackend:boolean;
  passwordError: boolean;
}

// reducer action types  for handling reducer  function
type LoginFormAction =
  | { type: "email"; payload: string }
  | { type: "password"; payload: string }
  | {type :"rememberMe"; payload:boolean}

// initial state signup form
const initialState: ILoginFormState = {
  email: "",
  password: "",
  rememberMe:false
};

// set email and password values through useReducer
const reducer = (state: ILoginFormState, action: LoginFormAction) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
      case "rememberMe":
        return {...state,rememberMe:action.payload}
    default:
      return state;
  }
};

// react fnction component for  login
const Adminlogin = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const [loginFormError, setLoginFormError] = useState<IFormErrorState>({
    forgotPass: false,
    emailError: false,
    loginErrorFromBackend:false,
    passwordError: false,
  });


  const navigate = useNavigate()
  const dispatch: Dispatch<any> = useDispatch();
  const { isAuthenticated, isAdmin } = useSelector(
    (store: RootState) => store.Authreducer
  );





// handle email change is used to  set email value check if email valid or not and set value for email error
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState({ type: "email", payload: value });

    const isValid = validateEmail(value);
    if (isValid != true) {
      setLoginFormError({ ...loginFormError, emailError: true });
    } else {
      setLoginFormError({ ...loginFormError, emailError: false });
    }
  };

   const AdminLoginChecking =async()=>{
    const AdminloginDetails:  IAuthAdminlogin= {
      email:state.email,
      password:state.password,
     
    };

   const isAuth = await AdminLoginService(AdminloginDetails)
   console.log(isAuth)
   }


  // when  click on login button call the the api with email and password as payload
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    
   if(state.password && state.email){

      setLoginFormError({ ...loginFormError, passwordError: false });
    // code to submit the form goes here. after get api

    AdminLoginChecking()
        
  
    // if rememberme is checked and is authenticated logic goes heree
    } if(state.rememberMe===true && isAuthenticated){
      localStorage.setItem("email", state.email);
    localStorage.setItem("password", state.password);
  } if(state.rememberMe===false && isAuthenticated) {
    sessionStorage.setItem("email", state.email);
    sessionStorage.setItem("password", state.password);
  }
  
  if(state.password===""){
    setLoginFormError({ ...loginFormError, passwordError: true });
  }
}

  return (
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
          mt="30px"
          border={["none"]}
          bg="white"
          borderColor={["", "grey.300"]}
          borderRadius={10}
          boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
        >
           { loginFormError.loginErrorFromBackend&& <Text color="rgb(234,62,62)">
            <p>Whoops! Something went wrong
           <ul> <li style={{marginLeft:"40px"}}> These credentials do not match our records.</li></ul></p>
           </Text>}

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
              value={state.email}
              placeholder="Email"
              onChange={handleEmailChange}
            />
           
            {loginFormError.emailError && (
              <div className="email-error-showing-popup">
                {"Please enter valid email adddress"}
              </div>
            )}
          </FormControl>
          <FormControl >
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
              name="loginPassword"
              value={state.password}
              placeholder="Password"
              onChange={(e) =>
                setState({ type: "password", payload: e.target.value })
              }
            />{" "}
            {loginFormError.passwordError && (
              <div className="email-error-showing-popup">
                {"Please enter password"}
              </div>
            )}
            </FormControl>
         
          <HStack mt="10px" w="full">
            <Checkbox  checked={state.rememberMe}  onChange={(e) =>
                setState({ type: "rememberMe", payload: e.target.checked })
              }></Checkbox>
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
                onClick={()=>navigate("/forgotpassword")}
              >
                Forget your password?
              </Button>
              <Button
                bg="rgb(31 41 55)"
                _hover={{ bg: "black" }}
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

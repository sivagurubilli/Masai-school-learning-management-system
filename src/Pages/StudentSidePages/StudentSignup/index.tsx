import React, { useRef, useReducer, useEffect,useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import "../../AdminSidePages/AdminLogin/index.css"
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { RootState } from "../../../Redux/store";
import { AdminsignupAction } from "../../../Redux/Authreducer/actions";
import Tooltip from "../../../Components/Tooltip/Tooltip";
import {
  validateEmail,
  validatePassword,
} from "../../../Components/Emailvalidator";

import {
  masaiimage,
  recaptchasitekey,
  reacptchasecret,
  batchValues,
  sectionValues,
} from "../../../Assets/Assets";
import "../../../App.css";

import {
  Flex,
  Box,
  Select,
  Input,
  FormControl,
  FormLabel,
  Image,
  Text,
  Checkbox,
  Button,
  HStack,
  Container,
  FormErrorMessage,
} from "@chakra-ui/react";

// interface of elements of form state
interface ISignupFormState {
  name: string;
  batch:string | undefined;
  section:string | undefined;
  email: string;
  password: string;
  reEnteredPassword: string;
 
}

//interface for password validation state
interface IPasswordValidationState {
  hasLength: boolean;
  hasCapital: boolean;
  hasNumber: boolean;
  hasUnderscore: boolean;
}

//interface for secting tags of batch and section
interface ISeclectingvalues {
    batcheOption: string;
    sectionOption: string;
  }

// interface for form error state
interface IFormErrorState {
  passwordError: boolean;
  emailError: boolean;
  showRetypePasswordError: boolean;
  showEmptyError: boolean;
  responseErrorfromBackend:boolean
} 

// reducer action types  for handling reducer  function
type SignupFormAction =
  | { type: "name"; payload: string }
  | {type:"batch"; payload:string}
  | {type:"section"; payload:string}
  | { type: "email"; payload: string }
  | { type: "password"; payload: string }
  | { type: "reEnteredPassword"; payload: string }
 

// initial state signup form
const initialState: ISignupFormState = {
  name: "",
  batch:"",
  section:"",
  email: "",
  password: "",
  reEnteredPassword: "",

};


// set email and password values through useReducer
const reducer = (state: ISignupFormState, action: SignupFormAction) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
      case "batch":
      return { ...state, password: action.payload };
      case "section":
      return { ...state, password: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "reEnteredPassword":
      return { ...state, reEnteredPassword: action.payload };
    default:
      return state;
  }
};

const StudentSignup = () => {
  const [state, setState] = useReducer(reducer, initialState);
 const [formErrorState,setFormErrorState]  = useState<IFormErrorState>({
  passwordError: false,
  emailError: false,
  showRetypePasswordError:false,
  showEmptyError: false,
  responseErrorfromBackend:false
 })
   const [isPasswordValid, setIsPasswordValid] = useState<IPasswordValidationState>({
    hasLength: false,
    hasCapital: false,
    hasNumber: false,
    hasUnderscore: false,
  });



  const dispatch: Dispatch<any> = useDispatch();
  const { isAuthenticated, isAdmin } = useSelector(
    (store: RootState) => store.Authreducer
  );

  const SignupDetails: ISignupFormState = {
    name: state.name,
    batch:state.batch,
    section:state.section,
    email: state.email,
    password: state.password,
    reEnteredPassword: state.reEnteredPassword,
  
  };



  // validating password
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState({ type: "password", payload: value });
    const hasLength = value.length >= 8;
    const hasCapital = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasUnderscore = /_/.test(value);
    if (
      hasLength != true ||
      hasCapital != true ||
      hasNumber != true ||
      hasUnderscore != true
    ) {
      setFormErrorState({...formErrorState,passwordError:true});
    } else {
      setFormErrorState({...formErrorState,passwordError:false})
    }

    setIsPasswordValid({
      hasLength,
      hasCapital,
      hasNumber,
      hasUnderscore,
    });
  };
  // validating retyped password
  const handleRetypePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setState({
      type: "reEnteredPassword",
      payload: event.target.value,
    });
    if (value != state.password) {
      setFormErrorState({...formErrorState,showRetypePasswordError:true})
    } else {
      setFormErrorState({...formErrorState,showRetypePasswordError:false})
    }
  };
  // validating name field
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState({ type: "name", payload: value });

    if (!state.name) {
      setFormErrorState({...formErrorState,showEmptyError:true})
    } else {
      setFormErrorState({...formErrorState,showEmptyError:false})
    }
  };
  // validating email
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState({ type: "email", payload: value });

    const isValid = validateEmail(value);
    if (isValid != true) {
      setFormErrorState({...formErrorState,emailError:true})
    } else {
      setFormErrorState({...formErrorState,emailError:false})
    }
  };

  
  const handlebatchChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
setState({type:"batch",payload:event.target.value})
  }

 
  

// when clicking on signup button user handle api call for signup
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //  code to submit the form goes here. after get api
     if((!state.name || !state.email || !state.password || !state.reEnteredPassword)  || ( formErrorState.showEmptyError===true || formErrorState.emailError===true || formErrorState.passwordError ===true
      || formErrorState.showRetypePasswordError ===true )){
        setFormErrorState({...formErrorState, responseErrorfromBackend:true})

    }else{
      setFormErrorState({...formErrorState,responseErrorfromBackend:false})
     // handling services for api calling

      
    }
  }

  return (
    <>
      <div className="container">
        <Container mt="20px" w="100%" centerContent>
          <Image
            height="60px"
            objectFit="contain"
            mt="40px"
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

            {formErrorState.responseErrorfromBackend && <Text color="rgb(234,62,62)">
            <p>Whoops! Something went wrong
           <ul> <li style={{marginLeft:"40px"}}> These credentials do not match our records.</li></ul></p>
           </Text>}

            <FormControl >
              <FormLabel
                fontWeight="500"
                color="rgb(55 65 81)"
                fontSize=".900rem"
                mt={4}
              >
                Name
              </FormLabel>
              <Input
                
                variant="outline"
                placeholder="Name"
                onChange={handleNameChange}
              />
               {formErrorState.showEmptyError && (
              <div className="email-error-showing-popup">
                {"This feild is required please fill this field"}
              </div>
            )}
          </FormControl>
          
           <FormControl>
           <FormLabel fontWeight="500"
                color="rgb(55 65 81)"
                fontSize=".900rem"
                mt={4}>Select batch</FormLabel>
           <Select
             placeholder="Select an option"
             value={state.batch}
             color="grey"
             fontSize=".900rem"
             fontWeight="500"
            // onChange={handlebatchChange}
           >
             {batchValues.map((option) => (
               <option  key={option.value} value={option.value}>
               {option.label} 
               </option>
             ))}
           </Select>
         </FormControl>
       

         <FormControl>
           <FormLabel fontWeight="500"
                color="rgb(55 65 81)"
                fontSize=".900rem"
                mt={4}>Select section</FormLabel>
           <Select
             placeholder="Select an option"
             value={state.section}
             color="grey"
             fontSize=".900rem"
             fontWeight="500"
            //onChange={handlebatchChange}
           >
             {sectionValues.map((option) => (
               <option key={option.value} value={option.value}>
                 {option.label}
               </option>
             ))}
           </Select>
         </FormControl>
         <FormControl>
              <FormLabel
                fontWeight="500"
                color="rgb(55 65 81)"
                fontSize=".900rem"
                mt={4}
              >
                Email
              </FormLabel>
              <Input
                variant="outline"
                placeholder="Email"
                // onChange={handleEmailChange}
              />
                {formErrorState.emailError && (
              <div className="email-error-showing-popup">
               {"Please Enter Valid Email Address"}
              </div>
            )}
              
</FormControl>
            <FormControl >
              <FormLabel
                fontWeight="500"
                color="rgb(55 65 81)"
                fontSize=".900rem"
                mt={4}
              >
                Password
              </FormLabel>
              <Input
                variant="outline"
                required
                placeholder="Password"
                onChange={handlePasswordChange}
              />
                {formErrorState.passwordError && (
              <div className="email-error-showing-popup">
               <ul style={{ marginLeft: "0px" ,listStyle:"none"}}>
                  <li >
                    Have more than 8 characters{" "}
                    {isPasswordValid.hasLength ? "✅" : "❌"}
                  </li>
                  <li>
                    Contains a capital letter{" "}
                    {isPasswordValid.hasCapital ? "✅" : "❌"}
                  </li>
                  <li>
                    Contains a number {isPasswordValid.hasNumber ? "✅" : "❌"}
                  </li>
                  <li>
                    Contains an underscore{" "}
                    {isPasswordValid.hasUnderscore ? "✅" : "❌"}
                  </li>
                </ul>
              </div>
            )}
             </FormControl>

            <FormControl >
              <FormLabel
                fontWeight="500"
                color="rgb(55 65 81)"
                fontSize=".900rem"
                mt={4}
              >
                Re-enter Password
              </FormLabel>
              <Input
                variant="outline"
                placeholder="Re-enter Password"
                onChange={handleRetypePasswordChange}
              />
               {formErrorState.showRetypePasswordError && (
              <div className="email-error-showing-popup">
              {"Password did not Matched"}
              </div>
            )}
             

         </FormControl>
         

            <Flex justifyContent="flex-end">
              <HStack>
                <Button
                  bg="rgb(31 41 55)"
                  h="35px"
                  mt="15px"
                  w="90px"
                  color="white"
                  rounded="10px"
                  _hover={{ bg: "black" }}
                  onClick={handleSubmit}
                >
                  SIGN UP
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default StudentSignup;

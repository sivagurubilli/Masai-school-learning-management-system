import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Container,
  Flex,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Box, Image } from "@chakra-ui/react";
import { masaiimage } from "../../../assets/assets";
import { AdminSignupService } from "../../../Services/AuthServices";
import "./index.css";
import { useNavigate } from "react-router-dom";

import Captcha from "./Captcha";
import CommonModalComponent from "../../../components/Modal/commonModal";

//interface for form data
interface IFormData {
  name: string;
  email: string;
  password: string;
  reEnterPassword: string;
}

interface Icaptchamatched {
  captchaMatch: boolean;
}

//validation Schema for validating values using yupp library
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("This feild is required")
    .min(3, "Name should not be less than 3 character"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[A-Z]/, "Password requires a uppercase letter")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[_]/, "Password requires a underScore Symbol"),
  reEnterPassword: yup
    .string()
    .required("Please Re-Enter password")
    .oneOf(
      [yup.ref("password")],
      "ReEntered Password must match witch previous password"
    ),
});

//initial values of form data
const initialValues: IFormData = {
  name: "",
  email: "",
  password: "",
  reEnterPassword: "",
};

interface IErrorDisplay {
  backendErrorMessage: any;
  errorFromBackend: boolean;
}

const initialCaptcha: Icaptchamatched = {
  captchaMatch: false,
};

//signup for admin component start here
export default function AdminSignup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorBody, setErrorBody] = useState<string>("");
  const [BackendError, setBackendError] = useState<IErrorDisplay>({
    backendErrorMessage: "",
    errorFromBackend: false,
  });
  const [isLoading, setLoading] = useState(false);
  const [CaptchaMatched, setCaptchaMatched] = useState(initialCaptcha);
  const navigate = useNavigate();

  const setCaptcha1 = (value: boolean) => {
    setCaptchaMatched({ ...CaptchaMatched, captchaMatch: value });
  };
  // using formik and yup library just checking validations using useformik
  //onSubmitting value call the services for api call
  const onSubmit = async (values: IFormData) => {
    if (!CaptchaMatched.captchaMatch) {
      setIsOpen(true);
      setErrorBody(
        "Capatcha does not match. Please enter the correct captcha."
      );
    }
    if (CaptchaMatched.captchaMatch) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      try {
        const response = await AdminSignupService(values);
        if (response.name) {
          navigate("/login");
        }
        if (!response.name) {
          setBackendError({ ...BackendError, errorFromBackend: true });
        }
      } catch (error) {
        setBackendError({ ...BackendError, errorFromBackend: true,backendErrorMessage:error });
      }
    }
  };

  //destructuring all values from useformik
  const { handleSubmit, handleBlur, touched, handleChange, values, errors } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  // when clicking login button user goes to login page
  const gotoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <Container
        h="auto"
        paddingBottom={"100px"}
        mt="60px"
        alignItems="center"
        w="100%"
        centerContent
      >
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
          h="auto"
          borderColor={["", "grey.300"]}
          borderRadius={10}
          boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
        >{BackendError.errorFromBackend && (
          <div className="errorlist">
            <ul>
              <p>
                Whoops! Something went wrong.      
              </p>
            </ul>
          </div>
        )}
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
              {touched.name && errors.name && (
                <div className="error-showing-popup">{errors.name}</div>
              )}
            </div>

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
              {touched.email && errors.email && (
                <div className="error-showing-popup">{errors.email}</div>
              )}
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
              {touched.password && errors.password && (
                <div className="error-showing-popup">{errors.password}</div>
              )}
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
              {touched.reEnterPassword && errors.reEnterPassword && (
                <div className="error-showing-popup">
                  {errors.reEnterPassword}
                </div>
              )}
            </div>

            <Box w="100%" mt="20px">
              <Captcha setCaptcha1={setCaptcha1} />
              <CommonModalComponent
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalBody={errorBody}
              />
            </Box>
            <Flex justifyContent="center">
              <button className="buttonlogin" onClick={gotoLogin}>
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
                fontSize="14px"
              >
                SIGN UP
              </Button>
            </Flex>
          </form>
        </Box>
      </Container>
    </div>
  );
}

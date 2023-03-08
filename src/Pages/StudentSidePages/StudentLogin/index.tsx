import * as yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/Authreducer/index";
import { Box, Image } from "@chakra-ui/react";
import { masaiimage } from "../../../assets/assets";
import { LoginService } from "../../../Services/AuthServices";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "formik";

//interface for form data
interface IFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}
interface IErrorDisplay {
  backendErrorMessage: any;
  errorFromBackend: boolean;
}

//valiadation schema for yup library
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .email("Invalid Email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const initialValues: IFormData = {
  username: "",
  password: "",
  rememberMe: false,
};

//student login component
export default function StudentLogin({ setGotoSignup }: any) {
  const [BackendError, setBackendError] = useState<IErrorDisplay>({
    backendErrorMessage: "",
    errorFromBackend: false,
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { IsAuthenticated } = bindActionCreators(actionCreators, dispatch);
  // function toggle go to sign up and login components
  const GotoSignup = () => {
    setGotoSignup(true);
  };

  //on submitting form it checks the validations using formik and use services here
  const onSubmit = async (values: IFormData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    try {
      const response = await LoginService(values);
      if (response.token) {
        if (response.user.roles[0].name === "STUDENT_USER") {
          IsAuthenticated({
            isAuth: true,
            username: response.user.name,
            userId: response.user.id,
            isAdmin: false,
          });
          navigate("/student/dashboard");
        }

        if (response.user.roles[0].name !== "STUDENT_USER") {
          IsAuthenticated({
            isAuth: true,
            username: response.user.name,
            userId: response.user.id,
            isAdmin: true,
          });
          navigate("/admin/dashboard");
        }
      }

      if (!response.token) {
        setBackendError({ ...BackendError, errorFromBackend: true });
      }
    } catch (error) {
      setBackendError({ ...BackendError, errorFromBackend: true,backendErrorMessage:error });
    }
  };
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
            boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
          >
            {BackendError.errorFromBackend && (
              <div className="errorlist">
                <ul>
                  <p>
                    Whoops! Something went wrong.
                    <li> {ErrorMessage.backendErrorMessage}</li>
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
                {touched.username && errors.username && (
                  <div className="error-showing-popup">{errors.username}</div>
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
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <div className="error-showing-popup">{errors.password}</div>
                )}
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

              <Flex
                mt="10px"
                justifyContent="space-between"
                flexWrap="wrap"
                justifyItems={"flex-end"}
              >
                <Box>
                  <Button
                    variant="link"
                    h="auto"
                    mt="20px"
                    _hover={{ color: "black" }}
                    fontSize={".850rem"}
                    textDecoration="underline"
                    color="rgb(75 85 99)"
                    ml="20px"
                    onClick={() => navigate("/forgot-password")}
                  >
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
                    onClick={GotoSignup}
                  >
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

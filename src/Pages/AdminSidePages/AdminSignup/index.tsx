import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import ReactCaptcha from "modern-react-captcha";
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
import { gifloader, masaiimage } from "../../../Assets/Assets";

import {
  AdminSignupService,
  IAdminAccountCreate,
} from "../../../Services/AuthServices";
import "./index.css";
import { useNavigate } from "react-router-dom";
interface IFormData {
  name: string;
  email: string;
  password: string;
  reEnterPassword: string;
  captchaMatched: boolean;
  isAuthenticated: boolean;
}

const validationSchema = yup.object().shape({
  name: yup.string().min(3, "name must be 3 character"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(8, "password must be 8 characters long")
    .matches(/[0-9]/, "password requires a number")
    .matches(/[A-Z]/, "password requires a uppercase letter")
    .matches(/[a-z]/, "password requires a lowercase letter")
    .matches(/[^\w]/, "password requires a symbol"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "must match password field value"),
});

const initialValues: IFormData = {
  name: "",
  email: "",
  password: "",
  reEnterPassword: "",
  captchaMatched: false,
  isAuthenticated: false,
};

const onSubmit = async (values: IFormData) => {
  console.log(values);
  AdminSignupService(values);
};

export default function AdminSignup() {
  const [signupState, setSignupState] = useState(initialValues);
  const navigate = useNavigate();
  const handleSuccess = () =>
    setSignupState({ ...signupState, captchaMatched: true });
  const handleFailure = () =>
    setSignupState({ ...signupState, captchaMatched: false });



  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const gotoLogin = () => {
    navigate("/admin/login");
  };
  return (
    <>
      <div className="container">
        <Container mt="60px" alignItems="center" w="100%" centerContent>
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
                  value={values.name}
                />
                {errors.name && <div className="error-showing-popup">{errors.name}</div>}
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
                  value={values.email}
                />
                {errors.email && <div className="error-showing-popup">{errors.email}</div>}
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
                {errors.password && <div className="error-showing-popup">{errors.password}</div>}
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
                  name="reenterpassword"
                  onChange={handleChange}
                  value={values.reEnterPassword}
                />
                {errors.reEnterPassword && <div className="error-showing-popup">{errors.reEnterPassword}</div>}
              </div>

              <Box w="200px" mt="20px">
                {/* <ReactCaptcha
                  charset="ulns"
                  length={6}
                  color="white"
                  bgColor="blue"
                  width="300px"
                  reloadIcon={gifloader}
                  handleSuccess={handleSuccess}
                  handleFailure={handleFailure}
                /> */}

                {signupState.captchaMatched ? (
                  <p className="cpathamatched">captcha matched</p>
                ) : (
                  <p>captcha not matched</p>
                )}
              </Box>
              <Flex justifyContent="flex-end">
                <button className="buttonlogin" onClick={gotoLogin}>
                  <Text fontSize="14px">
                    If Already Signup? please Log in here
                  </Text>
                </button>
                <button className="button" type="submit">
                  <Text fontSize="14px">SIGN UP</Text>
                </button>
              </Flex>
            </form>
          </Box>
        </Container>
      </div>
    </>
  );
}

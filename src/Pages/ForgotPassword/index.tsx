import React, { useState, useEffect } from "react";
import { masaiimage } from "../../Assets/Assets";
import { useFormik } from "formik";
import * as yup from "yup";

import { ForgotPasswordService } from "../../Services/AuthServices";
import {
    Flex,
    Box,
    Input,
    FormLabel,
    Image,
    Button,
    HStack,
    Text,
    Container,
} from "@chakra-ui/react";

interface IFormData {
    email: string;
}

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email address")
        .required("email is required"),
});

const initialValues: IFormData = {
    email: ""
};

const ForgetPassword = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [message, setMessage]= useState<string>("")
    const [message2, setMessage2]= useState<string>("")
    
    const onSubmit = async (values: IFormData) => {
        ForgotPasswordService(values)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    };
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    return (
        <>
            <div className="container">
                <Container w="100%" centerContent>
                    <Image
                        boxSize="120px"
                        mt="0px"
                        objectFit="contain"
                        src={masaiimage}
                        alt="Masai logo"
                    />
                    <Box
                        w={["full", "md"]}
                        p="20px"
                        mx="auto"
                        border={["none"]}
                        bg="white"
                        borderColor={["", "grey.300"]}
                        borderRadius={10}
                        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
                    >
                        <Text fontSize="16px" color="rgb(113, 120, 128)">
                            Forgot your password no problem just let us know your email
                            address and we will email password reset link. That will allow to
                            chooose new one.
                        </Text>
                        {message ? <Box color="#48BB78" >{message}</Box>:<Box></Box>}
                        {message2 ? <Box color="#E53E3E" >{message2}</Box>:<Box ></Box>}
                        <form onSubmit={handleSubmit}>
                            <div >
                                <FormLabel
                                    fontWeight="500"
                                    color="rgb(31,41,55)"
                                    fontSize="15px"
                                    mt={4}
                                >
                                    Email
                                </FormLabel>
                                <Input
                                    name="email"
                                    variant="outline"
                                    placeholder="Enter your email address"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                {errors.email && (
                                    <div className="error-showing-popup">{errors.email}</div>
                                )}
                            </div>
                            <Flex justifyContent="flex-end">
                                <HStack>
                                    <Button
                                        isLoading={isLoading}
                                        bg="rgb(31 41 55)"
                                        color="white"
                                        _hover={{ bg: "rgb(55 65 81)" }}
                                        h="40px"
                                        mt="20px"
                                        w="auto"
                                        rounded="10px"
                                        type="submit"
                                    >
                                        Email Password Reset Link
                                    </Button>
                                </HStack>
                            </Flex>
                        </form>
                    </Box>
                </Container>
            </div>
        </>
    );
};

export default ForgetPassword;

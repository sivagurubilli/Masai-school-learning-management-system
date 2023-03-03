import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import "./index.css";
import { setLocale } from "yup";
interface User {
  username: string[];
  captchaMatch: boolean;
}

//captcha function goes here
const Captcha = ({ setCaptcha1 }: any) => {
  const [user, setUser] = useState<User>({
    username: [],
    captchaMatch: false,
  });

  const characters =
    "K3+fMabcZ?#9123GTrsd@@@$28SOGtJio3#@88dDQWyepzxxsaAsS&&%%";

  //this function  is for generating random captcha
  const generateString = (length: number) => {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const mappedStr = result
      .split("")
      .map((char: any, index: number) => `${char}`);

    return mappedStr;
  };

  const [captcha, setCaptcha] = useState(generateString(6));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);

  //onsubmitting bttton it checks validate coreect captcha entered or not
  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (captcha === user.username) {
        setCaptcha1(true);
        setIsCaptchaVerified(true);
      } else {
        setCaptcha(generateString(6));
      }
      setIsLoading(false);
    }, 3000);
    return user.captchaMatch;
  };

  // when click on handle retry button this function again genearate recaptcha
  const handleRetry = () => {
    setCaptcha(generateString(6));
    setUser({ username: [], captchaMatch: false });
    setIsCaptchaVerified(false);
  };

  return (
    <div>
      <Container w="100%">
        {isCaptchaVerified ? (
          <Flex justifyContent="space-between" flexWrap="wrap">
            <Text mt="8" fontSize="xl" color="green.500">
              Captcha Verified
            </Text>
            <Button
              ml="20px"
              mt="8"
              bg="rgb(31 41 55)"
              minWidth="90px"
              h="35px"
              borderRadius="10px"
              color="white"
              _hover={{ bg: "rgb(55 65 81)" }}
              onClick={handleRetry}
            >
              Retry
            </Button>
          </Flex>
        ) : (
          <>
            <div>
              <Flex
                borderRadius="4PX"
                boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
                pl="10px"
                bg="#bfbfbf"
                maxW="50%"
                alignItems="center"
              >
                {captcha.map((el, index: number) => {
                  if (index % 2 == 0) {
                    return (
                      <Text
                        fontStyle="italic"
                        color="blue.600"
                        marginLeft="10px"
                        fontSize="15px"
                      >
                        {el}
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        fontStyle="italic"
                        color="green.700"
                        marginLeft="10px"
                        fontSize="25px"
                      >
                        {el}
                      </Text>
                    );
                  }
                })}
              </Flex>
            </div>
            <div className="form-group row"></div>

            <FormLabel
              fontSize=".875rem"
              fontWeight="500"
              color="rgb(55 65 81)"
              mt={4}
            >
              Enter Captcha
            </FormLabel>
            <Flex w="100%" justifyContent={"space-between"} flexWrap="wrap">
              <Input
                id="inputType"
                placeholder="Enter Captcha"
                name="username"
                onChange={handleChange}
                autoComplete="off"
                w="60%"
                mt="10px"
              />

              <Button
                isLoading={isLoading}
                bg="rgb(31 41 55)"
                color="white"
                _hover={{ bg: "rgb(55 65 81)" }}
                fontSize="14px"
                onClick={onSubmit}
                w="auto"
                ml="5px"
                mt="10px"
              >
                Verify Captcha
              </Button>
            </Flex>
          </>
        )}
      </Container>
    </div>
  );
};

export default Captcha;

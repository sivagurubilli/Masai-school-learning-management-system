import React, { useState } from "react";
import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useMediaQuery,
  Input,
 
} from "@chakra-ui/react";
import PinInput from 'react-pin-input';

import { EmailVerifycationService } from "../../Services/AuthServices";


const EmailVerificationModal = ({ isOpen, setIsOpen, email,modalBody,setModalBody }: any) => {
  const handleClose = () => setIsOpen(false);
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isInputShow,setInputShow] = useState<boolean>(false)
  const [pin, setPin] = useState("");
  

  const handleChange =(value:any)=>{
   setPin(value)
  }
  


  const EmailVerify =async()=>{
       try{
        if(isInputShow===true){
          const response = await EmailVerifycationService(pin)
          if(response){
            setModalBody("Email verified Successfully")
          }
        }else{
       const response = await EmailVerifycationService(email)
       if(response){
        setInputShow(true)
    }
      }
        
       }catch(error){
       setModalBody("Something went wrong please try again")
       }
  }


  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text p="30px">{modalBody}</Text>
           {isInputShow ? (
            <PinInput 
            length={4} 
            initialValue=""
            secret
            secretDelay={100} 
            onChange={(value, index) => {handleChange(value)}} 
            type="numeric" 
            inputMode="number"
            style={{padding: '10px'}}  
            inputStyle={{borderColor: 'red'}}
            inputFocusStyle={{borderColor: 'blue'}}
            onComplete={(value, index) => {}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
           ) : <Input value={email} />}
          </ModalBody>
          <ModalFooter>
            <Button
              h={isLargerThan900 ? "35px" : "30px"}
              fontSize={isLargerThan900 ? "14px" : "auto"}
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={EmailVerify}
            >
              Verify Email
            </Button>
            <Button
              h={isLargerThan900 ? "35px" : "30px"}
             fontSize= {isLargerThan900 ? "18px" : "14px"}
              color="white"
              bg="rgb(31 41 55)"
              ml="20px"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EmailVerificationModal;

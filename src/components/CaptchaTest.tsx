import React, { useEffect ,useState} from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import "../Pages/AdminSidePages/AdminLogin/index.css"
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
declare const ReactSimpleCaptcha: any;


interface Icaptchavalue{
  captchaValue:string
  captchaError:boolean
}

const CaptchaTest =()=>{

    const[captchaState,setCaptchaState] = useState<Icaptchavalue>({
        captchaValue:"",
        captchaError:false
    })
    useEffect(()=>{
        loadCaptchaEnginge(8);
    },[])
    
  


   const handleChange= (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaptchaState({
        ...captchaState,
        captchaValue:value
    })
   
    }
        
    const doSubmit= (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      
    if(validateCaptcha(captchaState.captchaValue) ===true){
        loadCaptchaEnginge(6);
        setCaptchaState({
            ...captchaState,
            captchaError:false
        })
    }else{
        setCaptchaState({
            ...captchaState,
            captchaError:true
        })
    }
     return captchaState.captchaError
}


 
    return (
      <Box style={{display:"flex",flexDirection:"row"}}>
        <FormControl>
          <LoadCanvasTemplate />
          <FormLabel htmlFor="user_captcha_input">Enter Captcha</FormLabel>
          <Input
            id="user_captcha_input"
            width={"140px"}
            name="user_captcha_input"
            type="text"
            value={captchaState.captchaValue}
            placeholder="Enter Captcha"
            onChange={handleChange}
          />
          <Button colorScheme="blue" mt={4} onSubmit={doSubmit}>
            Submit
          </Button>
          {captchaState.captchaError && (
              <div className="email-error-showing-popup">
                {"Please enter valid email adddress"}
              </div>
            )}
        </FormControl>
      </Box>
    )
    }

export default CaptchaTest

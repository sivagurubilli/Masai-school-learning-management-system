
import axios, { AxiosResponse } from "axios";
import bcrypt from "bcryptjs";
import { IAuthlogin,IAdminAccountCreate,IAuthloginResponse,IAuthsignupResponse,IForgotPassword,
IStudentAccountCreate } from "./AuthInterface";

export async function LoginService(
  data: IAuthlogin
): Promise<IAuthloginResponse> {
  const { username, password,rememberMe } = data;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const response = await axios.post("/api/login", {

     "username": username,
      "password": password,
    });
    //setting for remember me in
   if (rememberMe && response.data.token) {
    localStorage.setItem("username", username);
    localStorage.setItem("userType",response.data.user.roles[0].name);
    localStorage.setItem("token", response.data.token);
  }
  if (rememberMe && response.data.token) {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("userType",response.data.user.roles[0].name)
    sessionStorage.setItem("token", response.data.token);
  
  }

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
}

export async function StudentSignupService(
  data: IStudentAccountCreate
): Promise<IAuthsignupResponse> {

  const { email, name, password,sectionId,batchId } = data;
  console.log(sectionId,batchId)
  try {
    const response = await axios.post(
      `/api/signup/student/${batchId}/${sectionId}`,
      { name, email ,password }
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;

  }
}

export async function AdminSignupService(
  data: IAdminAccountCreate
): Promise<IAuthsignupResponse> {

  const { email, name, password } = data;
  try {
    const response = await axios.post(
      "/api/signup/admin",
      { name, email, password }
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    return error.error;
  }
}

export async function ForgotPasswordService(
  data: IForgotPassword
): Promise<any> {
  const { email } = data;
  console.log(email)
  try {
    const response = await axios.post(
      "http://3.27.61.194:8082/api/forgot-password",
     {
       "email":email
     }
   );
   return response.data
  } catch (error) {
     return "Something Went Wrong"
  }
}

export interface IReset {
  password: string;
  confirmPassword: string;
  token: string;
}
export async function ResetService(data: IReset): Promise<any> {
     const {password, confirmPassword,token}=data 
  try {
    const response = await axios.post<IReset>(
      `http://3.27.61.194:8082/api/reset-password/${token}`,
      {
        "password":password,
        "confirmPassword":confirmPassword
      }
    );
     return response.data;
   
  } catch (error) {
    return "Something Went Wrong"
  }
}
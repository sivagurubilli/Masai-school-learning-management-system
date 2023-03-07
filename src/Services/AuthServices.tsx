
import axios from "axios";
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
   
 if(response.data.token){
    //setting for remember me in
   if (rememberMe ) {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("userType",response.data.user.roles[0].name);
    localStorage.setItem("token", response.data.token);
  }
  if (!rememberMe) {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("userId", response.data.user.id);
    sessionStorage.setItem("userType",response.data.user.roles[0].name)
    sessionStorage.setItem("token", response.data.token);
  }
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
      "/forgot-password",
     {
       "email":email
     }
   );
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

  try {
    const response = await axios.post<IReset>(
      "/reset-password/",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return "Something Went Wrong"
  }
}
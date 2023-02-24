
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
    const response = await axios.post("https://7cbf-202-142-114-239.in.ngrok.io/api/login", {

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
      `https://7cbf-202-142-114-239.in.ngrok.io/api/signup/student/${batchId}/${sectionId}`,
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
      "https://7cbf-202-142-114-239.in.ngrok.io/api/signup/admin",
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
  const response = await axios.post(
     "https://75f5-202-142-70-11.in.ngrok.io/forgot-password",
    {
      email,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return "We have Mailed You  Password Reset Link";
}

export interface IReset {
  password: string;
  confirmPassword: string;
}
export async function ResetService(data: IReset): Promise<any> {
  const response = await axios.post<IReset>(
    "https://75f5-202-142-70-11.in.ngrok.io/reset-password/",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return "Something went wrong";
}

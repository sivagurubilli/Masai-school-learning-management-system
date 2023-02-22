
import axios, { AxiosResponse } from "axios";
import bcrypt from "bcryptjs";
export interface IAuthlogin {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface IAuthloginResponse {
  token: string;
  error: string;
  status: number;
  user: {
    id: number;
    name: string;
    email: string;
    roles: [
      {

        id: number;
        name: string;
      }
    ];
  };
}

export interface IAuthsignupResponse {
  id: number;
  name: string;
  email: string;
  roles: [
    {
      id: number;
      name: string;
    }
  ];

  }

export interface IAuthsignupResponse {
  id: number,
  name: string,
  email: string,
  roles: [
    {
      id: number,
      name: string
    }
  ]

}
export interface IStudentAccountCreate {
  name: string;
  batch: string;
  section: string;
  email: string;
  password: string;
}
export interface IAdminAccountCreate {
  name: string;
  email: string;
  password: string;
}
export interface IBatchResponse {
  IbatchArray: IbatchObject[];
}
export interface IbatchObject {
  id: number;
  batch_name: string;
  student: string[];
}
export interface ISectionResponse {
  IsectionArray: ISectionObject[];
}
export interface ISectionObject {
  id: number;
  batch_name: string;
  student: string[];
}

export async function LoginService(
  data: IAuthlogin
): Promise<IAuthloginResponse> {
  const { username, password } = data;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const response = await axios.post("https://reqres.in/api/login", {

      email: username,
      password: password,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
}

export async function StudentSignupService(
  data: IAdminAccountCreate
): Promise<IAuthsignupResponse> {

  const { email, name, password } = data;
  try {
    const response = await axios.post(
      "https://a354-202-142-114-239.in.ngrok.io/api/signup",
      { name: name, email: email, password: password }
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
      "https://a354-202-142-114-239.in.ngrok.io/api/signup",
      { name: name, email: email, password: password }
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    return error.error;
  }
}

export async function getBatchArrray() {
  try {
    const response: AxiosResponse<IBatchResponse[]> = await axios.get(
      "https://f6fd-202-142-70-11.in.ngrok.io/batch"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getSectionArray() {
  try {
    const response: AxiosResponse<IBatchResponse[]> = await axios.get(
      "https://f6fd-202-142-70-11.in.ngrok.io/section"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export interface IBatchResponse {
  IbatchArray: IbatchObject[]
}

export interface IbatchObject {
  id: number;
  batch_name: string;
  student: string[];
}

export interface ISectionResponse {
  IsectionArray: ISectionObject[]
}

export interface ISectionObject {
  id: number;
  batch_name: string;
  student: string[];
}


export interface IForgotPassword {
  email: string;
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


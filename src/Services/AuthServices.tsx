import axios,{ AxiosResponse } from "axios";
import bcrypt from "bcryptjs";

export interface IAuthlogin {
  username: string;
  password: string;
  rememberMe: boolean;
  
}

export interface IAuthloginResponse{
  token:string;
  error:string;
  status:number;
  user: {
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
}
export interface IStudentAccountCreate {
  name: string;
  batch: string;
  section: string;
  email: string;
  password: string;
  error:string;
  status:number
}

export interface IAdminAccountCreate {
  name: string;
  email: string;
  password: string;
}

export async function LoginService(data: IAuthlogin): Promise<IAuthloginResponse> {
  const { username, password } = data;
 
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
try{
  const response = await axios.post("https://fe65-202-142-114-239.in.ngrok.io/api/login", {
    "username":username,
    "password":password
  });

  console.log(response)
  return response.data;
}catch(error:any){
  console.log(error)
  return error
}
}

export async function StudentSignupService(
  data: IStudentAccountCreate
): Promise<IStudentAccountCreate> {
 console.log(data)
  const response = await axios.post<IStudentAccountCreate>(
    "/api/student/signup",
    { studentaccountDetails: data }
  );
  return response.data;
}

export async function AdminSignupService(
  data: IAdminAccountCreate
): Promise<IAdminAccountCreate> {
  console.log(data)
  const response = await axios.post<IAdminAccountCreate>("/api/admin/signup", {
    studentaccountDetails: data,
  });
  return response.data
}



export interface IBatchResponse {
  IbatchArray:IbatchObject[]
}

export interface IbatchObject{
  id: number;
  batch_name: string;
  student:string[];
}


export async function getBatchArrray() {
try{
    const response: AxiosResponse<IBatchResponse[]> = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data
}catch(error:any){
  return error
}
}


export interface ISectionResponse {
  IsectionArray:ISectionObject[]
}

export interface ISectionObject{
  id: number;
  batch_name: string;
  student:string[];
}


export async function getSectionArray() {
try{
    const response: AxiosResponse<IBatchResponse[]> = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data
}catch(error:any){
  return error
}
}
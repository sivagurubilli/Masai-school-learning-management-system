import axios from 'axios';
import bcrypt from "bcryptjs";


export interface IAuthAdminlogin {
  email: string;
  password: string;
  
}

export interface IAuthStudentlogin {
    email: string;
    password: string;
  }

  export interface IStudentAccountCreate{
    name: string;
    batch:string;
    section:string;
    email: string;
    password:string;
   
  }

  export interface IAdminAccountCreate {
    name:string;
   email:string;
   password:string;
 
  }



export async function AdminLoginService(data:IAuthAdminlogin): Promise<IAuthAdminlogin> {
    const {email,password} = data
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
   
  const response = await axios.post<IAuthAdminlogin>('/api/admin/login', {email,hashedPassword });
  return response.data;
}

export async function StudentLoginService(data:IAuthStudentlogin): Promise<IAuthStudentlogin> {
    const {email,password} = data
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
  const response = await axios.post<IAuthStudentlogin>('/api/login', { email,hashedPassword});
  return response.data;
}



export async function StudentSignupService(data:IStudentAccountCreate): Promise<IStudentAccountCreate> {
   
    const response = await axios.post<IStudentAccountCreate>('/api/student/signup', { studentaccountDetails: data });
    return response.data;
  }

  export async function AdminSignupService(data:IAdminAccountCreate): Promise<IAdminAccountCreate> {
    console.log(data,"sicva")
    const response = await axios.post<IAdminAccountCreate>('/api/admin/signup', { studentaccountDetails: data });
    return response.data;
  }
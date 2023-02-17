import axios from 'axios';

export interface IAuthAdminlogin {
  email: string;
  password: string;
  
}

export interface IAuthStudentlogin {
    name: string;
    email: string;
  }

  export interface IStudentAccountCreate{
    name: string;
    batch:string;
    section:string;
    email: string;
    password:string;
    reEnteredPassword:string;
  }

  export interface IAdminAccountCreate {
    name:string;
   email:string;
   password:string;
   reEnteredPassword:string;
  }



export async function AdminLoginService(data:IAuthAdminlogin): Promise<IAuthAdminlogin> {
  const response = await axios.post<IAuthAdminlogin>('/api/admin/login', { adminLoginDetails: data });
  return response.data;
}

export async function StudentLoginService(data:IAuthStudentlogin): Promise<IAuthStudentlogin> {
  const response = await axios.post<IAuthStudentlogin>('/api/student/login', { studentLoginDetails: data });
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
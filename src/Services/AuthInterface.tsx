
  export interface IForgotPassword {
    email: string;
  }

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
      roles: Array<IRoles>
    };
  }
  
  
  interface IRoles{
    id:number,
    name:string
    }
  export interface IAuthsignupResponse {
    id: number,
    name: string,
    email: string,
    roles:Array<IRoles>
  }
  export interface IStudentAccountCreate {
    name: string;
    batchId: number;
    sectionId: number;
    email: string;
    password: string;
  }
  export interface IAdminAccountCreate {
    name: string;
    email: string;
    password: string;
   
  }

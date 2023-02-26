
export interface ISectionObject {
    section_id:number
      section_name: string;
  }

  //interface for secction
export interface ISectionResponse {
    IsectionArray: ISectionObject[]
  }
  
  export interface IBatchObject {
 batch_id:number
   batch_name: string;
  }

  export interface IBatchResponse {
    IbatchArray: IBatchObject[]
  }
  
  export interface ITypeObject {
    id:number
 typeName:string
    lectures: string; 
  }
  export interface ITypeResponse {
    ItypeArray: ITypeObject[]
  }

  //inttterface for user
  export interface IUserResponse {
    ItypeArray: ITypeObject[]
  }
  
  export interface IUserObject {
    id:number
 typeName:string
    lectures: string;   
  }


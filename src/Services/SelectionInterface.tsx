
export interface ISectionObject {
    sectionId:number
      section: string;
  }
  export interface ICategoryObject {
  id:number
      category: string;
  }

  //interface for secction
export interface ISectionResponse {
    IsectionArray: ISectionObject[]
  }
  
  export interface IBatchObject {
 batchId:number
   batch: string;
  }

  export interface IBatchResponse {
    IbatchArray: IBatchObject[]
  }
  
  export interface ITypeObject {
    id:number
 type:string
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
 user:string
    lectures: string;   
  }


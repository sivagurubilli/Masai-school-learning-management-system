
export interface ISectionObject {
    sectionId:number
      sectionName: string;
  }
  export interface ICategoryObject {
  id:number
      categoryName: string;
  }

  //interface for secction
export interface ISectionResponse {
    IsectionArray: ISectionObject[]
  }
  
  export interface IBatchObject {
 batchId:number
   batchName: string;
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
 userName:string
    lectures: string;   
  }


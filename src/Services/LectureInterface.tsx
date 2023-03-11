
//interface for searching values
export interface ISearchValues {  
       title:string,
       createdBy:string,
       type:string;
       batch:string;
       section:string;
       day: string;
       week:string;
       startTime:string | Date;
      
}

export interface ISearchValues2 {  
  title:string,
  createdBy:string,
  type:string;
  batch:string;
  section:string;
  day:string;
  week:string;
  startTime:string;
  category:string
 
}
export interface ITags{
tag:string
}
//iinteface for lecture response
export interface ILectureResponse{

    lectureId:number
    title: string;
    batch: string ;
    category:string ,
    section: string,
    type: string ,
    schedule:Date,
    concludes:Date,
    createdBy: string ,
    tags:string[],
    hideVideo:boolean,
    optional:boolean,
    zoomLink:string,
    week: string,
    day: string,
    notes:string
}

export interface ILectureResponse1{
    content: ILectureResponse[] | undefined;
    lastPage:boolean
    pageNumber:number
    pageSize:number|string
    
    totalElements:number|string
    totalPages: number| string
}

export interface ITags{
    tag:string
}
// interface for creating lecture values
export interface ICreateLectureValues {
    title: string;
    batch: string;
    category:string,
    section: string ,
    type: string,
    schedule:Date,
    concludes:Date,
    createdBy: string,
    tags:string[],
    hideVideo:boolean,
    optional:boolean,
    zoomLink:string,
    week: string,
    day: string,
    notes:string
  }
  
  export interface ISearchValues2 {  
    title:string,
    createdBy:string,
    type:string;
    batch:string;
    section:string;
    day:string;
    week:string;
    startTime:string;
    category:string
   
  }
  export interface ISingledata{
    id:number | undefined;
  }

  export interface IAddBookMarkObject{
   lectureId:string | number;
   userId: string| number;
    
  }

//interface for searching values
export interface ISearchValues {  
       title:string,
       createdBy:string,
       type:string;
       batch:string;
       section:string;
       day:string;
       week:string;
       startTime:string;
      
}
export interface ITags{
tag:string
}
//iinteface for lecture response
export interface ILectureResponse{
    lectureid:number
    title: string;
    batch: string;
    category:string,
    section: string,
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
export interface ISearchResponse{
    LecturesData: ILectureResponse[] | undefined;
}

export interface ITags{
    tag:string
}
// interface for creating lecture values
export interface ICreateLectureValues {
    title: string;
    batch: string;
    category:string,
    section: string,
    type: string,
    schedule:Date,
    concludes:Date,
    createdBy: string,
    tags:string[] | null,
    hideVideo:boolean,
    optional:boolean,
    zoomLink:string,
    week: string,
    day: string,
    notes:string
  }
  
  export interface ISingledata{
    id:number | undefined;
  }

  export interface IBookMarkObject{
    id:number,
    tilte:string,
    date:string
  }
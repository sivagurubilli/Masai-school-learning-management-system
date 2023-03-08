
//interface for searching values
export interface ISearchValues {  
       title:string,
       user:string,
       type:string;
       batch:string;
       section:string;
       day:string;
       week:string;
      
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
    tags:ITags[],
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
    user: string,
    tags:ITags[],
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
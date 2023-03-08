import axios from "axios";
import { IBookMarkObject, ICreateLectureValues, ILectureResponse,  ISearchValues, ISingledata } from "./LectureInterface";

//interface for creating lectures and editing lectures

export interface ILecturePostResponse {
message:string
}
// Lecture Post service
export async function LecturePostService(
  data: ICreateLectureValues
): Promise<ILecturePostResponse> {
  const { title, batch, section, type, user,  category,
  schedule,
  concludes,
  tags,
  hideVideo,
  optional,
  zoomLink,
  notes, week } = data;
  try {
    const response = await axios.post("/api/lecture/addLecture", {
      title,
      batch,
      section,
      type,
      user,
      category,
      schedule,
      concludes,
      tags,
      hideVideo,
      zoomLink,
      notes,
      week,
    });

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

// lectures edit service functio
export async function LectureEditService(
  data: ICreateLectureValues,
  id: string | undefined
): Promise<ILecturePostResponse> {
  const { title, batch, section, type, user,  category,
    schedule,
    concludes,
    tags,
    hideVideo,
    zoomLink,
    notes, week } = data;

  try {
    const response = await axios.patch(
      `/api/lecture/updateLecture/${id}`,
      {
        title, batch, section, type, user,  category,
    schedule,
    concludes,
    tags,
    hideVideo,
    zoomLink,
    notes, week 
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

// lectures searching service
export async function LectureSearchService(
  data: ISearchValues,
): Promise<ILectureResponse[]> {
  const { title, batch, section, type, user,day, week } = data;
  try {
    const response = await axios.post(
      "/api/lecture/lectures/search",
      {title, batch, section, type, user,day, week}
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

// for getting all lectures when user enters to the lectures page
export async function GetAllLectureService(
): Promise<ILectureResponse[]> {
 
  try {
    const response = await axios.get(
        "http://3.27.61.194:8082/api/lecture/lectureList"
    );

    return response.data;
  } catch (error: any) {
    console.log(error)
    return error.response;
  }
}


// getting single lecture details service
export async function LectureSingleService(
id :any
): Promise<ILectureResponse> {
  try {
    const response = await axios.get(
    `http://3.27.61.194:8082/api/lecture/lectures/${id}`
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

// deleting for Lecture Service
export async function LectureDeleteService(
  id: string| undefined
 
): Promise<ILecturePostResponse> {
  try {
    const response = await axios.delete(
      `/api/lecture/lectures/${id}`,
    );

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

// lectures copy service function
export async function LectureCopyService(
  data: ICreateLectureValues,
  id: string | undefined
): Promise<ILecturePostResponse> {
  const { title, batch, section, type, user,  category,
    schedule,
    concludes,
    tags,
    hideVideo,
    zoomLink,
    notes, week } = data;

  try {
    const response = await axios.post(
      `/api/lecture/copyLecture/`,
      {
        title, batch, section, type, user,  category,
    schedule,
    concludes,
    tags,
    hideVideo,
    zoomLink,
    notes, week 
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}


// for getting all bookmarks
export async function GetAllBookMarksService(
  ): Promise<IBookMarkObject[]> {  
    try {
      const response = await axios.get(
        "/api/bookmarks/getList",  
      );
        return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
  
//add bookmark service
  export async function AddBookMarksService(
    {id}:any
    ): Promise<IBookMarkObject[]> {
     
      try {
        const response = await axios.post(
          "/api/bookmark/getList",  
          {
            "userId": "105",
            "lectureid": "205"
        }
        
        );
          return response.data;
      } catch (error: any) {
        return error.response;
      }
    }

    export async function SingleBookMarksService(
      {id}:any
      ): Promise<IBookMarkObject[]> {
       
        try {
          const response = await axios.get(
            `/api/bookmarks/getList/${id}` 
          );
            return response.data;
        } catch (error: any) {
          return error.response;
        }
      }
    
//Remove BookMarks service
    export async function RemoveBookMarksService(
      {id}:any
      ): Promise<IBookMarkObject[]> {
       
        try {
          const response = await axios.delete(
            `/api/bookmark/${id}`,
          );
            return response.data;
        } catch (error: any) {
          return error.response;
        }
      }

      //get all dashboard  services
  export async function GetDashboardLecturesService(
    ): Promise<ILectureResponse[]> {  
      try {
        const response = await axios.get(
          "/api/dashboard",  
        );
          return response.data;
      } catch (error: any) {
        return error.response;
      }
    }

         //add bookmark service
  export async function SingleDashboardLecturesService(
    {id}:any
    ): Promise<IBookMarkObject[]> {  
      try {
        const response = await axios.get(
          `/api/dashboard/${id}`,  
        );
          return response.data;
      } catch (error: any) {
        return error.response;
      }
    }


    // for getting all lectures when user enters to the lectures page
export async function GettAllStudentLectureService(
  ): Promise<ILectureResponse[]> {
   
    try {
      const response = await axios.get(
          "http://3.27.61.194:8082/api/lecture/lectureList/student/2/2"
      );
  
      return response.data;
    } catch (error: any) {
      console.log(error)
      return error.response;
    }
  }
    
    

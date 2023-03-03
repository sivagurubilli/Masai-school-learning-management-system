import axios from "axios";
import { IBookMarkObject, ICreateLectureValues, ILectureResponse, ISearchResponse,  ISearchValues, ISingledata } from "./LectureInterface";

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
      "/api/lecture/lectures/lectureList",  
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
      `/api/lecture/lectures/${id}`,
      {
        headers: {
        "ngrok-skip-browser-warning": "1",
      },
    }
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
        "/api/bookmark/getList",  
      );
        return response.data;
    } catch (error: any) {
      console.log(error)
      return error.response;
    }
  }
  
//add bookmark service
  export async function AddBookMarksService(
    {id}:any
    ): Promise<IBookMarkObject[]> {
     
      try {
        const response = await axios.get(
          "/api/bookmark/getList",  
        );
          return response.data;
      } catch (error: any) {
        console.log(error)
        return error.response;
      }
    }
    
//Remove BookMarks service
    export async function RemoveBookMarksService(
      {id}:any
      ): Promise<IBookMarkObject[]> {
       
        try {
          const response = await axios.get(
            "/api/bookmark/getList",
          );
            return response.data;
        } catch (error: any) {
          console.log(error)
          return error.response;
        }
      }
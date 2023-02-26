import axios from "axios";
import { ICreateLectureValues, ILectureResponse, ISearchResponse,  ISearchValues, ISingledata } from "./LectureInterface";

//interface for creating lectures and editing lectures

export interface ILecturePostResponse {

}
// Lecture Post service
export async function LecturePostService(
  data: ICreateLectureValues
): Promise<ILecturePostResponse> {
  const { title, batch, section, type, user,  categoery,
  schedule,
  conclude,
  tags,
  hideVideo,
  optional,
  zoomLink,
  notes, week } = data;
  try {
    const response = await axios.post("https://505a-202-142-81-191.in.ngrok.io/api/lecture/addLecture", {
      title,
      batch,
      section,
      type,
      user,
      categoery,
      schedule,
      conclude,
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

// lectures edit service function
export async function LectureEditService(
  data: ICreateLectureValues,
  id: string | undefined
): Promise<ILecturePostResponse> {
  const { title, batch, section, type, user,  categoery,
    schedule,
    conclude,
    tags,
    hideVideo,
    zoomLink,
    notes, week } = data;

  try {
    const response = await axios.patch(
      `https://505a-202-142-81-191.in.ngrok.io/api/lecture/updateLecture/${id}`,
      {
        title, batch, section, type, user,  categoery,
    schedule,
    conclude,
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
      "https://505a-202-142-81-191.in.ngrok.io/api/lecture/lectures/search",
      {
        title , batch, section, type, user,day, week
      }
    );
console.log(response.data)
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
      `https://505a-202-142-81-191.in.ngrok.io/api/lecture/lectures/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}


export async function LectureDeleteService(
  id:number
 
): Promise<ILecturePostResponse> {
  try {
    const response = await axios.delete(
      `https://505a-202-142-81-191.in.ngrok.io/api/lecture/lectures/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

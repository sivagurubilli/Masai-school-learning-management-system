import axios from "axios";

//interface for creating lectures and editing lectures
export interface ICreateLectureValues {
  title: string;
  batch: string;
  categoery:string,
  section: string,
  type: string,
  schedule:string,
  conclude:string,
  user: string,
  tags:string,
  hideVideo:boolean,
  zoomLink:string,
  week: string,
  day: string,
  notes:string
}

export interface ILecturePostResponse {}
// Lecture Post service
export async function LecturePostService(
  data: ICreateLectureValues
): Promise<ILecturePostResponse> {
  const { title, batch, section, type, user,  categoery,
  schedule,
  conclude,
  tags,
  hideVideo,
  zoomLink,
  notes, week } = data;
  try {
    const response = await axios.post("https://reqres.in/api/create/lecture", {
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

// lecture service function
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
      `https://reqres.in/api/create/lecture/${id}`,
      {
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
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}
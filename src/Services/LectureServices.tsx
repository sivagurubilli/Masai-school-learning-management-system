import axios from "axios";

//interface for creating lectures and editing lectures
export interface ICreateLectureValues {
  title: string;
  batch: string;
  section: string;
  type: string;
  user: string;
  date: string;
  week: string;
  day: string;
}

export interface ILecturePostResponse {}
// Lecture Post service
export async function LecturePostService(
  data: ICreateLectureValues
): Promise<ILecturePostResponse> {
  const { title, batch, section, type, user, date, week, day } = data;
  try {
    const response = await axios.post("https://reqres.in/api/create/lecture", {
      title: title,
      batch: batch,
      section: section,
      type: type,
      user: user,
      date: date,
      week: week,
      " day": day,
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
  const { title, batch, section, type, user, date, week, day } = data;

  try {
    const response = await axios.patch(
      `https://reqres.in/api/create/lecture/${id}`,
      {
        title: title,
        batch: batch,
        section: section,
        type: type,
        user: user,
        date: date,
        week: week,
        " day": day,
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

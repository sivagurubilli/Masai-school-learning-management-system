import axios, { AxiosResponse } from "axios";
import {
  IBatchObject,
  IBatchResponse,
  ISectionResponse,
  ISectionObject,
  ITypeResponse,
  IUserResponse,
  ITypeObject,
  IUserObject,
} from "./SelectionInterface";

export async function getBatchArrray(): Promise<IBatchObject[]>{
  try {
    const response = await axios.get(
      "https://17df-202-142-81-172.in.ngrok.io/api/batchList",
      {
        headers: {
        "ngrok-skip-browser-warning": "1",
      },}
    );
   console.log(response)

    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getSectionArray() {
  try {
    const response= await axios.get(
      "/api/sectionList"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getTypeArray() {
  try {
    const response = await axios.get(
      "lectureType/getLectureTypeList"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getUserArray() {
  try {
    const response = await axios.get(
      "/user"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

import axios, { AxiosResponse } from "axios";
import {
  IBatchObject,
  IBatchResponse,
  ISectionResponse,
  ISectionObject,
  ITypeResponse,
  IUserResponse,
} from "./SelectionInterface";

export async function getBatchArrray() {
  try {
    const response: AxiosResponse<IBatchResponse[]> = await axios.get(
      "https://505a-202-142-81-191.in.ngrok.io/batchList"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getSectionArray() {
  try {
    const response: AxiosResponse<ISectionResponse[]> = await axios.get(
      "https://505a-202-142-81-191.in.ngrok.io/sectionList"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getTypeArray() {
  try {
    const response: AxiosResponse<ITypeResponse[]> = await axios.get(
      "https://505a-202-142-81-191.in.ngrok.io/type"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getUserArray() {
  try {
    const response: AxiosResponse<IUserResponse[]> = await axios.get(
      "https://505a-202-142-81-191.in.ngrok.io/user"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

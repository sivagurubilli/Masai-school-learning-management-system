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
      "https://f6fd-202-142-70-11.in.ngrok.io/batch"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getSectionArray() {
  try {
    const response: AxiosResponse<ISectionResponse[]> = await axios.get(
      "https://f6fd-202-142-70-11.in.ngrok.io/section"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getTypeArray() {
  try {
    const response: AxiosResponse<ITypeResponse[]> = await axios.get(
      "https://f6fd-202-142-70-11.in.ngrok.io/section"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getUserArray() {
  try {
    const response: AxiosResponse<IUserResponse[]> = await axios.get(
      "https://f6fd-202-142-70-11.in.ngrok.io/section"
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}

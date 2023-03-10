import axios from "axios";
import {
  IBatchObject,
  ICategoryObject,
  ISectionObject,
  ITypeObject,
  IUserObject,
  ICategorySectionObject,
} from "./SelectionInterface";

export async function getBatchArrray(): Promise<IBatchObject[]> {
  try {
    const response = await axios.get("/api/batchList");
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getSectionArray(): Promise<ISectionObject[]> {
  try {
    const response = await axios.get("/api/sectionList");
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getTypeArray(): Promise<ITypeObject[]> {
  try {
    const response = await axios.get("api/typeList");
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getUserArray(): Promise<IUserObject[]> {
  try {
    const response = await axios.get("/api/userList");
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getCategoryArrray(): Promise<ICategoryObject[]> {
  try {
    const response = await axios.get("/api/categoryList");

    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function getCategorySectionArrray(): Promise<
  ICategorySectionObject[]
> {
  try {
    const response = await axios.get(
      "http://3.27.61.194:8082/api/categoryList"
    );
    console.log("category", response.data);
    return response.data;
  } catch (error: any) {
    return error;
  }
}

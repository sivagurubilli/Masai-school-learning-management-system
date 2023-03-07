import React, { useEffect } from "react";
import {
  getBatchArrray,
  getSectionArray,
  getUserArray,
  getTypeArray,
  getCategoryArrray,
} from "../../../Services/SelelctionService";

const GetSelectTags = ({
  setBatchArray,
  setSectionArray,
  setCategoryArray,
  setUserArray,
  setTypeArray,
}: any) => {
  
  useEffect(() => {
    gettingBatchArrray();
    gettingSectionArray();
    gettingTypeArray();
    gettingUserArray();
    gettingCategoryArrray();
  }, []);

  const gettingBatchArrray = async () => {
    try {
      const response = await getBatchArrray();
      if (response.length) {
        setBatchArray(response);
      }
    } catch (error) {}
  };

  const gettingCategoryArrray = async () => {
    try {
      const response = await getCategoryArrray();
      if (response.length) {
        setCategoryArray(response);
      }
    } catch (error) {}
  };
  const gettingSectionArray = async () => {
    try {
      const response = await getSectionArray();
      if (response.length) {
        setSectionArray(response);
      }
    } catch (error) {}
  };
  const gettingTypeArray = async () => {
    try {
      const response = await getTypeArray();
      if (response.length) {
        setTypeArray(response);
      }
    } catch (error) {}
  };
  const gettingUserArray = async () => {
    try {
      const response = await getUserArray();
      if (response.length) {
        setUserArray(response);
      }
    } catch (error) {}
  };
  return <div></div>;
};

export default GetSelectTags;

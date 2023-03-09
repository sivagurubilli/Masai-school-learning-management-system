import { Dispatch } from "redux"
import { Action } from "./action"
import { ActionTypes } from "./actionTypes"


export  const GetAllData = (payload:any)=>{
  return (dispatch :Dispatch<Action>)=>{
     dispatch({
      type:ActionTypes.GET_SINGLE_DATA_SUCCESS,
      payload:payload
     })
  }
}
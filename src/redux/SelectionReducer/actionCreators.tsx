import { Dispatch } from "redux"
import { BatchAction, CategoeryAction, SectionAction, TypeAction, UserAction } from "./action"
import { ActionTypes } from "./actionTypes"


export  const GetBatchData = (payload:any)=>{
  return (dispatch :Dispatch<BatchAction>)=>{
     dispatch({
      type:ActionTypes.GET_BATCH_SUCCESS,
      payload:payload
     })
  }
}
export  const GetSectionData = (payload:any)=>{
  return (dispatch :Dispatch<SectionAction>)=>{
     dispatch({
      type:ActionTypes.GET_SECTION_SUCCESS,
      payload:payload
     })
  }
}

export  const GetUserData = (payload:any)=>{
  return (dispatch :Dispatch<UserAction>)=>{
     dispatch({
      type:ActionTypes.GET_USER_SUCCESS,
      payload:payload
     })
  }
}
export  const GetTypeData = (payload:any)=>{
  return (dispatch :Dispatch<TypeAction>)=>{
     dispatch({
      type:ActionTypes.GET_TYPE_SUCCESS,
      payload:payload
     })
  }
}

export  const GetCategoeryData = (payload:any)=>{
  return (dispatch :Dispatch<CategoeryAction>)=>{
     dispatch({
      type:ActionTypes.GET_CATEGEORY_SUCCESS,
      payload:payload
     })
  }
}
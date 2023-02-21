import { Dispatch } from "redux"
import { Action } from "./action"
import { ActionTypes } from "./actionTypes"
import { Iisauthstate } from "./reducer"

export  const Isauthenticated = (payload:Iisauthstate)=>{
  return (dispatch :Dispatch<Action>)=>{
     dispatch({
      type:ActionTypes.LOGIN_SUCCESS,
      payload:payload
     })
  }
}
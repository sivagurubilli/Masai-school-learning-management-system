import { Dispatch } from "redux"
import { Action } from "./action"
import { ActionTypes } from "./actionTypes"
import { IisAuthstate } from "./reducer"

export  const IsAuthenticated = (payload:IisAuthstate)=>{
  return (dispatch :Dispatch<Action>)=>{
     dispatch({
      type:ActionTypes.LOGIN_SUCCESS,
      payload:payload
     })
  }
}
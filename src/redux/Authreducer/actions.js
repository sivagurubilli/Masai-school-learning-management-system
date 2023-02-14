import * as types from "./actionTypes"
import axios from "axios"

export const login =(payload  )=>(dispatch)=>{
  dispatch({type:types.LOGIN_REQ});
  return axios.post("/login",payload).then(r=>dispatch({type:types.LOGIN_SUCC,payload:r.data.token})).catch(e=>
    dispatch({type:types.LOGIN_ERR}))
}
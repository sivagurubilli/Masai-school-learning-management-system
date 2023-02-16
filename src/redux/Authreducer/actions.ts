
import * as types from './actionTypes'
import { Dispatch } from "redux"
import axios from "axios"

export interface IAuthDetailLogin {
  loginEmail: string
  loginPassword: string
  
}
export interface IAuthDetailadminSignup {
  name:string
  email: string
  password: string
  reEnteredPassword:string
  
}

export const AdminLoginAction = ({loginEmail,loginPassword}:IAuthDetailLogin ) =>  (dispatch: Dispatch) => {
    
    dispatch({type:types.LOGIN_REQUEST})

    axios.post("localhost/api/admin/login",{loginEmail,loginPassword}) 
    .then((r) => {
      dispatch({ type: types.LOGIN_SUCCESS, payload: r.data.token });
    })
    .catch((e) => {
      dispatch({ type: types.LOGIN_ERROR, payload: e });
    });
}



export const AdminsignupAction = ({name,email,password,reEnteredPassword}:IAuthDetailadminSignup ) =>  (dispatch: Dispatch) => {
    
  dispatch({type:types.LOGIN_REQUEST})

  axios.post("localhost/api/admin/signup",{name,email,password,reEnteredPassword}) 
  .then((r) => {
    dispatch({ type: types.LOGIN_SUCCESS, payload: r.data.token });
  })
  .catch((e) => {
    dispatch({ type: types.LOGIN_ERROR, payload: e });
  });
}
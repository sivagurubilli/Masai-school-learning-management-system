import { Action } from "./action";
import { ActionTypes } from "./actionTypes";

export interface Iisauthstate{
  isAuth :boolean,
  username:string,
  isAdmin:boolean
}
const initialauthState={
  isAuth :false,
 username:"",
 isAdmin:false
}

export const reducer =(state:Iisauthstate=initialauthState,action:Action):any=>{
  const {payload} = action 
  switch(action.type){
      case ActionTypes.LOGIN_SUCCESS:
        return {...state,isAuth:true,username:payload.username}
    default:
      return state
    }
}

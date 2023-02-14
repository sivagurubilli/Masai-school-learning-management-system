

import * as types from "./actionTypes"
const initialState ={
    isAuth:true,
    token:"",
    isLoading:false,
    isError:false,

}


 export const reducer =(state = initialState,action)=>{
    const {type,payload }= action;
      switch(type){
     case types.LOGIN_REQ:
      return{
        ...state,
        isLoading:true
        }
      case types.LOGIN_SUCC:
        return{
            ...state,
            isLoading:false,
            isError:false,
            isAuth:true,
            token:payload,
        }
        case types.LOGIN_ERR:
            return{
                ...state,
                isLoading:false,
                isError:true,
                isAuth:false
            }
            default:
                return state
  }
}
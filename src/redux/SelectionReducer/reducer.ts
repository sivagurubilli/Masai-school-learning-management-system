
import * as Action from "./action";
import { ActionTypes } from "./actionTypes";


const initialState = {
  Batch:{},
  Section:{},
  User:{},
  Categoery:{},
  Type:{}

};

export const BatchReducer = (
  state= initialState,
  action: Action.BatchAction
): any => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_BATCH_SUCCESS:
      return { ...state,Batch:payload };
     
    default:
      return state;
  }
};

export const SectionReducer = (
  state= initialState,
  action: Action.SectionAction
): any => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_SECTION_SUCCESS:
      return { ...state,Section:payload };
     
    default:
      return state;
  }
};

export const UserReducer = (
  state= initialState,
  action: Action.UserAction
): any => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_USER_SUCCESS:
      return { ...state,User:payload };
     
    default:
      return state;
  }
};


export const TypeReducer = (
  state= initialState,
  action: Action.TypeAction
): any => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_TYPE_SUCCESS:
      return { ...state,Type:payload };
     
    default:
      return state;
  }
};


export const CategoeryReducer = (
  state= initialState,
  action: Action.CategoeryAction
): any => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_CATEGEORY_SUCCESS:
      return { ...state,Categoery:payload };
     
    default:
      return state;
  }
};
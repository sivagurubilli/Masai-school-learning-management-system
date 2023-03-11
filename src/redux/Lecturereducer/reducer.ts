
import { Action } from "./action";
import { ActionTypes } from "./actionTypes";


const initialState = {
  Data:{}
};

export const reducer = (
  state= initialState,
  action: Action
): any => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_SINGLE_DATA_SUCCESS:
      return { ...state, AllData:payload };
    default:
      return state;
  }
};

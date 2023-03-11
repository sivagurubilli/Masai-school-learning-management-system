import {ActionTypes} from "./actionTypes"

interface IDataState {
    type:ActionTypes.GET_SINGLE_DATA_SUCCESS,
    payload:any 
}
export type Action = IDataState 
import {ActionTypes} from "./actionTypes"

interface IBatchState {
    type:ActionTypes.GET_BATCH_SUCCESS,
    payload:any 
}
interface ITypeState {
    type:ActionTypes.GET_TYPE_SUCCESS,
    payload:any 
}
interface ISectionState {
    type:ActionTypes.GET_SECTION_SUCCESS,
    payload:any 
}
interface ICategeoryState {
    type:ActionTypes.GET_CATEGEORY_SUCCESS,
    payload:any 
}
interface IUserState {
    type:ActionTypes.GET_USER_SUCCESS,
    payload:any 
}
export type BatchAction = IBatchState
export type SectionAction = ISectionState
export type UserAction = IUserState
export type TypeAction = ITypeState
export type CategoeryAction = ICategeoryState
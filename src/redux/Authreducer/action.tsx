import {ActionTypes} from "./actionTypes"
import { IisAuthstate } from "./reducer"
interface IsAuth {
    type:ActionTypes.LOGIN_SUCCESS,
    payload:IisAuthstate
}
export type Action = IsAuth
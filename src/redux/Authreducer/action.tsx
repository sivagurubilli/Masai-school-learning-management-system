import {ActionTypes} from "./actionTypes"
import { Iisauthstate } from "./reducer"
interface IsAuth {
    type:ActionTypes.LOGIN_SUCCESS,
    payload:Iisauthstate
}
export type Action = IsAuth
import {applyMiddleware,combineReducers, legacy_createStore,compose} from "redux"
import thunk from "redux-thunk"
import {reducer as Authreducer} from "./Authreducer/reducer"

const rootreducer = combineReducers({Authreducer})
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;


export const store =legacy_createStore(rootreducer,composeEnhancers(applyMiddleware(thunk)))
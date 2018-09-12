import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import RouteInfo from './RouteInfoReducer'
import AuthReducer from "./AuthReducer";
import WritingReducer from "./WritingReducer";

const reducer = combineReducers({
  auth:AuthReducer,
  RouteInfo,
  WritingReducer,
  form: formReducer
})

export default reducer
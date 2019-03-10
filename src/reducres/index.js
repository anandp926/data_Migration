import { combineReducers } from "redux"
import authReducer from "./reducres"

export default combineReducers({
  auth: authReducer
})
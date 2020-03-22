import UserListReducer from "./UserListReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";
import pagiReduder from "./PagiReduder";
import videoListReducer from './webListReducer'

export default combineReducers({
  user: UserReducer,
  imageList: UserListReducer,
  pagi: pagiReduder,
  videoList : videoListReducer
});

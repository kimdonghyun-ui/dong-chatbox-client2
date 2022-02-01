import { combineReducers } from "redux";
import chats from "./chats";
import members from "./members";

const rootReducer = combineReducers({
  chats,
  members,
});

export default rootReducer;
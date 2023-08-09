import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";

const rootReducer = combineReducers({
  todoList: todoReducer,
});

export default rootReducer;

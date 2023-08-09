import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const todoSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], editingTaskId: null },
  reducers: {
    addTask(state, action) {
      state.tasks.push({ ...action.payload, id: uuidv4(), isChecked: false });
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateTaskState(state, action) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);

      state.tasks[index] = {
        ...state.tasks[index],
        ...action.payload.updatedState,
      };
    },
    renameTask(state, action) {
      const { id, updatedValue } = action.payload;

      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.task = updatedValue;
      }
    },

    startEditTask(state, action) {
      state.editingTaskId = action.payload;
    },

    finishEditTask(state, action) {
      state.editingTaskId = null;
    },
  },
});

const { reducer, actions } = todoSlice;
export const {
  addTask,
  deleteTask,
  updateTaskState,
  renameTask,
  startEditTask,
  finishEditTask,
} = actions;

export default reducer;

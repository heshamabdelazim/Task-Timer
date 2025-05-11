import { configureStore } from "@reduxjs/toolkit";
import tasks from "./slices/tasksSlice";

const myStore = configureStore({
  reducer: {
    appManager: tasks,
  },
});

export default myStore;

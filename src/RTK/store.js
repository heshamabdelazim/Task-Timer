import { configureStore } from "@reduxjs/toolkit";
import tasks from "./slices/tasksSlice";

const myStore = configureStore({
  reducer: {
    tasks: tasks,
  },
});

export default myStore;

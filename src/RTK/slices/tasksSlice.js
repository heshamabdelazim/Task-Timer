import { createSlice } from "@reduxjs/toolkit";
import { makeTime } from "../../utilis/utilis";
import { sortingOptionsArr } from "../../utilis/sorting";

const allTasks = createSlice({
  initialState: {
    tasks: [],
    popupInfo: null, //this important when the user press to set his timer
    time: makeTime(),
  },
  name: "allTasks",
  reducers: {
    //==========tasks actoins
    addATask: (state, action) => {
      state.tasks.push(action.payload);
    },
    //===========
    deleteATask: (state, action) => {
      const upDate = state.tasks.filter((obj) => {
        return obj.id !== action.payload;
      });
      state.tasks = upDate;
    },
    //===========
    resetTasks: (state, action) => {
      state.tasks.map((taskObj) => {
        if (taskObj.progress) {
          taskObj.progress = false;
        }
      });
      state.time = makeTime();
    },
    //===========
    setPopupInfo: (state, action) => {
      //this to open the popup with task informatoin
      state.popupInfo = null;
      state.popupInfo = action.payload;
    },

    // ===================
    progressHandler: (state, action) => {
      //this to modify the progress of a task inside tasks array
      state.tasks = state.tasks.map((taskObj) => {
        if (taskObj.id == action.payload.id) {
          taskObj = action.payload;
        }
        return taskObj;
      });
    },

    //===========
    setTime: (state, action) => {
      state.time = { ...action.payload };
    },

    //===========
    sorting: (state, action) => {
      // console.log(action.payload);

      sortingOptionsArr.map((ele) => {
        if (action.payload === ele.value) {
          console.log(ele.method);
          state.tasks = ele.method(state.tasks);
        }
      });
    },
  },
});

export default allTasks.reducer;
export const {
  addATask,
  deleteATask,
  resetTasks,
  setPopupInfo,
  progressHandler,
  setTime,
  sorting,
} = allTasks.actions;

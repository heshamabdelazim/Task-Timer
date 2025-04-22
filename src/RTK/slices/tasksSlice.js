import { createSlice } from "@reduxjs/toolkit";

const allTasks = createSlice({
  initialState: {
    tasks: [],
    popupInfo: null, //this important when the user press to set his timer
    timeUi: null,
  },
  name: "allTasks",
  reducers: {
    //==========tasks actoins
    addATask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    deleteATask: (state, action) => {
      const upDate = state.tasks.filter((obj) => {
        return obj.id !== action.payload;
      });
      state.tasks = upDate;
    },
    resetTasks: (state, action) => {
      state.tasks.map((taskObj) => {
        taskObj.progress = false;
      });
      state.timeUi = null;
    },
    //===========popupInfo actoin
    setPopupInfo: (state, action) => {
      //this to open the popup with task informatoin
      state.popupInfo = null;
      state.popupInfo = action.payload;
    },
    // ===================
    startProgressTask: (state, action) => {
      //this function loop and update (progress & taskDur & timeUi)
      state.tasks.map((taskObj) => {
        if (taskObj.id == action.payload.id) {
          taskObj.progress = true;
          taskObj.taskDur = action.payload.taskDur;
          state.timeUi = { ...taskObj.taskDur, sec: 0 };
        }
      });
    },
    testClassObj: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    upDateTimeUi: (state, action) => {
      //this function will be used to update (timeUi) every 1 sec
      let secUpdate = state.timeUi.sec - 1;
      let minUpdate = state.timeUi.min;
      let hrUpdate = state.timeUi.hr;

      if (secUpdate === -1) {
        //sec end and update
        secUpdate = 59;
        --minUpdate;
      }
      if (minUpdate === -1) {
        //min end and update
        minUpdate = 59;
        hrUpdate--;
      }
      state.timeUi = { min: minUpdate, sec: secUpdate, hr: hrUpdate };
    },
    clearTimeUi: (state, action) => {
      state.timeUi = null;
    },
  },
});

export default allTasks.reducer;
export const {
  addATask,
  deleteATask,
  resetTasks,
  setPopupInfo,
  startProgressTask,
  upDateTimeUi,
  clearTimeUi,
} = allTasks.actions;

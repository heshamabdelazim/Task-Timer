import { useDispatch, useSelector } from "react-redux";
import {
  clearTimeUi,
  deleteATask,
  setPopupInfo,
  upDateTimeUi,
} from "../../RTK/slices/tasksSlice";
import { useEffect, useRef } from "react";
import TimerPopup from "./TimerPopup";
import ATask from "./ATask";

const TaskContainer = () => {
  const app_redux_manager = useSelector((state) => state.appManager);
  const dispatch = useDispatch();
  let timeUi = app_redux_manager.timeUi; //this is {sec:0, min:0, hr:0}
  const spanDom = useRef();
  const checkDom = useRef();
  let chosenTask = useRef();

  useEffect(() => {
    if (timeUi) {
      const intervalId = setInterval(() => {
        const isTimesUp = timeUi.sec == 0 && timeUi.min == 0 && timeUi.hr == 0;
        if (isTimesUp) {
          // if we got {sec:0 , min:0, hr: 0} timer will stop
          clearInterval(intervalId); //This if timer ended in 00:00:00
          spanDom.current.classList.add("timesUp"); //adding animation to the finished timer
          // checkDom.current.classList.add("done"); //focus on the check to press
        } else {
          dispatch(upDateTimeUi());
          // checkDom.current.classList.remove("done"); //This if the user
        }
      }, 1000); // Update count every 1 second
      return () => clearInterval(intervalId);
      // Cleanup function to clear the interval when the component unmounts
    }
  }, [timeUi]);

  useEffect(() => {
    console.log("Task comp rendered");
  });
  // function

  // function =============
  const handleCheck = (taskObj) => {
    dispatch(deleteATask(taskObj.id));
    taskObj.progress && dispatch(clearTimeUi());
  };

  if (app_redux_manager.tasks.length !== 0) {
    return (
      <ul className="list">
        {app_redux_manager.tasks.map((taskObj, ind) => (
          <ATask />
        ))}
      </ul>
    );
  }
  return (
    <h2 className="lazy">Why are you lazy poor useless? 🐌</h2>
    // <h2 className="huh">Huh? 🐌</h2>
  );
};

export default TaskContainer;

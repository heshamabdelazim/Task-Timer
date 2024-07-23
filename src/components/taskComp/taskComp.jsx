import { useDispatch, useSelector } from "react-redux";
import {
  clearTimeUi,
  deleteATask,
  setShowTime,
  upDateTimeUi,
} from "../../RTK/slices/tasksSlice";
import { useEffect, useRef } from "react";

const TaskComp = () => {
  const db = useSelector((state) => state);
  const dispatch = useDispatch();
  const timeUi = db.tasks.timeUi;
  const spanDom = useRef();
  const checkDom = useRef();

  useEffect(() => {
    if (timeUi) {
      const intervalId = setInterval(() => {
        if (timeUi.sec == 0 && timeUi.min == 0 && timeUi.hr == 0) {
          // if we got {sec:0 , min:0, hr: 0} timer will stop
          clearInterval(intervalId); //This if timer ended in 00:00:00
          spanDom.current.classList.add("timesUp");
          checkDom.current.classList.add("done");
        } else {
          dispatch(upDateTimeUi());
          checkDom.current.classList.remove("done");
        }
      }, 1000); // Update count every 1 second
      return () => clearInterval(intervalId);
      // Cleanup function to clear the interval when the component unmounts
    }
  }, [timeUi]);

  // function
  function numberModify(num) {
    //This function when the timer work to give number has 2 digits
    return num < 10 ? "0" + num : num;
  }
  //
  function puttingTimer(taskObj) {
    const chosenTask = db.tasks.tasks.find((taskObj) => taskObj.progress);
    return (
      chosenTask &&
      chosenTask.id == taskObj.id && (
        <>
          <span className="tm rounded text-center" ref={spanDom}>
            {numberModify(db.tasks.timeUi.hr)} :{" "}
            {numberModify(db.tasks.timeUi.min)} :{" "}
            {numberModify(db.tasks.timeUi.sec)}
          </span>
        </>
      )
    );
  }
  // function =============
  function checkClicked(taskObj) {
    dispatch(deleteATask(taskObj.id));
    dispatch(clearTimeUi());
    // db.tasks.timeUi && dispatch(clearTimeUi());
  }

  return db.tasks.tasks.length !== 0 ? (
    db.tasks.tasks.map((taskObj, ind) => {
      return (
        <li
          key={taskObj.id}
          className={" d-flex justify-content-between align-items-center gap-2"}
        >
          <div className="position-relative d-flex align-items-center gap-3">
            <span
              className={` d-flex gap-1 ${taskObj.progress ? "active" : ""}`}
            >
              <span>{ind + 1}</span> <span>-</span> {taskObj.taskName}
            </span>
            {db.tasks.timeUi && puttingTimer(taskObj)}
          </div>
          <div className="controls d-flex align-items-center">
            <span
              className="icon-stopwatch"
              title="Set Time"
              onClick={() => {
                dispatch(setShowTime(taskObj));
              }}
            />
            <span
              className="icon-checkmark"
              ref={checkDom}
              onClick={() => checkClicked(taskObj)}
            />
          </div>
        </li>
      );
    })
  ) : (
    <>
      <h2 className="lazy">Why are you lazy poor useless? 🐌</h2>
      {/* <h2 className="huh">Huh? 🐌</h2> */}
    </>
  );
};

export default TaskComp;

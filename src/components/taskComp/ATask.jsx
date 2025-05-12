import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteATask,
  setPopupInfo,
  setTime,
} from "../../RTK/slices/tasksSlice";
import TimerPopup from "./TimerPopup";
import { makeTime } from "../../utilis/utilis";

const ATask = React.memo(({ taskObj, ind }) => {
  const spanDom = useRef();
  const checkDom = useRef();

  const dispatch = useDispatch();

  const handleCheck = (taskObj) => {
    dispatch(deleteATask(taskObj.id));
    dispatch(setTime(makeTime()));
  };

  useEffect(() => console.log("Atask rendered " + taskObj.taskName));
  return (
    <li className={" d-flex justify-content-between align-items-center gap-2"}>
      <div className="position-relative d-flex align-items-center gap-3">
        <span className={` d-flex gap-1 ${taskObj.progress ? "active" : ""}`}>
          <span>{ind + 1}</span> <span>- </span>{" "}
          <span
            style={{ textDecoration: taskObj.isDone ? "line-through" : "none" }}
          >
            {taskObj.taskName}
          </span>
        </span>
        {taskObj.progress && !taskObj.isDone && (
          <TimerPopup taskObj={taskObj} spanDom={spanDom} />
        )}
      </div>
      <div className="controls d-flex align-items-center">
        <span
          className="icon-stopwatch"
          title="Set Time"
          onClick={() => {
            dispatch(setPopupInfo(taskObj));
          }}
        />
        <span
          className="icon-checkmark"
          ref={checkDom}
          onClick={() => handleCheck(taskObj)}
        />
      </div>
    </li>
  );
});

export default ATask;

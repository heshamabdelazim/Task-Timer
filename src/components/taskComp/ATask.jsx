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
  const checkDom = useRef();
  const { current: center_flex } = useRef("d-flex align-items-center gap-2");
  const dispatch = useDispatch();

  const handleCheck = (taskObj) => {
    dispatch(deleteATask(taskObj.id));
    dispatch(setTime(makeTime()));
  };

  useEffect(() => console.log("Atask rendered " + taskObj.taskName));
  return (
    <li
      className={
        "d-flex justify-content-between align-items-center gap-3 flex-wrap "
      }
      id={taskObj.id}
    >
      <div className="position-relative d-flex align-items-center gap-3 flex-fill">
        <div className={` d-flex gap-1 ${taskObj.progress ? "active" : ""}`}>
          <span>{ind + 1}</span> <span>- </span>{" "}
          <span
            style={{ textDecoration: taskObj.isDone ? "line-through" : "none" }}
          >
            {taskObj.taskName}
          </span>
        </div>
      </div>
      <div className={center_flex + " justify-content-end flex-fill"}>
        {taskObj.progress && !taskObj.isDone && (
          <TimerPopup taskObj={taskObj} checkDom={checkDom} />
        )}
        <div className={center_flex + " controls"}>
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
      </div>
    </li>
  );
});

export default ATask;

ATask.displayName = "ATask";
//this line important to avoid red line appears by the ESLint

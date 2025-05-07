import React from "react";

function ATask() {
  return (
    <li
      key={taskObj.id}
      className={" d-flex justify-content-between align-items-center gap-2"}
    >
      <div className="position-relative d-flex align-items-center gap-3">
        <span className={` d-flex gap-1 ${taskObj.progress ? "active" : ""}`}>
          <span>{ind + 1}</span> <span>-</span> {taskObj.taskName}
        </span>
        {app_redux_manager.timeUi && (
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
}

export default ATask;

import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

function TimerPopup({ taskObj, spanDom }) {
  useEffect(() => {
    console.log("TimerPopup Rendered");
  });
  const app_redux_manager = useSelector((state) => state.appManager);
  const chosenTask = app_redux_manager.tasks.find(
    (taskObj) => taskObj.progress
  );
  const twoDigits = useCallback((x) => (x < 10 ? `0${x}` : x), []);
  return (
    chosenTask &&
    chosenTask.id == taskObj.id && (
      <>
        <span className="tm rounded text-center" ref={spanDom}>
          {twoDigits(app_redux_manager.timeUi.hr)} :{" "}
          {twoDigits(app_redux_manager.timeUi.min)} :{" "}
          {twoDigits(app_redux_manager.timeUi.sec)}
        </span>
      </>
    )
  );
}
export default TimerPopup;

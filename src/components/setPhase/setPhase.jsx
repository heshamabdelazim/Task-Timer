import { useDispatch, useSelector } from "react-redux";
import Clock from "../analog-clock/clock";
import {
  deleteShowTime,
  setShowTime,
  taskOnProgress,
} from "../../RTK/slices/tasksSlice";

const SetPhase = () => {
  const db = useSelector((state) => state);
  const showTime = db.tasks.showTime;
  const dispatch = useDispatch();

  const myTaskUpdate = (min, hr, prog) => {
    //this function return task object to update inputs and send to redux
    return {
      taskName: showTime.taskName,
      taskDur: {
        min: min || showTime.taskDur.min,
        hr: hr || showTime.taskDur.hr,
      },
      id: showTime.id,
      progress: prog || showTime.progress,
    };
  };
  // ============function
  function okClicked() {
    // This function will work when the uesr Press (Ok)
    if (showTime.taskDur.min != 0 || showTime.taskDur.hr != 0) {
      dispatch(taskOnProgress(myTaskUpdate("", "", true)));
      dispatch(deleteShowTime());
    }
  }

  return (
    <section className="window position-relative">
      <h3>Task Duration</h3>
      <div className="clock-set d-flex gap-2 flex-column align-items-center justify-content-around ">
        <Clock show={true} time={showTime.taskDur} />
        <div className="w-100">
          <h2 className="active text-center m-0">{showTime.taskName}</h2>
          <h4 className="text-center">Deadline?</h4>
          <div className="inputs">
            <div className="min">
              <h6 className="text-center">Minutes</h6>
              <input
                type="number"
                min="0"
                step="5"
                value={showTime.taskDur.min}
                onChange={
                  (e) => dispatch(setShowTime(myTaskUpdate(+e.target.value)))
                  //this to dispatch entire task object to update the input
                }
              />
            </div>
            <div className="hr">
              <h6 className="text-center">Hours</h6>
              <input
                type="number"
                name="hr"
                min="0"
                value={showTime.taskDur.hr}
                onChange={(e) => {
                  dispatch(setShowTime(myTaskUpdate("", +e.target.value)));
                  //this to dispatch entire task object to update the input
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="close-control ">
        <button
          className="button"
          onClick={() => {
            dispatch(deleteShowTime());
          }}
        >
          Cancel
        </button>
        <button
          className={`button  bg-danger}`}
          onClick={() => {
            okClicked();
          }}
        >
          Ok
        </button>
      </div>
    </section>
  );
};

export default SetPhase;

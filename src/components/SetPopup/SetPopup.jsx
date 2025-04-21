import { useDispatch, useSelector } from "react-redux";
import Clock from "../analog-clock/clock";
import { setShowTime, taskOnProgress } from "../../RTK/slices/tasksSlice";

const SetPopup = () => {
  const db = useSelector((state) => state);
  const popupData = db.tasks.showTime;
  const dispatch = useDispatch();

  const myTaskUpdate = (min, hr, prog) => {
    //this function return task object to update inputs and send to redux
    return {
      taskName: popupData.taskName,
      taskDur: {
        min: min || popupData.taskDur.min,
        hr: hr || popupData.taskDur.hr,
      },
      id: popupData.id,
      progress: prog || popupData.progress,
    };
  };
  // ============function
  function okClicked() {
    let taskSetTime; //this will update to be {taskName, taskDur, id, progress}
    // This function will work when the uesr Press (Ok)
    if (popupData.taskDur.min || popupData.taskDur.hr) {
      dispatch(taskOnProgress(myTaskUpdate("", "", true)));
      dispatch(setShowTime(null));
    }
  }

  return (
    <section className="popup position-relative">
      <h3>Task Duration</h3>
      <div className="clock-set d-flex gap-2 flex-column align-items-center justify-content-around ">
        <Clock show={true} time={popupData.taskDur} />
        <div className="w-100">
          <h2 className="active text-center m-0">{popupData.taskName}</h2>
          <h4 className="text-center">End In?</h4>
          <div className="inputs">
            <div className="min">
              <h6 className="text-center">Minutes</h6>
              <input
                type="number"
                min="0"
                step="5"
                value={popupData.taskDur.min}
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
                value={popupData.taskDur.hr}
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
            dispatch(setShowTime(null));
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

export default SetPopup;

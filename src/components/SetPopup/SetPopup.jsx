import { useDispatch, useSelector } from "react-redux";
import Clock from "../analog-clock/clock";
import { popupDetails, startProgressTask } from "../../RTK/slices/tasksSlice";

const SetPopup = () => {
  const db = useSelector((state) => state);
  const popupData = db.tasks.popupInfo;
  const dispatch = useDispatch();

  const popupInfo_structure = (min, hr, prog) => {
    //this function return task object to update inputs and send to redux
    if (hr) {
      console.log(hr);
    }
    if (min) {
      console.log(min);
    }
    return {
      ...popupData,
      progress: prog,
      hr: hr || popupData,
    };

    // return {
    //   taskName: popupData.taskName,
    //   taskDur: {
    //     min: min || popupData.taskDur.min,
    //     hr: hr || popupData.taskDur.hr,
    //   },
    //   id: popupData.id,
    //   progress: prog || popupData.progress,
    // };
  };
  // ============function
  const handleOK = () => {
    // This function will work when the uesr Press (Ok)
    const isNot_emptyTime = popupData.taskDur.min || popupData.taskDur.hr; //if min=123 or hr=123
    let settedTime; //this will update to be {taskName, taskDur, id, progress}
    if (isNot_emptyTime) {
      settedTime = popupInfo_structure("", "", true);
      console.log(settedTime);
      dispatch(startProgressTask(settedTime));
      dispatch(popupDetails(null));
    }
  };

  const handleMinChange = (e) => {
    const min = e.target.value;

    //user change min of popup? chosen-popup-info in the redux will re-render
  };
  const handleHrChange = (e) => {
    const hr = e.target.value;
    console.log(hr);
  };

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
                  (e) => {
                    // dispatch(popupDetails(popupInfo_structure(+e.target.value)));
                    handleMinChange(e);
                  }
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
                  handleHrChange(e);
                  // dispatch(popupDetails(popupInfo_structure("", +e.target.value)));
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
            dispatch(popupDetails(null));
          }}
        >
          Cancel
        </button>
        <button className={`button  bg-danger}`} onClick={handleOK}>
          Ok
        </button>
      </div>
    </section>
  );
};

export default SetPopup;

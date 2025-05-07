import { useDispatch, useSelector } from "react-redux";
import Clock from "../../analog-clock/clock";
import {
  setPopupInfo,
  startProgressTask,
} from "../../../RTK/slices/tasksSlice";

const SetPopup = ({ redux_hasPopupData }) => {
  const dispatch = useDispatch();

  const popupInfo_structure = (isUpdatingMin, minOrhr) => {
    /*
    this method to return the same popup_info but different minutes / hours
    whenever the user modify min || hr
    */
    if (isUpdatingMin) {
      return {
        ...redux_hasPopupData,
        taskDur: { ...redux_hasPopupData.taskDur, min: minOrhr },
      };
    }
    if (!isUpdatingMin) {
      return {
        ...redux_hasPopupData,
        taskDur: { ...redux_hasPopupData.taskDur, hr: minOrhr },
      };
    }
  };

  const handleMinChange = (e) => {
    const newMin = +e.target.value; //get the min
    //update popup-info with a new min
    const theUpdated_TaskObj = popupInfo_structure(true, newMin);
    //the dispatch to re-render
    dispatch(setPopupInfo(theUpdated_TaskObj));
  };

  // ============function
  const handleHrChange = (e) => {
    const newHr = +e.target.value;
    //update popup-info with a new hr
    const theUpdated_TaskObj = popupInfo_structure(false, newHr);
    //the dispatch to re-render
    dispatch(setPopupInfo(theUpdated_TaskObj));
  };

  // ============function
  const handleOK = () => {
    // This function will work when the uesr Press (Ok)
    const isNot_emptyTime =
      redux_hasPopupData.taskDur.min || redux_hasPopupData.taskDur.hr; //if min=123 or hr=123
    if (isNot_emptyTime) {
      dispatch(startProgressTask(redux_hasPopupData));
      dispatch(setPopupInfo(null));
    }
  };

  return (
    <section className="popup position-relative">
      <h3>Task Duration</h3>
      <div className="clock-set d-flex gap-2 flex-column align-items-center justify-content-around ">
        <Clock show={true} time={redux_hasPopupData.taskDur} />
        <div className="w-100">
          <h2 className="active text-center m-0">
            {redux_hasPopupData.taskName}
          </h2>
          <h4 className="text-center">End In?</h4>
          <div className="inputs">
            <div className="min">
              <h6 className="text-center">Minutes</h6>
              <input
                type="number"
                min="0"
                step="5"
                value={redux_hasPopupData.taskDur.min}
                onChange={handleMinChange}
              />
            </div>
            <div className="hr">
              <h6 className="text-center">Hours</h6>
              <input
                type="number"
                name="hr"
                min="0"
                value={redux_hasPopupData.taskDur.hr}
                onChange={handleHrChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="close-control ">
        <button className="button" onClick={() => dispatch(setPopupInfo(null))}>
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

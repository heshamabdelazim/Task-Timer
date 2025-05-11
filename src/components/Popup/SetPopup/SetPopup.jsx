import { useDispatch, useSelector } from "react-redux";
import Clock from "../../analog-clock/clock";
import { setPopupInfo, progressHandler } from "../../../RTK/slices/tasksSlice";
import { useState } from "react";
import { calcEndTimeAfter } from "../../../utilis/utilis";

const SetPopup = ({ redux_hasPopupData }) => {
  const dispatch = useDispatch();
  const [min, setMin] = useState(0);
  const [hr, setHr] = useState(0);

  const handleMinChange = (e) => {
    const newMin = +e.target.value; //get the min
    setMin(newMin);
  };

  // ============function
  const handleHrChange = (e) => {
    const newHr = +e.target.value;
    setHr(newHr);
  };

  // ============function
  const handleOK = () => {
    // This function will work when the uesr Press (Ok)
    const isNot_emptyTime = min || hr;
    if (isNot_emptyTime) {
      const milliSecond_bigInt = calcEndTimeAfter(min, hr); //this is BigInt() //600000n
      const milleSeconds_ofEndTime = Number(milliSecond_bigInt); //Number as redux can't serialize bigInt
      redux_hasPopupData = {
        ...redux_hasPopupData,
        endTimeAfter: milleSeconds_ofEndTime,
        progress: true,
        startTime: new Date().getTime(),
      };
      dispatch(progressHandler(redux_hasPopupData));
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
                value={min}
                onChange={handleMinChange}
              />
            </div>
            <div className="hr">
              <h6 className="text-center">Hours</h6>
              <input
                type="number"
                name="hr"
                min="0"
                value={hr}
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

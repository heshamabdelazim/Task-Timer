import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { resetTasks, setPopupInfo } from "../../../RTK/slices/tasksSlice";

const ResetPopup = ({ redux_hasProgressTask }) => {
  useEffect(() => console.log("ResetPopup rendered"));
  const dispatch = useDispatch();

  // function========

  const resetHandler = useCallback(() => {
    dispatch(resetTasks());
    dispatch(setPopupInfo(redux_hasProgressTask));
  }, []);

  return (
    <section className="popup position-relative h-50">
      <h3 className="m-0">You should concentrate on one task:</h3>
      <h2 className="active text-center m-0">
        {redux_hasProgressTask.taskName}
      </h2>
      <div className="close-control ">
        <button
          className="button"
          onClick={() => {
            dispatch(setPopupInfo(null));
          }}
        >
          Cancel
        </button>
        <button
          className="button reset"
          onClick={() => {
            resetHandler();
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
};

export default ResetPopup;

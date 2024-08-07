import { useDispatch, useSelector } from "react-redux";
import {
  deleteShowTime,
  resetTasks,
  setShowTime,
} from "../../RTK/slices/tasksSlice";

const ResetPhase = () => {
  const db = useSelector((state) => state);
  const dispatch = useDispatch();
  const getTaskProgress = db.tasks.tasks.find((taskObj) => taskObj.progress);

  // function========
  function resetting() {
    // dispatch(deleteShowTime());
    dispatch(resetTasks());
    dispatch(setShowTime(getTaskProgress));
  }
  return (
    <section className="window position-relative h-50">
      <h3 className="m-0">You should concentrate on one task:</h3>
      <h2 className="active text-center m-0">{getTaskProgress.taskName}</h2>
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
          className="button reset"
          onClick={() => {
            resetting();
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
};

export default ResetPhase;

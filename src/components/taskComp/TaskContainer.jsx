import { useDispatch, useSelector } from "react-redux";
import {
  clearTimeUi,
  deleteATask,
  upDateTimeUi,
} from "../../RTK/slices/tasksSlice";
import { useEffect, useRef } from "react";
import ATask from "./ATask";

const TaskContainer = () => {
  const app_redux_manager = useSelector((state) => state.appManager);
  const dispatch = useDispatch();
  // let timeUi = app_redux_manager.timeUi; //this is {sec:0, min:0, hr:0}

  console.log(app_redux_manager);
  useEffect(() => {
    console.log("Task comp rendered");
  });

  return (
    <ul className="list">
      {app_redux_manager.tasks.length !== 0 ? (
        app_redux_manager.tasks.map((taskObj, ind) => (
          <ATask
            key={taskObj.id}
            ind={ind}
            taskObj={taskObj}
            // handleCheck={handleCheck}
          />
        ))
      ) : (
        <h2 className="lazy">Why are you lazy poor useless? 🐌</h2>
      )}
    </ul>
  );
};

export default TaskContainer;

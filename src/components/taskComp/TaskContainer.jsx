import { useDispatch, useSelector } from "react-redux";
import { deleteATask } from "../../RTK/slices/tasksSlice";
import { useEffect, useRef } from "react";
import ATask from "./ATask";

const TaskContainer = () => {
  const allTasks = useSelector((state) => state.appManager.tasks);
  const dispatch = useDispatch();
  // let timeUi = allTasks.timeUi; //this is {sec:0, min:0, hr:0}

  useEffect(() => {
    console.log("Task comp rendered");
  });

  return (
    <ul className="list">
      {allTasks.length !== 0 ? (
        allTasks.map((taskObj, ind) => (
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

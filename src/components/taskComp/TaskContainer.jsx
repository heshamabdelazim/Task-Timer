import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../RTK/slices/tasksSlice";
import ATask from "./ATask";

const TaskContainer = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.appManager.tasks);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) {
          console.error("Failed to load tasks", await res.text());
          return;
        }
        const tasks = await res.json();
        dispatch(setTasks(tasks));
      } catch (err) {
        console.error("Error loading tasks", err);
      }
    })();
  }, [dispatch]);
  allTasks.length > 0 && console.table(allTasks);
  console.log(allTasks);

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

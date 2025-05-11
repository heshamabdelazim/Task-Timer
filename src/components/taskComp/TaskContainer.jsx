import { useSelector } from "react-redux";
import ATask from "./ATask";

const TaskContainer = () => {
  const allTasks = useSelector((state) => state.appManager.tasks);
  allTasks.length > 0 && console.table(allTasks);

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

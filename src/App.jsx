import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";

import "./icons/style.css";
import Clock from "./components/analog-clock/clock";

function App() {
  // ========useRef
  let inputText = useRef(), //to add task value
    inputTextDom = useRef(), //to Ui with add button
    submitDom = useRef(), //this is add button
    taskId = useRef(0), //every task added it will increment
    isProgress = useRef(false),
    taskOnProgress = useRef(null); //when the user press Ok it will be that task

  // ========= useState
  let [tasks, setTasks] = useState([]),
    [showTime, setShowTime] = useState(null),
    [timeUi, setTimeUi] = useState(null);

  // ===========useEffect
  useEffect(() => {
    resetting();
    inputTextDom.current.addEventListener("input", buttonValidation);
    // getOnProgTask();
    overview();
  });

  // useEffect(() => {
  //   //why this useEffect? to not infinite loop
  // }, [showTime]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     secCountDown();
  //   }, 1000); // Update count every 1 second
  //   // Cleanup function to clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);

  // ============function
  function secCountDown() {
    if (taskOnProgress.current) {
      // setTimeUi({timeUi.hr})
      console.log(timeUi);
    }
  }

  // ============function
  function showTimeObject(taskObj, min, hr) {
    //will return dynamic object to setShowTime() based on arguments
    return {
      id: taskObj.id,
      taskName: taskObj.taskName,
      taskDur: {
        min: min || taskObj.taskDur.min,
        hr: hr || 0,
      },
      progress: taskObj.progress,
    };
  }
  // ============function
  function resetting() {
    inputTextDom.current.value = "";
    !showTime && inputTextDom.current.focus();
    inputText.current = "";
    submitDom.current.classList.add("forbidden");
  }

  // ============function
  const buttonValidation = () => {
    !inputTextDom.current.value
      ? submitDom.current.classList.add("forbidden")
      : submitDom.current.classList.remove("forbidden");
  };
  // ============function
  function addingTask(e) {
    e.preventDefault();
    inputText.current &&
      setTasks([
        ...tasks,
        {
          taskName: inputText.current,
          taskDur: { min: 5, hr: 0 },
          id: ++taskId.current,
          progress: false,
        },
      ]);
  }
  // ============function  (re-useable)
  function getOnProgTask() {
    // In every render if there is task on progress this function will get that task

    if (taskOnProgress.current) {
      setTimeUi({ ...taskOnProgress.current.taskDur, sec: 0 });
    } else {
      // to reset if the task finish
      taskOnProgress.current = null;
      setTimeUi(null);
    }
  }

  // ============function  (re-useable)
  const tasksFilter = (id) => {
    // This function  is re-usable, will return the rest of objects
    taskOnProgress.current = taskOnProgress.current.id == id && null;
    return tasks.filter((taskO) => {
      return taskO.id !== id;
    });
  };

  // ============function
  function okClicked() {
    // This function will work when the uesr Press (Ok) or (delete)
    if (taskOnProgress.current) {
      // when the user should finish his task first
      console.log(showTime, "There is task On Progress");
      tasks.map((taskObj) => {
        if (taskObj.id == showTime.id) {
          taskObj = showTime;
        }
      });
    } else {
      //will send showTime to taskOnProgress & tasksArray
      showTime.progress = true;
      taskOnProgress.current = showTime;

      tasks.map((taskObj) => {
        if (taskObj.id === showTime.id) {
          console.log(taskObj.id, showTime.id);
          taskObj = showTime;
          console.log(taskObj);
        }
      });
      setTimeUi({ ...showTime.taskDur, sec: 0 });
    }
    setShowTime(null);
  }

  // ============function
  function overview() {
    console.table(tasks);
    console.log(showTime, "showTime");
    console.log(taskOnProgress.current, "taskOnProgress");
    console.log(timeUi, "timeUi");
  }

  // ============function  (re-useable)
  function openWindow(showTime) {
    if (!taskOnProgress.current) {
      // in case no task on progress //this is first phase
      return setPhase();
    } else {
      // in case there is a task on progress but user press again
      return showTime.id === taskOnProgress.current.id
        ? resetPhase()
        : sorryPhase();
    }

    // functoinss
    function setPhase() {
      return (
        <section className="window position-relative">
          <h3>Task Duration</h3>
          <div className="clock-set d-flex gap-2 flex-column align-items-center justify-content-around ">
            <Clock show={true} />
            <div className="w-100">
              <h3 className="active text-center m-0">{showTime.taskName}</h3>
              <h4 className="text-center">Deadline?</h4>
              <div className="inputs">
                <div className="min">
                  <h6 className="text-center">Minutes</h6>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    value={showTime.taskDur.min}
                    onChange={(e) =>
                      setShowTime(
                        showTimeObject(
                          showTime,
                          +e.target.value,
                          showTime.taskDur.hr
                        )
                      )
                    }
                  />
                </div>
                <div className="hr">
                  <h6 className="text-center">Hours</h6>
                  <input
                    type="number"
                    name="hr"
                    min="0"
                    value={showTime.taskDur.hr}
                    onChange={(e) => {
                      setShowTime(
                        showTimeObject(
                          showTime,
                          showTime.taskDur.min,
                          +e.target.value
                        )
                      );
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
                setShowTime(null);
              }}
            >
              Cancel
            </button>
            <button
              className={`button ${taskOnProgress.current && "bg-danger"}`}
              onClick={() => {
                okClicked();
              }}
            >
              {taskOnProgress.current ? "delete task" : "Ok"}
            </button>
          </div>
          ;
        </section>
      );
    }
    function resetPhase() {
      return (
        <section className="window position-relative h-50">
          <h3 className="m-0">Reseting current Task?</h3>
          <h2 className="active text-center m-0">
            {taskOnProgress.current.taskName}
          </h2>
          <div className="close-control ">
            <button
              className="button"
              onClick={() => {
                setShowTime(null);
              }}
            >
              Cancel
            </button>
            <button
              className="button reset"
              onClick={() => {
                setShowTime(showTimeObject(taskOnProgress.current));
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                taskOnProgress.current = null;
                setPhase();
              }}
            >
              Reset
            </button>
          </div>
        </section>
      );
    }
    function sorryPhase() {
      return (
        <section className="window position-relative h-50">
          <h3>Sorry, You should concentrate on one task</h3>
          <h2 className="active text-center">
            {taskOnProgress.current.taskName}
          </h2>
          <div className="close-control ">
            <button
              className="button"
              onClick={() => {
                setShowTime(null);
              }}
            >
              Cancel
            </button>
          </div>
        </section>
      );
    }
  }

  return (
    <div className="to-do">
      <Container>
        <div className="parent position-relative">
          <div className="info mb-3">
            <section className="left">
              <div className="slogan mb-4">
                <h1 className="m-0">Task Timer</h1>
                <span className="m-0">Wasting your life? </span>
                <span className="text-warning mb-0   ms-3">
                  watch your time.
                </span>
              </div>
              <form>
                <input
                  type="text"
                  maxLength="40"
                  placeholder="adding task?"
                  onChange={(e) => {
                    inputText.current = e.target.value;
                  }}
                  ref={inputTextDom}
                />
                <input
                  type="submit"
                  value="add"
                  className="button forbidden"
                  onClick={(e) => {
                    addingTask(e);
                  }}
                  ref={submitDom}
                />
              </form>
            </section>
            <section className="rig">
              <Clock />
            </section>
          </div>
          <ul className="list">
            {tasks.length !== 0 ? (
              tasks.map((taskObj, ind) => {
                return (
                  <li
                    key={taskObj.id}
                    className={
                      "d-flex justify-content-between align-items-center"
                    }
                  >
                    <div className="d-flex justify-content-center align-items-center gap-3">
                      <span className={`${taskObj.progress ? "active" : ""}`}>
                        {ind + 1}- {taskObj.taskName}
                      </span>
                      {taskObj.progress && (
                        <>
                          {" - "}
                          <span className="tm rounded p-2">
                            {/* Time Left: {timeUi} */}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="controls d-flex align-items-center gap-4">
                      <span
                        className="icon-stopwatch"
                        title="Set Time"
                        onClick={() => {
                          setShowTime(showTimeObject(taskObj));
                        }}
                      />
                      <span
                        className="icon-checkmark"
                        onClick={() => setTasks(tasksFilter(taskObj.id))}
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <h2 style={{ color: "var(--color5)" }}>
                Why are you lazy poor useless? 🐌
              </h2>
            )}
          </ul>
          {showTime && (
            <div className="window-background">{openWindow(showTime)}</div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;

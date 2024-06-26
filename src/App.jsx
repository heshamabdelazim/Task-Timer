import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";

import "./icons/style.css";
import Clock from "./components/analog-clock/clock";

function App() {
  // ========useRef
  let inputText = useRef(),
    inputTextDom = useRef(),
    submitDom = useRef(),
    taskId = useRef(0),
    taskOnProgress = useRef(null),
    taskTiming = useRef((min = 5, hr = 0) => {
      return { min, hr };
    });

  // ===========useEffect
  useEffect(() => {
    resetting();
    inputTextDom.current.addEventListener("input", buttonValidation);
    getOnProgTask();
    // countDown();
  });

  // ========= useState
  let [tasks, setTasks] = useState([]),
    [showTime, setShowTime] = useState(null),
    [numberInput, setNumberInput] = useState(taskTiming.current());

  // ============function
  function resetting() {
    inputTextDom.current.value = "";
    !showTime && inputTextDom.current.focus();
    // inputTextDom.current.focus();
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
          task: inputText.current,
          taskDur: null,
          id: ++taskId.current,
        },
      ]);
  }
  // ============function  (re-useable)
  function getOnProgTask() {
    // Every render this function will get the task that user chose
    let onProgressTask = tasks.find((taskObj) => taskObj.taskDur);
    taskOnProgress.current = onProgressTask ? onProgressTask : null;
  }

  // ============function  (re-useable)
  const tasksFilter = (id) => {
    // This function  is re-usable, will return the rest of objects
    return tasks.filter((taskO) => {
      return taskO.id !== id;
    });
  };

  // ============function
  function clockItemClicked(taskObj) {
    // This function when the user press (time item).
    //Task coundown or not. It will function

    if (taskOnProgress.current) {
      taskOnProgress.current.id === taskObj.id
        ? setShowTime(taskObj)
        : setShowTime({
            h2: "Sorry, Concentrate on one task",
            taskOnProgress,
          });
    } else {
      console.log(taskTiming.current());
      numberInput.min = taskObj.taskDur
        ? taskObj.taskDur.min
        : taskTiming.current().min;
      numberInput.hr = taskObj.taskDur
        ? taskObj.taskDur.hr
        : taskTiming.current().hr;
      setShowTime(taskObj);
    }
  }

  // ============function
  function okClicked() {
    // This function will work when the uesr Press Ok or delete
    if (showTime.task) {
      showTime.taskDur = numberInput;
      console.log(showTime);
      tasks.map((taskObj) => {
        if (taskObj.id == showTime.id) {
          taskObj = showTime;
        }
      });
    } else {
      const onProgressObj = tasks.find((tasksObj) => tasksObj.taskDur);
      const restTasks = tasksFilter(onProgressObj.id);
      setTasks(restTasks);
    }
    setShowTime(null);
  }

  // ============function
  function countDown() {
    let isTaskFunction = tasks.find((taskObj) => taskObj.taskDur);
    isTaskFunction && console.log(isTaskFunction, "this is isTaskFunction");
    let beso = 5;
    return beso--;
  }

  // ============function
  function overview() {
    console.table(tasks);
    console.log(showTime, "showTime");
    console.log(numberInput, "numberInput");
  }
  overview();

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
                      <span className={`${taskObj.taskDur ? "active" : ""}`}>
                        {ind + 1}- {taskObj.task}
                      </span>
                      {taskObj.taskDur && (
                        <>
                          {" - "}
                          <span className="tm rounded p-2">
                            Time Left: {taskObj.taskDur.hr} :{" "}
                            {taskObj.taskDur.min}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="controls d-flex align-items-center gap-4">
                      <span
                        className="icon-stopwatch"
                        title="Set Time"
                        onClick={() => {
                          clockItemClicked(taskObj);
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
            <div className="timer-background ">
              <section
                className={`timer-dom position-relative ${
                  !showTime.task && "justify-content-around h-75"
                }`}
              >
                {showTime.task ? (
                  <>
                    <h3 className="active">{showTime.task}</h3>
                    <div className="clock-set d-flex align-items-center justify-content-around ">
                      <div className="w-100">
                        <h4 className="text-center">
                          How long the Task may take?
                        </h4>
                        <div className="inputs">
                          <div className="min">
                            <h6>Minutes</h6>
                            <input
                              type="number"
                              min="5"
                              step="5"
                              value={numberInput.min}
                              onChange={(e) =>
                                setNumberInput(
                                  taskTiming.current(
                                    +e.target.value,
                                    numberInput.hr
                                  )
                                )
                              }
                            />
                          </div>
                          <div className="hr">
                            <h6>Hours</h6>
                            <input
                              type="number"
                              name="hr"
                              min="0"
                              value={numberInput.hr}
                              onChange={(e) =>
                                setNumberInput(
                                  taskTiming.current(
                                    numberInput.min,
                                    +e.target.value
                                  )
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <Clock show={true} taskDuration={numberInput} />
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{showTime.h2}</h3>
                    <h3 className="active">
                      {showTime.taskOnProgress.current.task}
                    </h3>
                  </>
                )}
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
                    className={`button ${!showTime.task && "bg-danger"}`}
                    onClick={() => {
                      okClicked();
                    }}
                  >
                    {showTime.task ? "Ok" : "delete task"}
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;

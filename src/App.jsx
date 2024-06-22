import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";

import "./icons/style.css";
import Clock from "./components/analog-clock/clock";

function App() {
  // ========useRef
  let inputText = useRef(),
    inputTextDom = useRef(),
    submitDom = useRef();

  // ===========useEffect
  useEffect(() => {
    resetting();
    inputTextDom.current.addEventListener("input", buttonValidation);
  });

  // ========= useState
  let [tasks, setTasks] = useState([]),
    [showTime, setShowTime] = useState(null);

  // ============function
  function resetting() {
    inputTextDom.current.value = "";
    inputTextDom.current.focus();
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
    inputText.current.length !== 0 &&
      setTasks([
        ...tasks,
        {
          task: inputText.current,
          startTime: null,
        },
      ]);
  }
  // ============function
  const checked = (taskObj) => {
    return tasks.filter((taskO) => {
      return taskO.task !== taskObj.task;
    });
  };

  // ============function

  return (
    <div className="to-do">
      <Container>
        <div className="parent position-relative">
          <h1 className="m-0">Task Timer</h1>
          <span className="m-0">Wasting your life? </span>
          <span className="text-warning mb-5 mt-2  ms-3">watch your time.</span>
          <form className="mb-5">
            <input
              type="text"
              placeholder="adding task?"
              onChange={(e) => {
                inputText.current = e.target.value;
              }}
              ref={inputTextDom}
            />
            <input
              type="submit"
              value="add"
              className="forbidden"
              onClick={(e) => {
                addingTask(e);
              }}
              ref={submitDom}
            />
          </form>
          <ul className="list">
            {tasks.length !== 0 ? (
              tasks.map((taskObj, ind) => {
                return (
                  <li key={ind} className="d-flex justify-content-between">
                    <span>{taskObj.task}</span>
                    <div className="controls d-flex align-items-center gap-4">
                      <span
                        className="icon-stopwatch"
                        title="Set Time"
                        onClick={() => {
                          setShowTime(taskObj.task);
                        }}
                      />
                      <span
                        className="icon-checkmark"
                        onClick={() => setTasks(checked(taskObj))}
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <h2 style={{ color: "var(--color5)" }}>Nothing to show</h2>
            )}
          </ul>
          <Clock />
          {showTime && (
            <div className="timer-background ">
              <section className="timer-dom">This is {showTime}</section>
            </div>
          )}
          {/* when the uesr click here */}
          {/* clicked */}
        </div>
      </Container>
    </div>
  );
}

export default App;

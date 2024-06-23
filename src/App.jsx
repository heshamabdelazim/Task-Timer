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
    [showTime, setShowTime] = useState(null),
    [numberinput, setNumberInput] = useState({ timeSet: "minute", timer: 1 });

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
    inputText.current &&
      setTasks([
        ...tasks,
        {
          task: inputText.current,
          startTime: null,
        },
      ]);
  }

  // ============function
  const tasksFilter = (ind) => {
    // This function will return after filteration of array of tasks
    return tasks.filter((taskO, i) => {
      return i !== ind;
    });
  };

  // ============function

  console.log(numberinput);
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
                  <li key={ind} className="d-flex justify-content-between">
                    <span>{taskObj.task}</span>
                    <div className="controls d-flex align-items-center gap-4">
                      <span
                        className="icon-stopwatch"
                        title="Set Time"
                        onClick={() => {
                          setShowTime(taskObj, ind);
                        }}
                      />
                      <span
                        className="icon-checkmark"
                        onClick={() => setTasks(tasksFilter(ind))}
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <h2 style={{ color: "var(--color5)" }}>
                Why are you lazy useless? 🐌
              </h2>
            )}
          </ul>
          {showTime && (
            <div className="timer-background ">
              <section className="timer-dom position-relative">
                <h3>{showTime.task}</h3>
                <div className="clock-set d-flex align-items-center justify-content-around ">
                  <div className="w-100">
                    <h5 className="text-center">How long the Task may take?</h5>
                    <div className="inputs">
                      <input
                        type="number"
                        min="1"
                        placeholder="Time"
                        value={numberinput.timer}
                        onChange={(e) =>
                          setNumberInput({
                            timeSet: numberinput.timeSet,
                            timer: e.target.value,
                          })
                        }
                      />
                      <select
                        id=""
                        onChange={(e) =>
                          setNumberInput({
                            timeSet: e.target.value,
                            timer: numberinput.timer,
                          })
                        }
                      >
                        <option value="hours">HRs</option>
                        <option value="minutes" selected>
                          MINs
                        </option>
                      </select>
                    </div>
                  </div>
                  <Clock show={true} />
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
                  <button className="button">Ok</button>
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

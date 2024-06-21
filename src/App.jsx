import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";

import "./icons/style.css";
import Clock from "./components/analog-clock/clock";

function App() {
  // ========useRef
  let inputText = useRef(),
    inputTextDom = useRef();
  // ===========useEffect
  useEffect(() => {
    // reseting input and value
    inputTextDom.current.value = "";
    inputText.current = "";
  });
  // ========= useState
  const [task, setTask] = useState([
    // { task: "Making coffee", done: true },
    // { task: "let's run", done: false },
    // { task: "going to gym", done: true },
  ]);

  // ============function
  function addingTask(e) {
    e.preventDefault();
    inputText.current.length !== 0 &&
      setTask([
        ...task,
        {
          task: inputText.current,
          done: false,
        },
      ]);
    inputTextDom.current.value = "";
  }
  function test() {
    // for(){}
  }
  return (
    <div className="to-do">
      <Container>
        <div className="parent position-relative">
          <h1 className="text-center mb-5">To Do</h1>
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
              onClick={(e) => {
                addingTask(e);
              }}
            />
          </form>
          <ul className="list">
            {task.length !== 0 ? (
              task.map((taskObj, ind) => {
                return (
                  <li key={ind} className="d-flex justify-content-between">
                    <span>{taskObj.task}</span>
                    <div className="controls d-flex align-items-center gap-4">
                      <span className="icon-stopwatch" title="Set Time" />
                      <span className="icon-checkmark" />
                      <span className="icon-moon" />
                    </div>
                  </li>
                );
              })
            ) : (
              <h2>Nothing to show</h2>
            )}
          </ul>

          <Clock />
        </div>
      </Container>
    </div>
  );
}

export default App;

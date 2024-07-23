import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";

import "./icons/style.css";
import Clock from "./components/analog-clock/clock";
import SetPhase from "./components/setPhase/setPhase";
import { useDispatch, useSelector } from "react-redux";
import { addATask, upDateTimeUi } from "./RTK/slices/tasksSlice";
import TaskComp from "./components/taskComp/taskComp";
import ResetPhase from "./components/resetPhase/resetPhase";

function App() {
  const db = useSelector((state) => state);
  const timeUi = db.tasks.timeUi;
  const dispatch = useDispatch();

  // ========useRef
  let inputText = useRef(), //to add task value
    inputTextDom = useRef(), //to Ui with add button
    submitDom = useRef(), //this is add button
    taskId = useRef(0); //every task added it will increment

  // ===========useEffect
  useEffect(() => {
    inputTextDom.current.addEventListener("input", buttonValidation);
  });

  // ============function
  function resettingInput() {
    inputTextDom.current.value = "";
    inputTextDom.current.focus();
    submitDom.current.classList.add("forbidden");
  }

  // ============function
  const buttonValidation = () => {
    //when the user start writting
    !inputTextDom.current.value
      ? submitDom.current.classList.add("forbidden")
      : submitDom.current.classList.remove("forbidden");
  };
  // ============function
  function addingTask(e) {
    //adding tasks and reest after
    e.preventDefault();
    const myTask = {
      taskName: inputText.current,
      taskDur: { min: 0, hr: 0 },
      id: ++taskId.current,
      progress: false,
    };
    inputText.current && dispatch(addATask(myTask));
    resettingInput(); //reset
  }

  // ============function  (re-useable)
  function openWindow() {
    const IsTaskProgress = db.tasks.tasks.find((obj) => obj.progress);
    if (!IsTaskProgress) {
      // in case no task on progress //this is first phase
      return <SetPhase />;
    } else {
      // in case there is a task on progress but user press again
      return <ResetPhase />;
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
                <span className="text-warning mb-0 ">watch your time.</span>
              </div>
              <form>
                <input
                  type="text"
                  maxLength="35"
                  placeholder="Not lazy? Add Task."
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
              <Clock time={timeUi} />
            </section>
          </div>
          <ul className="list">
            <TaskComp />
          </ul>
          {db.tasks.showTime && (
            <div className="window-background">{openWindow()}</div>
          )}
        </div>
      </Container>
      <div className="footer  d-flex justify-content-center align-items-center">
        <div className="left p-3 text-center">
          <p className="m-0">Developed By:</p>
          <h3 className="m-0">Hesham Abdelazim Kamel</h3>
        </div>
        <div className="right d-flex flex-wrap justify-content-center gap-3 p-3">
          <a
            href="https://github.com/heshamabdelazim"
            className="icon-github"
            target="_blank"
          />
          <a
            href="https://www.linkedin.com/in/hesham-abdelazim-kamel-678759283"
            className="icon-linkedin"
            target="_blank"
          />
          <a
            href="https://wa.me/+201212005626"
            className="icon-whatsapp"
            target="_blank"
          />
          <a
            href="https://www.facebook.com/hesham.abdelazim.94"
            className="icon-facebook2"
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
}

export default App;

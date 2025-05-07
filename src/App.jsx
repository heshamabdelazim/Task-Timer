import { memo, useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";

import "./icons/style.css";
import Clock from "./components/analog-clock/clock";
import { useDispatch, useSelector } from "react-redux";
import { addATask, upDateTimeUi } from "./RTK/slices/tasksSlice";
import { Task } from "./components/taskClass/Task";
import Footer from "./components/footer/Footer";
import TaskForm from "./components/TaskForm/TaskForm";
import Popup from "./components/Popup/Popup";
import TaskContainer from "./components/taskComp/taskComp";

function App() {
  useEffect(() => {
    console.log("App rendered");
  });

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
              <TaskForm />
            </section>
            <section className="rig">
              <Clock />
            </section>
          </div>
          <ul className="list">
            <TaskContainer />
          </ul>
          <Popup />
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

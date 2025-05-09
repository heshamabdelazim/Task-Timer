import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addATask } from "../../RTK/slices/tasksSlice";
import { Task } from "../taskClass/Task";

function TaskForm() {
  const dispatch = useDispatch();
  // ========useRef
  let inputTextDom = useRef(), //to Ui with add button
    submitDom = useRef(); //this is add button
  // inputText = useRef(), //to add task value

  useEffect(() => {
    inputTextDom.current.addEventListener("input", buttonValidation);
  }, []);

  useEffect(() => {
    console.log("Task Form Rendered");
  });
  // ============function
  const buttonValidation = useCallback(() => {
    //when the user start writting
    !inputTextDom.current.value
      ? submitDom.current.classList.add("forbidden")
      : submitDom.current.classList.remove("forbidden");
  }, []);

  // ============function
  const addingTask = useCallback((e) => {
    //adding tasks and reest after
    e.preventDefault();
    const myTask = Task.create_plain_object(inputTextDom.current.value);
    inputTextDom.current.value && dispatch(addATask(myTask));
    resettingInput(); //reset
  }, []);

  // ============function
  const resettingInput = useCallback(() => {
    inputTextDom.current.value = "";
    inputTextDom.current.focus();
    submitDom.current.classList.add("forbidden");
  }, []);

  return (
    <form>
      <input
        type="text"
        maxLength="35"
        placeholder="Not lazy? Add Task."
        onChange={(e) => {
          inputTextDom.current.value = e.target.value;
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
  );
}

export default TaskForm;

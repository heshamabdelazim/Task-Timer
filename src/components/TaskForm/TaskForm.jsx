import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addATask } from "../../RTK/slices/tasksSlice";

function TaskForm() {
  const dispatch = useDispatch();
  // ========useRef
  let inputTextDom = useRef(), //to Ui with add button
    submitDom = useRef(); //this is add button
  // inputText = useRef(), //to add task value

  useEffect(() => {
    inputTextDom.current.addEventListener("input", buttonValidation);
  }, []);

  // useEffect(() => {
  //   console.log("Task Form Rendered");
  // });
  // ============function
  const buttonValidation = useCallback(() => {
    //when the user start writting
    !inputTextDom.current.value
      ? submitDom.current.classList.add("forbidden")
      : submitDom.current.classList.remove("forbidden");
  }, []);

  // ============function
  const addingTask = useCallback(async (e) => {
    //adding tasks and reset after
    e.preventDefault();
    const name = inputTextDom.current.value;
    console.log(name);

    if (!name) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskName: name }),
      });
      if (!res.ok) {
        console.error("Failed to create task", await res.text());
        return;
      }
      const createdTask = await res.json();
      dispatch(addATask(createdTask));
      resettingInput(); //reset
    } catch (err) {
      console.error("Error creating task", err);
    }
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

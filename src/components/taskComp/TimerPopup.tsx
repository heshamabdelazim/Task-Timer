import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { taskObj } from "../../utilis/utilis";

interface popupProps{
  taskObj: taskObj,
  spanDom: React.MutableRefObject<undefined>
}
function TimerPopup({ taskObj, spanDom }: popupProps) {
  // const startTime = useRef(taskObj?.startTime);
  useEffect(() => {
    console.log("TimerPopup Rendered");
  });
  console.log(taskObj.startTime)
  console.log(taskObj.endTimeAfter)

  const reduceEndTime_EverySec = () => {
    //every time => the EndTime(6000 six sec) - 
    //calc the exact end time(milli-seconds) from now
    const now = new Date().getTime(); //in milliseconds
    const exactEndTime = new Date(taskObj.startTime + taskObj.endTimeAfter).getTime();
    // the exactEndTime is constant-immutable so it must include startTime that is constant-immutable also
    // console.log(now);
    
    // console.log((exactEndTime-now)/1000/60/60/60, "this is estimated end")
    // console.log(now/1000/60,"this is now")
    // console.log((taskEnd-now)/1000);
  };

  useEffect(() => {
    if (taskObj.progress) {
      const intervalId = setInterval(reduceEndTime_EverySec, 1000);
      return () => clearInterval(intervalId);
      // Cleanup function to clear the interval when the component unmounts

      //     const intervalId = setInterval(() => {
      //       const isTimesUp = timeUi.sec == 0 && timeUi.min == 0 && timeUi.hr == 0;
      //       if (isTimesUp) {
      //         // if we got {sec:0 , min:0, hr: 0} timer will stop
      //         clearInterval(intervalId); //This if timer ended in 00:00:00
      //         spanDom.current.classList.add("timesUp"); //adding animation to the finished timer
      //         // checkDom.current.classList.add("done"); //focus on the check to press
      //       } else {
      //         dispatch(upDateTimeUi());
      //         // checkDom.current.classList.remove("done"); //This if the user
      //       }
      //     }, 1000); // Update count every 1 second
    }
  }, [taskObj.progress]);

  const allTasks = useSelector((state) => state.appManager.tasks);
  const chosenTask = allTasks.find((taskObj) => taskObj.progress);
  const twoDigits = useCallback((x) => (x < 10 ? `0${x}` : x), []);
  return (
    chosenTask &&
    chosenTask.id == taskObj.id && (
      <>
        <span className="tm rounded text-center" ref={spanDom}>
          {twoDigits(chosenTask.hr)} : {twoDigits(chosenTask.min)} :{" "}
          {twoDigits(chosenTask.sec)}
        </span>
      </>
    )
  );
}
export default TimerPopup;

import { useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDeadline, makeTime, taskObj, twoDigits } from "../../utilis/utilis";
import { progressHandler, setTime } from "../../RTK/slices/tasksSlice";

interface popupProps{
  taskObj: taskObj,
  checkDom: React.MutableRefObject<undefined>
}
function TimerPopup({ taskObj, checkDom }: popupProps) {
  // let [timer, setTimer] = useState({ seconds: 0, minutes: 0, hours: 0, durationTillFinish: 1 });
  const dispatch = useDispatch();
  const redux_time = useSelector((state) => state.appManager.time);
  let { current:audio }:{current:HTMLAudioElement} = useRef();

  const reduceEndTime_EverySec = () => {
    /*
    the following graph shows time path
    (1970)============(taskStart)======(my current time goes to the end)>>>=========(exact End deadline)
    */
   const now = new Date().getTime(); // in milliseconds & chnages every sec
    const durationTillFinish = getDeadline(taskObj.startTime,taskObj.endTimeAfter) - now; //milli seconds
    //note "Modelus" => 70%60 is 10 because you delete all multiples of 60s
    const seconds = Math.floor((durationTillFinish / 1000) % 60);
    const minutes = Math.floor((durationTillFinish / 1000/60) % 60);
    const hours = Math.floor((durationTillFinish / 1000 / 60 / 60) % 60);
    dispatch(setTime({ seconds, minutes, hours, durationTillFinish }));
  };

  useEffect(() => {
    if (taskObj.progress) {
      const isTimesUp = redux_time?.durationTillFinish < 0;
      const intervalId = setInterval(reduceEndTime_EverySec, 1000);
      checkDom.current.classList.remove("done");
      if (isTimesUp) {
        console.log(isTimesUp)
        clearInterval(intervalId);
        checkDom.current.classList.add("done");
        dispatch(setTime(makeTime()));
        audio = new Audio("/src/icons/AlarmAudio.wav");
        audio.play();
        dispatch(progressHandler({...taskObj,progress:false, isDone:true}))
      }
      return () => clearInterval(intervalId);
    }
  }, [taskObj.progress, redux_time?.durationTillFinish]);

  return (
        <span className="tm rounded text-center">
          {twoDigits(redux_time?.hours)} : {twoDigits(redux_time?.minutes)} :{" "}
          {twoDigits(redux_time?.seconds)}
        </span>
  );
}
export default TimerPopup;

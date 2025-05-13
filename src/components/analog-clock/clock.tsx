import { useCallback, useEffect, useRef, useState } from "react";
import "./clock.css";
import { useSelector } from "react-redux";
import { makeTime } from "../../utilis/utilis";
import { PutHoursPositions } from "./PutHoursPositions";
import ProgressDashes from "./ProgressDashes";
import Indicators from "./Indicators";


const Clock = ({ show=false}:{show:boolean}) => {
  const time: makeTime = useSelector((state) => state.appManager.time);
  // console.log(time);
  
  //==============useState
  let [sec, setSec] = useState();
  let [min, setMin] = useState();
  let [hr, setHr] = useState();

  // =========== useEffect for clock movement
  useEffect(() => {
    // time move
    setInterval(clockMove, 1000);
  });

  //==============funciton
  const clockMove=useCallback(() =>{
    setSec(new Date().getSeconds());
    setMin(new Date().getMinutes());
    setHr(new Date().getHours());
  },[])

  const isThereTime :boolean= time.minutes>0||time.hours>0
  return (
    <section className={`clock position-relative ${show ? "showTimer" : ""}`}>
      <PutHoursPositions/>
      {isThereTime && <ProgressDashes time={time} currentMinute={min} />}
      <Indicators sec={sec} min={min} hr={hr}/>
    </section>
  );
};

export default Clock;

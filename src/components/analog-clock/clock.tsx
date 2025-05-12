import { useCallback, useEffect, useRef, useState } from "react";
import "./clock.css";
import { useSelector } from "react-redux";
import { makeTime } from "../../utilis/utilis";
import { PutHoursPositions } from "./PutHoursPositions";
import ProgressDashes from "./ProgressDashes";
import Indicators from "./Indicators";


const Clock = ({ show=false}:{show:boolean}) => {
  const time: makeTime = useSelector((state) => state.appManager.time);
  // console.log(time)
  //==============useState
  let [sec, setSec] = useState();
  let [min, setMin] = useState();
  let [hr, setHr] = useState();
  // console.log(time.minutes);

  // =========== useEffect for clock movement
/*
Hello Dev :) please read the following before modifying
-the current minute is the variable min (Suppose, it is 30)
-
*/
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
  // console.log(dashes());
  
  return (
    <section className={`clock position-relative ${show ? "showTimer" : ""}`}>
      <PutHoursPositions currentMinute />
      {time && <ProgressDashes time={time} currentMinute={min} />}
      <Indicators sec={sec} min={min} hr={hr}/>

      {/* <h5 className="position-absolute">{new Date().getFullYear()}</h5> */}
    </section>
  );
};

export default Clock;

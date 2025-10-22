import React, { useCallback, useRef } from 'react'
import { makeTime } from '../../utilis/utilis';

function ProgressDashes({ time, currentMinute }: { time: makeTime, currentMinute: number }) { 
  /*
    * 🔴this component will be rendered every second and has the dashes of the tasks
    * Here we want to generate dashes to be put on every minute
    * every minute will hold 2 dashes
    * Suppose the Current Time is (X:35 PM) and every minute has 2 dashes
    * so you have to start putting dashes right on the 35 minutes, Here
    (35*2)70 => like the following code
  */
  const { current: dashesEveryMin } = useRef(2); //every minute will hold 2 dashes
  const { current: degreeEveryDash } = useRef(360/(60*dashesEveryMin)); //(360 degree / all Dashes number) 
  // Dashes on the clock are based on (Minutes)
  const progressDashes_array = useCallback(() => {
    const hoursIntoMinutes = time.hours*60
    const dashNumbers = (hoursIntoMinutes + time.minutes)* dashesEveryMin; //if the time setted after 1:20 hr so => dashes are (60 min + 20 min)*2
    //suppose there's 3 minutes left? so the following code will make array of 6 elements => means 6 dashes later
    return Array.from({ length: dashNumbers }, (_, i) => i); //output [0,1,2,3,4,5,6]
  }, [time.minutes])
  //the previous function return array that has length which is number of dashes
  const isThereTime: number = time.minutes || time.hours;
  
  if (isThereTime) {
    //startTime =currentMinute 
    // return jsx
    return progressDashes_array().map((dashNum) => {

      const aDash_number = ((currentMinute * dashesEveryMin) + dashNum); //dashNum will start from 0 then 1 then 2 ...

      // -the following code is the rotating via CSS (eg: (the dash starts in the 70) *2= 140deg) => rotate(140deg) and so on because dashNum changes every time
      return (<span className='dash' style={{ transform: `rotate(${aDash_number*degreeEveryDash}deg)` }} key={dashNum}>
        <b
              id={String(dashNum)}
              style={{
                transform: `rotate(90deg)`,
                 display: "inline-block",
               }}
             />
      </span>
      )
    })
  }
}

export default ProgressDashes
import React, { useCallback, useRef } from 'react'
import { makeTime } from '../../utilis/utilis';

function ProgressDashes({ time, currentMinute }: { time: makeTime, currentMinute: number }) {
// this component will be rendered every second and has the dashes of the tasks  
  const { current: dashesEveryMin } = useRef(2); //every minute will hold 2 dashes
  const { current: degreeEveryDash } = useRef(360/(60*dashesEveryMin)); //(360 degree / all Dashes number) 
  // We will make dashes on the clock based on (Minutes)
  const progressDashes_array = useCallback(() => {
    const hoursIntoMinutes = time.hours*60
    const dashesNumbers = (hoursIntoMinutes + time.minutes)* dashesEveryMin; //if the time setted after 1:20 hr so => dashes are (60 min + 20 min)*2
    //suppose there's 3 minutes left so the following code will make array of 6 elements => means 6 dashes later
    return Array.from({ length: dashesNumbers }, (_, i) => i); //output [0,1,2,3,4,5,6]
  }, [time.minutes])
  //this progressDashes_array => will represents the dashes to map (DOMs as dashes)
  const isThereTime:number = time.minutes || time.hours;
  if (isThereTime) {
    //startTime =currentMinute 
    return progressDashes_array().map((dashNum) => {
      /*
        Suppose the (current time minute in the clock) is 35 and every minute has 2 dashes  
        so you have to start dashes from the dash number (35*2)70 => like the following code
      */
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
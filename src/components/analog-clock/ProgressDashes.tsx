import React, { useCallback, useRef } from 'react'
import { makeTime } from '../../utilis/utilis';
import { useSelector } from 'react-redux';

function ProgressDashes({time,currentMinute}:{time:makeTime, currentMinute:number}) {
  const { current: dashesEveryMin } = useRef(2); //every minute will hold 2 dashes
  const { current: degreeEveryDash } = useRef(360/(60*dashesEveryMin)); //(360 degree / all Dashes number) 
  
  const progressDashes_array = useCallback(() => {
    const hoursIntoMinutes = time.hours*60
    const dashesNumbers = (hoursIntoMinutes + time.minutes)* dashesEveryMin;
    //suppose there's 3 minutes left so the following code will make array of 6 elements => means 6 dashes later
    return Array.from({ length: dashesNumbers }, (_, i) => i); //output [0,1,2,3,4,5,6]
  }, [time.minutes])
  // console.log("outside");
  
  const isThereTime:number = time.minutes || time.hours;
  if (isThereTime) {
    // console.log(isThereTime,"inside");
    //startTime =currentMinute 
    return progressDashes_array().map((dashNum) => {
      const aDash_number = ((currentMinute * dashesEveryMin) + dashNum);
      /*
      -suppose current minute is 35 so it passed 35 and every minute has 2 dashes so now you passed 70 dashs and stand there and you can start
      that Docs of the prevoius code
      -the following code is converting the dash 70 into 210 degree to rotate in css
      */
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
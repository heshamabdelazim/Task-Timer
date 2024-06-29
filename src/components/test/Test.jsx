import React, { useState, useEffect } from "react";

function CountdownComponent({ initialTime = { sec: 6, min: 0, hr: 0 } }) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Decrement time remaining
      setTimeRemaining((prevTime) => {
        let newSec = prevTime.sec - 1;
        let newMin = prevTime.min;
        let newHr = prevTime.hr;

        // Handle overflow from 60 seconds to 59 minutes
        if (newSec === -1) {
          newSec = 59;
          newMin--;
        }

        // Handle end of countdown (optional)
        if (newHr === 0 && newMin === 0 && newSec === 0) {
          clearInterval(intervalId);
          // Handle countdown completion (e.g., display message)
        }

        return { sec: newSec, min: newMin, hr: newHr };
      });
    }, 1000); // Update every 1 second

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const formattedTime = `${timeRemaining.hr
    .toString()
    .padStart(2, "0")}:${timeRemaining.min
    .toString()
    .padStart(2, "0")}:${timeRemaining.sec.toString().padStart(2, "0")}`;

  return <div>Countdown: {formattedTime}</div>;
}

export default CountdownComponent;

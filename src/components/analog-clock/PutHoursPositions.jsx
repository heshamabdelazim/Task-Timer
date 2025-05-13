import React, { useRef } from "react";

export const PutHoursPositions = React.memo(() => {
  let { current: hours } = useRef([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  return hours.map((hour, ind) => (
    <span
      key={ind}
      style={{ transform: `rotate(${hour * 30}deg)` }}
      className="hr"
    >
      <b
        style={{
          transform: `rotate(-${hour * 30}deg)`,
          display: "inline-block", //why this tag <b>? because you need to rotate the number itself
        }}
      >
        {hour}
      </b>
    </span>
  ));
});
PutHoursPositions.displayName = "PutHoursPositions";
//this line important to avoid red line appears by the ESLint

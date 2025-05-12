import React, { useRef } from 'react'

export function PutHoursPositions() {
    let {current:hours} = useRef(() => {
    const array = [];
    for (let i = 1; i <= 12; i++) {
      array.push(i);
    }
    return array;
  });
  return hours().map((hour, ind) =>  (
      <span key={ind} style={{ transform: `rotate(${hour * 30}deg)` }}>
        <b
          style={{
            transform: `rotate(-${hour * 30}deg)`,
            display: "inline-block", //why this tag <b>? because you need to rotate the number itself
          }}
        >
          {hour}
        </b>
      </span>
    )
      )
}

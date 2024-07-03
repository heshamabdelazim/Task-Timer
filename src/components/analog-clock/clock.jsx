import { useEffect, useRef, useState } from "react";
import "./clock.css";

const Clock = ({ show, time }) => {
  //==============useState
  let [sec, setSec] = useState();
  let [min, setMin] = useState();
  let [hr, setHr] = useState();

  //==============useRef
  let numberOfDashes = useRef(120); // this numbers of dashes around all clocks
  let dashesEveryHr = useRef(numberOfDashes.current / 12); //the clock has 12 hours and I have 120 dashes around so every clock has 10 dashes
  let dashesEveryMin = useRef(dashesEveryHr.current / 5); // every hour has 10 dashes so 5 Minutes? every minute has 2 dashes
  let hours = useRef(() => {
    const array = [];
    for (let i = 1; i <= 12; i++) {
      array.push(i);
    }
    return array;
  });
  let dashes = useRef(() => {
    const array = [];
    for (let i = 1; i <= numberOfDashes.current; i++) {
      array.push(i);
    }
    return array;
  });
  // console.log(dashesEveryHr.current);

  // =========== useEffect for clock movement
  useEffect(() => {
    // time move
    setInterval(clockMove, 1000);
  });

  //==============funciton
  function clockMove() {
    setSec(new Date().getSeconds());
    setMin(new Date().getMinutes());
    setHr(new Date().getHours());
  }

  //==============funciton
  const puttingHours = hours.current().map((hour, ind) => {
    return (
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
    );
  });

  //==============funciton
  const puttingDashes =
    time &&
    dashes.current().map((dash, ind) => {
      const dashesStart = min * dashesEveryMin.current; //every minute has 2 dashes so suppose current minute is 30 so number of dashes is 30*2
      const minutesLength = min + time.min + 1; //example: current min is 30 and user choosed 5 min so the length will be 36
      const dashesEnd = minutesLength * dashesEveryMin.current; //every minute has 2 dashes so 36 minute has 72 dashes

      if (dash >= dashesStart && dash <= dashesEnd) {
        return (
          <span
            key={ind}
            style={{
              transform: `rotate(${dash * (360 / numberOfDashes.current)}deg)`,
            }}
            className="dash"
          >
            <b
              id={dash}
              style={{
                transform: `rotate(90deg)`,
                display: "inline-block",
              }}
            />
          </span>
        );
      }
    });

  return (
    <section className={`clock position-relative ${show ? "showTimer" : ""}`}>
      {puttingHours}
      {time && <div className="dashes">{puttingDashes && puttingDashes}</div>}
      <div className="indicator">
        <span
          style={{
            transform: ` rotate(${((hr * 60 + min) * 360) / 720}deg)`,
          }}
          // This mathmatic code is converting hr to min and adding rest of minutes then use it to rotate out of 360 deg
          // You need 720 min, to rotate one turn 360 deg
          className="hr"
        />
        <span
          style={{
            transform: ` rotate(${min * 6}deg)`,
          }}
          className="min"
        />
        <span
          style={{
            transform: ` rotate(${sec * 6}deg)`,
          }}
          className="sec"
        />
      </div>

      {/* <h5 className="position-absolute">{new Date().getFullYear()}</h5> */}
    </section>
  );
};

export default Clock;

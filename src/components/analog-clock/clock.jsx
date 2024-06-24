import { useEffect, useRef, useState } from "react";
import "./clock.css";

const Clock = ({ show }) => {
  const jsxArray = [];
  // ========useState
  let [hours, setHours] = useState();

  // ========useEffect
  useEffect(() => {
    let jsxArray = [];
    for (let i = 1; i <= 12; i++) {
      jsxArray.push(
        <span style={{ transform: `rotate(${i * 30}deg)` }}>
          <b
            style={{
              transform: `rotate(-${i * 30}deg)`,
              display: "inline-block", //why this tag <b>? because you need to rotate the number itself
            }}
          >
            {i}
          </b>
        </span>
      );
      i == 12 && setHours(jsxArray);
    }
    // why we use Effect ? because the loop alawys work if any renderes so we stop it
    // Now we got array includes 12 span
  }, []);

  // ===========second useEffect for clock movement
  useEffect(() => {
    // time move
    setInterval(clockMove, 1000);
  });

  // =========useState
  let [sec, setSec] = useState();
  let [min, setMin] = useState();
  let [hr, setHr] = useState();

  // =========useRef

  //==============funciton
  function clockMove() {
    setSec(new Date().getSeconds());
    setMin(new Date().getMinutes());
    setHr(new Date().getHours());
  }
  // console.log(sec, "sec");
  // console.log(min, "min");
  // console.log(hr, "hr");
  return (
    <section className={`clock position-relative ${show ? "showTimer" : ""}`}>
      {hours}
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

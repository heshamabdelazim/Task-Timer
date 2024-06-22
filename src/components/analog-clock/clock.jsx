import { useEffect, useState } from "react";
import "./clock.css";

const Clock = () => {
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
  }, []);
  // why we use Effect ? because the loop alawys work if any renderes so we stop it
  // Now we got array includes 12 span
  return <section className="clock position-absolute">{hours}</section>;
};

export default Clock;

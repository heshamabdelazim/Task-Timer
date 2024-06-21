import { useRef } from "react";
import "./clock.css";

const Clock = () => {
  const jsxArray = useRef([]);
  for (let i = 1; i <= 12; i++) {
    jsxArray.current.push(
      <span key={i} style={{ transform: `rotate(${i * 30}deg)` }}>
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
  }
  // Now we got array includes 12 span
  console.log(jsxArray.current);
  return (
    <section className="clock position-absolute">{jsxArray.current}</section>
  );
};

export default Clock;

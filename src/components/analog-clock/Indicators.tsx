import React from 'react'

function Indicators({sec,min,hr}:{sec:number,min:number,hr:number}) {
  return (
    <div id="indicator">
        <span
          style={{
            transform: ` rotate(${((hr * 60 + min) * 360) / 720}deg)`,
          }}
          // This mathmatic code is converting hr to min and adding rest of minutes then use it to rotate out of 360 deg
          // You need 720 min, to rotate one turn 360 deg
          id="hr"
        />
        <span
          style={{
            transform: ` rotate(${min * 6}deg)`,
          }}
          id="min"
        />
        <span
          style={{
            transform: ` rotate(${sec * 6}deg)`,
          }}
          id="sec"
        />
      </div>
  )
}

export default Indicators

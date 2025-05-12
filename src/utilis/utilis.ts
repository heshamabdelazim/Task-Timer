export const calcEndTimeAfter = (min: number, hr: number): bigint => {
  //1hr=>60 min=>60 sec=>1000
  const countHr_inMilliSec = hr * 60 * 60 * 1000;
  const countMin_inMilliSec = min * 60 * 1000;

  const theEndTimeAfter = BigInt(countHr_inMilliSec + countMin_inMilliSec); //in milliseconds
  return theEndTimeAfter;
};

export const twoDigits = (x) => (x < 10 ? `0${x}` : x);

export const makeTime: funcTime = (sec = 0, min = 0, hr = 0, duration = 0) => {
  return {
    seconds: sec,
    minutes: min,
    hours: hr,
    durationTillFinish: duration,
  };
};

export const getDeadline = (start: number, endAfter: number): number => {
  return new Date(start + endAfter).getTime();
};
//=============Interfaces

export interface taskObj {
  readonly id: number;
  taskName: String;
  startTime: number;
  endTimeAfter: number;
  progress: boolean;
  isDone: boolean;
}

export interface makeTime {
  seconds: number;
  minutes: number;
  hours: number;
  durationTillFinish: number;
}

interface funcTime {
  (se: number, min: number, hr: number, duration: number): makeTime;
}

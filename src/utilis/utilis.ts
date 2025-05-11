export const calcEndTimeAfter = (min: number, hr: number): bigint => {
  //1hr=>60 min=>60 sec=>1000
  const countHr_inMilliSec = hr * 60 * 60 * 1000;
  const countMin_inMilliSec = min * 60 * 1000;

  const theEndTimeAfter = BigInt(countHr_inMilliSec + countMin_inMilliSec); //in milliseconds
  return theEndTimeAfter;
};

export interface taskObj {
  readonly id: number;
  taskName: String;
  startTime: number;
  endTimeAfter: number;
  progress: boolean;
  isDone: boolean;
}

export const twoDigits = (x) => (x < 10 ? `0${x}` : x);

export const defaultTime = { seconds: 0, minutes: 0, hours: 0 };

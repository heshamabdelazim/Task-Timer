import { taskObj } from "./utilis";
let i = 0;
interface optionsArr {
  id: number;
  value: String;
  text: String;
  method: (arr: taskObj[]) => taskObj[];
}

export const sortingOptionsArr: optionsArr[] = [
  { id: i++, value: "default", text: "Default", method: sortDefault },
  { id: i++, value: "az", text: "A-Z", method: sortAZ },
  { id: i++, value: "za", text: "Z-A", method: sortZA },
  { id: i++, value: "done", text: "Done", method: sortDone },
  { id: i++, value: "notDone", text: "Not Done", method: sortNotDone },
  //add more same opjects for more (sorts) and create new methods
];

export function sortDefault(arr): taskObj[] {
  // start sort from id=0
  // inputs is [5,3,2,4,1]
  // output is [1,2,3,4,5]
  let theSmallest = arr[0].id;
  for (let i = 0; i < arr.length; i++) {
    arr.map((ele) => {
      if (theSmallest > ele.id) {
        theSmallest = ele.id;
      }
    });
    arr[i].id = theSmallest;
    theSmallest = arr[i + 1]?.id;
  }
  return arr;
}

//  ==============
export function sortAZ(arr: taskObj[]): taskObj[] {
  console.log("this is sortAZ");
  return arr;
}

//  ==============
export function sortZA(arr: taskObj[]): taskObj[] {
  console.log("this is sortZA");
  return arr;
}

//  ==============
export function sortDone(arr: taskObj[]): taskObj[] {
  return arr;
}

//  ==============
export function sortNotDone(arr: taskObj[]): taskObj[] {
  return arr;
}

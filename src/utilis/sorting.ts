import { taskObj } from "./utilis";
let increase = 0;
interface optionsArr {
  id: number;
  value: String;
  text: String;
  method: (arr: taskObj[]) => taskObj[];
}

export const sortingOptionsArr: optionsArr[] = [
  { id: increase++, value: "default", text: "Default", method: sortDefault },
  { id: increase++, value: "az", text: "A-Z", method: sortAZ },
  { id: increase++, value: "za", text: "Z-A", method: sortZA },
  { id: increase++, value: "done", text: "Done", method: sortDone },
  { id: increase++, value: "notDone", text: "Not Done", method: sortNotDone },
  //add more same opjects for more (sorts) and create new methods below
];

// export function sortDefault(arr): taskObj[] {
//   //(selection sort algorithm) => find the smallest every time and swap its place
//   // inputs is [{id:5},{id:3},{id:2},{id:4},{id:1}]
//   // output is [{id:1},{id:2},{id:3},{id:4},{id:5}]
//   //traverse
//   for (let i = 0; i < arr.length; i++) {
//     let smallestInd = i;
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[j].id < arr[smallestInd].id) {
//         smallestInd = j;
//       }
//     }
//     let temp = arr[i];
//     // smallestInd = 4
//     arr[i] = arr[smallestInd];
//     arr[smallestInd] = temp;
//   }
//   console.log(arr);
//   return arr; //O(N^2)
// }

export function sortDefault(arr): taskObj[] {
  //(selection sort algorithm) => find the smallest every time and swap its place
  // inputs is [{id:5},{id:3},{id:2},{id:4},{id:1}]
  // output is [{id:1},{id:2},{id:3},{id:4},{id:5}]

  const finalArr: taskObj[] = [];
  let indexMove: number = 1;
  let smallest = { obj: arr[0], index: 0 };
  while (arr.length > 0) {
    //as long as there's element in the arr, the loop traverse inside
    const isSmaller = smallest.obj.id > arr[indexMove].id;
    if (isSmaller) {
      smallest = { obj: arr[indexMove], index: indexMove };
    }
    const isLastStep = indexMove === arr.length - 1;
    if (isLastStep) {
      console.log(smallest.obj);

      finalArr.push(smallest.obj);
      arr.splice(smallest.index, 1); //the array reduced
      indexMove = 0; //reset to loop again
      smallest = { obj: arr[0], index: 0 };
    } else {
      indexMove++;
    }
  }
  console.log(finalArr);
  return finalArr;
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
  const sorted = arr.slice().sort((a, b) => {
    return b.isDone - a.isDone;
  });
  console.log(sorted);
  return sorted;
}

//  ==============
export function sortNotDone(arr: taskObj[]): taskObj[] {
  const sorted = arr.sort((a, b) => {
    return a.isDone - b.isDone;
  });
  console.log(sorted);
  return sorted;
}

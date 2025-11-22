// Popped Element Function
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const poppedElement = function (arr) {
  arr.length = arr.length - 1;
  return arr;
};
poppedElement(arr);
console.log("Array after pop:", arr);

let newArr = [];
for (let i = 0; i < arr.length - 1; i++) {
  newArr[i] = arr[i];
}
console.log("Array after manual pop:", newArr);

function removeLastElement(arr, callback) {
  let newArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    newArr[i] = arr[i];
  }
  callback(newArr);
}
function printArray(arr) {
  console.log("Popped elements with HOF:", newArr);
}

removeLastElement(arr, printArray);

// Pushed Element Function
const pushedElement1 = function (arr, element) {
  arr[arr.length] = element;
  // return arr;
};
pushedElement1(arr, 10);
console.log("Array after push:", arr);

const pushedElement2 = function (arr, element) {
  for (let i = arr.length; i < arr.length + 1; i++) {
    arr[i] = element;
    break;
  }
};
pushedElement2(arr, 16);
console.log("Array after second push:", arr);
// High-Order Function for Push
const pushElement = function (arr, element, callback) {
  callback(arr, element);
};
const addElement = function (arr, element) {
  arr[arr.length] = element;
};

pushElement(arr, "newArray", addElement);
console.log("\n");
console.log("Array after HOF Push:", arr);

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

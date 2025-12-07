// forEach method
let text = "";
const fruits = ["apple", "mango", "banana"];
fruits.forEach(myFunction);
// document.getElementById("demo").innerHTML = text;
function myFunction(item, index) {
  text += index + ": " + item + "<br>";
}

// someRandomNumbers.forEach(function (value, index, arr) {
//   console.log("forEach", value, index, arr);
// });

// const forEachCallback = function (value, index, arr) {
//   console.log("forEach", value, index);
// };
// someRandomNumbers.forEach(forEachCallback);

// High order functions and callbacks

const higherOrderFunction = function (callback) {
  callback("I'm newbie in JS"); // calling that function...
};

//  function that will Callback later...
const callbackFunction = function (log) {
  console.log("LOG:", log);
};

higherOrderFunction(callbackFunction);

let numbers = [5, 4, 3, 2, 1];
let factorial = 1;
numbers.forEach(function (num, index, array) {
  if (index < array.length - 1) {
    console.log(num, index, array);
  }
  factorial = factorial * num;
});
console.log("Factorial of 5 is:" + factorial);

let products = ["shampoo", "cream", "perfume"]; // length: 3 index:0-1-2
for (let i = 0; i < products.length; i++) {
  callback(products[i]);
}
function callback(n) {
  console.log("Prod:", n);
}
products.forEach(function (n) {
  console.log("Products:", n);
});

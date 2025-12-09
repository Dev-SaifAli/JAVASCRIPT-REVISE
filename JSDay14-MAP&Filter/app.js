// MAP Method returns a new array by calling a function for each element in an array.
const values = [12, 24, 36, 48, 60];
const squareRoot = values.map(Math.sqrt);
console.log(squareRoot);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const callback1 = function (value, index, number) {
  console.log("CALLED", value, index, number);
  const multiple = value * 2;
  return multiple;
};
const mappedArray1 = numbers.map(callback1);
console.log("mappedArray1", mappedArray1);

const squaredNumbers = numbers.map(function (value) {
  return value * value;
});
console.log(squaredNumbers);

function add(callback, a, b) {
  callback(a, b);
}
function callbackFunc(x, y) {
  let add = x + y;
  console.log(add);
}
add(callbackFunc, 2, 4);

const celsiusTemp = [0, 10, 20, 30];
const fahrenheitTemp = celsiusTemp.map(function (value) {
  return value * 1.8 + 32;
});
console.log("fahrenheitTemp:", fahrenheitTemp);
{
  const numbers = [1, 2, 3];
  // This is the original callback function
  function square(value) {
    return value * value;
  }

  function customMap(arr, callback) {
    let newArray = [];

    // Manual loop over the input array(arr)

    for (let i = 0; i < arr.length; i++) {
      // This is the critical step
      // 1. Get the current element's value
      const currentValue = arr[i];

      // 2. Execute the callback function, PASSING the current value as an argument:
      const transformedValue = callback(currentValue);

      // 3. Add result to the new array
      newArray.push(transformedValue);
    }
    return newArray;
  }

  const squaredNumbers = customMap(numbers, square);
  console.log("\n");
  console.log(squaredNumbers);
}

{
  const numbers = [10, 20, 30, 40, 50];
  const callback2 = function (value) {
    return value / 5;
  };
  const mappedArray2 = numbers.map(callback2);
  console.log(mappedArray2);
}

// FILTER
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const filterCallback = function (value, index, number) {
  console.log("CALLED", value, index, number);
  const isEven = value % 2 === 0;
  return isEven;
};
const filteredArray = numbers2.filter(filterCallback);
console.log("filteredArray", filteredArray);
console.log("\n");
// forEach - Updating UI elements - Calling an API for each item
const products = ["shampoo", "soap", "lotion"];
products.forEach((item) => {
  console.log("Sending product to UI", item);
});

// map - Transform every item and create a new array
// Take each element - apply a function - returns a new array
const prices = [120, 250, 300];
const discountedPrices = prices.map((price) => price - price * 0.02);
console.log(discountedPrices);

// filter - keep only items that pass a test
// Check each element and return only those that pass the test
const users = [
  { name: "Ali", active: true },
  {
    name: "Amina",
    active: false,
  },
  {
    name: "Laiba",
    active: true,
  },
];
const activeUsers = users.filter((user) => user.active);
console.log(activeUsers);

const numbers3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const filterOddCallback = function (value) {
  console.log(value);
  const odd = value % 2 === 0;
  return odd;
};
console.log("\n");
const oddNumbers = numbers3.filter(filterOddCallback);
console.log(oddNumbers);

const filterGreaterThanFive = function (value) {
  const greater = value > 5;
  return greater;
};
const greaterValues = numbers3.filter(filterGreaterThanFive);
console.log(greaterValues);

const words = ["banana", "cat", "dog", "potato", "gym"];
const filterLongWords = function (value, index, words) {
  console.log("CALLED", value, index, words);
  console.log(value.length > 3, "\n");
  return value.length > 3;
};
const longWords = words.filter(filterLongWords);
console.log(longWords);

const numbers4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const filterSmallWords = function (value) {
  console.log("Called", value);
  return value <= 5;
};
const smallWords = numbers4.filter(filterSmallWords);
console.log(smallWords);

const people = [
  { name: "Ali", age: 15 },
  { name: "Saif", age: 22 },
  { name: "Rida", age: 18 },
  { name: "Eman", age: 19 },
];

// filter method runs function for each item in the array and then check the result of the condition apply on that element.

const filterAdults = function (people) {
  console.log(people);
  return people.age >= 18;
};

const adultPeople = people.filter(filterAdults);
console.log(adultPeople);

const dataTypes = [0, "string", true, undefined, null, false];
const filterTruthy = function (value) {
  console.log(value);
  
  console.log(Boolean(value));
  return Boolean(value);
};
const truthyValues = dataTypes.filter(filterTruthy);
console.log(truthyValues);

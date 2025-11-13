// 1
function HOF(callback) {
  callback();
}
function loggerForCallback() {
  console.log("Callback goes here");
}
HOF(loggerForCallback);

// 2
function greeting(callback) {
  console.log("I'm about to meet someone...");
  callback(sayHello);
}
function sayHello() {
  console.log("Hello Amina");
}
greeting(sayHello);

// 3
function farewell(callback) {
  console.log("I'm about to say goodbye...");
  callback();
}
function sayGoodbye() {
  console.log("Goodbye, Saif!");
}
farewell(sayGoodbye);

// 4
function checkWeather(callback) {
  console.log("Checking the weather...");
  callback(displayWeather);
}
function displayWeather() {
  console.log("It's sunny today!");
}
checkWeather(displayWeather);

// 5
function prepareFood(callback) {
  console.log("Starting to cook...");
  callback(serveFood);
}
function serveFood() {
  console.log("Dinner is ready, Sir!");
}
prepareFood(serveFood);

// 6
function startExercise(callback) {
  console.log("Getting ready for exercise...");
  callback(doPushUps);
}
function doPushUps() {
  console.log("Doing 20 push-ups!");
}
startExercise(doPushUps);

// 7
function startReading(callback) {
  callback();
}
function readChapter() {
  console.log("Reading the first chapter...");
}
startReading(readChapter);

// 8
function startReading(nextStep) {
  console.log("Picking up a book...");
  nextStep(readSecondChapter);
}
function readSecondChapter() {
  console.log("Reading the second chapter...");
}
startReading(readSecondChapter);

// 9
function startReading(action) {
  console.log("Picking up a book...");
  action();
}
function bookmarkPage() {
  console.log("Bookmarking the current page.");
}
startReading(bookmarkPage);

// 10
function startReading(task) {
  console.log("Picking up a book");
  task();
}

function task() {
  console.log("Read for 20 mins!");
}
startReading(task);

// 11
function startReading(activity) {
  console.log("Picking up a book...");
  activity();
}
function writingNotes() {
  console.log("Writing important notes from the chapter!");
}
startReading(writingNotes);

// 12
function calculate(a, b, operation) {
  console.log("Performing an operation...");
  return operation(a, b);
}
function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
console.log(calculate(2, 1, add));
console.log(calculate(20, 10, subtract));

function calculate(a, b, operation) {
  console.log("Performing an operation...");
  return operation(a, b);
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  return x / y;
}
console.log(calculate(20, 10, multiply));
console.log(calculate(20, 10, divide));

// 13
function calculate(a, b, operation) {
  console.log("Performing the operation...");
  return operation(a, b);
}
function max(x, y) {
  return x > y;
}
function min(x, y) {
  return x < y;
}
console.log(calculate(8, 12, max));
console.log(calculate(8, 12, min));

// 14
function calculate(a, b, operation) {
  console.log("Performing the operation...");
  return operation(a, b);
}
function power(x, y) {
  console.log("power function fires...");
  return x ** y;
}
function modulus(x, y) {
  return x % y;
}
console.log(calculate(2, 3, power));
console.log(calculate(2, 3, modulus));

// 15
function manipulateStrings(str1, str2, operation) {
  console.log("Performing the operation...");
  return operation(str1, str2); // callback-function calls
}
function concatenate(a, b) {
  return a + b;
}

function reverseConcatenate(a, b) {
  return b + a;
}
console.log(manipulateStrings("hello", "world", concatenate));
console.log(manipulateStrings("hello", "world", reverseConcatenate));
// 'A callback function("concatenate") is a function that is passed as an argument to another function("manipulateStrings") and is executed after the outer function has completed it's task.'

// Average of three numbers
function averageOfThreeNumbers(num1, num2, num3, callback) {
  const sum = num1 + num2 + num3;
  const avg = sum / 3;
  callback(avg);
  // return avg;
}
averageOfThreeNumbers(10, 20, 30, function (avg) {
  console.log("Average", avg);
});

function averageOfThreeNumbers(num1, num2, num3, callback) {
  const sum = num1 + num2 + num3;
  const avg = sum / 3;
  callback(avg);
  // return avg;
}
function logAverage(avg) {
  console.log("Average", avg);
}
averageOfThreeNumbers(10, 20, 30, logAverage);

function averageOfThree(num1, num2, num3, callback) {
  const sum = num1 + num2 + num3;
  const avg = sum / 3;
  callback(avg); // This is the function that will be call later.
}
averageOfThree(5, 10, 15, function (average) {
  console.log("The average is:", average);
});

function showSomethingHof(callback) {
  callback("Hello something");
}
function showSomethingCallback(msg) {
  console.log(msg);
}
showSomethingHof(showSomethingCallback);

function showSomethingHofMultiply(callback) {
  return callback(5, 510);
}
function multiplyNumbers(a, b) {
  console.log(a * b);
}
showSomethingHofMultiply(multiplyNumbers);

function getUserInputHoF(callback) {
  let userName = "Saif";
  callback(userName);
}
function welcomeUser(name) {
  console.log(`Welcome ${name}`);
}
getUserInputHoF(welcomeUser);

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

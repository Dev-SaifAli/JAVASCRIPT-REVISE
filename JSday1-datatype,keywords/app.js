// Data types in JS
/*
1. String
2. Number
3. Bigint
4. Boolean
5. Object
6. Undefined
7. Null
8. Symbol
*/

// Strings
let color = "Yellow";
let lastName = "Ali";
console.log(color, lastName);

// Number
let length = 16;
let weight = 7.5;
console.log(length, weight);

// Bigint
let x = 123456789012345678912345n;
let y = BigInt(1234567890123456789);
console.log(x, y);

// Boolean
let a = true;
let b = false;
console.log(a, b);

// Object
const person = { firstName: "Saif", lastName: "Ali" };
console.log(person, person.firstName + " " + person.lastName);

// Array Object
const cars = [
  "Suzuki Alto",
  "Toyota Corolla",
  "Honda City & Civic",
  "Suzuki Cultus",
];

// Date Object
const date = new Date("2025-11-05");
console.log(date);

// Undefined
let s;
let m;
console.log(s, m);

// Null
let q = null;
let w = null;
console.log(q, w);

// Symbol
const e = Symbol();
const r = Symbol();
console.log(e, r);

// -------------------------------------------------------

// Note: When adding a number and a string, Javascript will treat the number as a string.
let u = 16 + "Alto";
console.log(u);

let i = "Civic" + 30;
console.log(i);

let o = 16 + 4 + "Haval";
console.log(o);

let p = "Corolla" + 15 + 5;
console.log(p); // first operand(the quantity on which operation is to be done.✅) is a string, all operands are treated as strings.

// Keywords
// 1- var
// 2- let
// 3- const

const todoList = "JS Revision, scrimba, freecodecamp, css clone";
console.log("Initial To-do List:", todoList);

let taskCompleted = false;
console.log(taskCompleted);

let completedTask = todoList;
taskCompleted = true;
console.log("Completed Task:", completedTask);
console.log("Task Completed:", taskCompleted);

function add(a, b) {
  return a + b;
}

const result = add(15, 5);
console.log(result);

console.log(`hi
    my name is saif i am 22 years old`);

console.log(typeof +null); // + operator converts its operand into a number. so null converted into 0 and typeof 0 is a number.
console.log(typeof null);

let d;
console.log(d);

let g = null;
console.log(g);

var age;
age = 22;
var age;
age = 50;
console.log(age);

let gender;
gender = "Female";
gender = "male ";
console.log(gender);

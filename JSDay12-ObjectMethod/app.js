// Object Methods
const personOne = {
  userName: "Amina",
  age: 22,
  getUserDetails: function () {
    return `${this.userName} is ${this.age} years old.`;
  },
  toString: function () {
    return `${this.userName} is ${this.age} years old.`;
  },
};
console.log(personOne);
console.log("String", personOne.toString());
console.log(typeof personOne.toString());
const newObject = Object();
console.log({}, Object());
console.log([]);
console.log("construct", {}.constructor, Object());
console.log([].constructor());
// Examples
// 1....
let obj1 = Object();
console.log(obj1);

// 2...
let obj2 = Object();
(obj2.name = "Saif"),
  (obj2.age = 22),
  (obj2.greet = function () {
    return `Hello, my name is ${this.name} and my age is ${this.age}`;
  });
console.log(obj2);
console.log(obj2.greet());

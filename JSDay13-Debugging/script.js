// Globally

var globalVar = "I'm a global var variable";
var a = "I'm a global var variable";
let globalLet = "I'm a global let variable";
const globalConst = "I'm a global const variable";
console.log(globalVar);
console.log(globalLet);
console.log(globalConst);

function scopeTest() {
  var varVariable = "I am a var variable";
  let letVariable = "I am a let variable";
  const constVariable = "I am a const variable";
  console.log(varVariable);
  console.log(letVariable);
  console.log(constVariable);
}
scopeTest();
// Outside the function, we cannot access these variables...
// console.log(varVariable);
// console.log(letVariable);
// console.log(constVariable);

// Block scope variable
{
  var functionScopeVar = "I am function scoped!";
  let blockScopeLet = "I am block scoped!";
  const blockScopeConst = "I am also block scoped!";
  console.log(functionScopeVar);
  console.log(blockScopeLet);
  console.log(blockScopeConst);
}
console.log("\n");
// console.log("var", functionScopeVar);
// console.log(blockScopeLet);
// console.log(blockScopeConst);

// Practice
var b = "Hello";
var c = "Good Night";
console.log("\n");
console.log(a);
console.log(b);
console.log(c);
var a = 22;
var b = "Hello";
var c = "Good Night ";

console.log(a);
console.log(b);
console.log(c);
{
  var a = "Inside block";
  var b = "Inside block";
  var c = "Inside block";
  console.log(a);
  console.log(b);
  console.log(c);
}
console.log("\n");
console.log("\n");

function demonstrateVariables() {
  // Using var
  var varVariable = "I am a var variable";
  console.log(varVariable);

  // Using let
  let letVariable = "I am a let variable";
  console.log(letVariable);

  // Using const
  const constVariable = "I am a const variable";
  console.log(constVariable);
}
demonstrateVariables();
console.log("\n");

function testFunction() {
  const a = "HELLO";
  let b = "hello WORLD";
  console.log(a, b);

  for (let i = 0; i < 5; i++) {
    const a = "Bye";
    let b = "Bye WORLD";
    console.log(i, a, b);
  }
}
testFunction();

function testScope(){
    let x = "local";
    if(true){
        let x = "block";
        console.log(x);
    }
    console.log(x);
}
testScope();



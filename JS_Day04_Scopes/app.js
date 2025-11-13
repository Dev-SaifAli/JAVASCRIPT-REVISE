// <=========== Global Scope ===========>
var a = 10;
var a = 55;
a = 40;
let b = 20;
//  let b Cannot re-declare block scope variable.
b = 50;
const c = 30;
// c = 69; Type-error Assignment to constant variable.
console.log(a);
console.log(b);
console.log(c);

{
  console.log(a);
  console.log(b);
  console.log(c);
}

function globalScope() {
  var a = 44;
  b = 66;
  console.log(a); // 44
  console.log(b); // 66
  console.log(c); // 30
}
globalScope();

// <============ LOCAL OR BLOCK VARIABLE ============>
{
  var a = 10;
  var a = 55;
  a = 40;
  let b = 20;
  // let b
  b = 50;
  const c = 30;
  // c = 69
  console.log(a); // 40
  console.log(b); // 50
  console.log(c); // 30
}

var a = "i am outside block";
console.log(a);
console.log(b);
console.log(c);

function localScope() {
  var a = "i am in function";
  console.log(a);
  console.log(b);
  console.log(c);
}
localScope();

var a = "i am outside function";
console.log(a);
localScope();

var a = " i am end of function";
console.log(a);
console.log(b);
console.log(c);

function add() {
  let result = 295;
  console.log(result);
}

// console.log(result - outside - add);
add();

// <========== FUNCTION SCOPE ==========>
function testVar() {
  var x = 10;
  var x = 100;
  x = 300;
  console.log(x);
}
testVar();

// The setTimeout() is executed only once.

const myTimeout = setTimeout(myGreeting, 5000); // calls the function after a number of milliseconds.
function myGreeting() {
  document.getElementById("demo").innerHTML = "Happy Birthday!";
}

function myStopFunction() {
  clearTimeout(myTimeout);
}
// let timeout;
function myFunction() {
  timeout = setTimeout(alertFunc, 3000);
}
function alertFunc() {
  alert("Hello");
}
let x = document.getElementById("text");
setTimeout(function () {
  x.value = "2 seconds";
}, 2000);
setTimeout(function () {
  x.value = "4 seconds";
}, 4000);
setTimeout(function () {
  x.value = "6 seconds";
}, 6000);

let counter = 0;
let timeout;
let timer_on = 0;

function timedCount() {
  document.getElementById("count").value = counter;
  counter++;
  timeout = setTimeout(timedCount, 1000);
}
function startCount() {
  if (!timer_on) {
    timer_on = 1;
    timedCount();
  }
}
function stopCount() {
  if (timer_on) {
    clearTimeout(timeout);
    timer_on = 0;
  }
}

// JSON - Javascript Object Notation
const jsObject = {
  name: "Saif Ali",
  age: 22,
  dob: "2004-03-13",
  gender: "male",
};
console.log(jsObject);
console.log(JSON.stringify(jsObject));
console.log(typeof jsObject);
console.log(typeof JSON.stringify(jsObject));
console.log(JSON.parse(JSON.stringify(jsObject)));

// Storage and cookies
document
  .getElementById("set-local-storage")
  .addEventListener("click", function () {
    localStorage.setItem("name", "Saif");
    localStorage.setItem("profession", "Software Engineer");
    localStorage.setItem("location", "Karachi");
    localStorage.setItem("hobby", "Reading books");
    localStorage.setItem("experience", "3 years");
    localStorage.setItem("learning", "MERN Stack Development");
    localStorage.setItem("goal", "Become a top developer");
    console.log("Local storage set!");
  });

document
  .getElementById("clear-local-storage")
  .addEventListener("click", function () {
    localStorage.clear();
    console.log("Local Storage cleared!");
  });
document
  .getElementById("set-session-storage")
  .addEventListener("click", function () {
    sessionStorage.setItem("name", "Saif");
    sessionStorage.setItem("profession", "Software Engineer");
    sessionStorage.setItem("location", "Karachi");
    sessionStorage.setItem("hobby", "Reading books");
    sessionStorage.setItem("experience", "3 years");
    sessionStorage.setItem("learning", "MERN Stack Development");
    sessionStorage.setItem("goal", "Become a top developer");
    console.log("Session storage set!");
  });

document
  .getElementById("clear-session-storage")
  .addEventListener("click", function () {
    sessionStorage.clear();
    console.log("Session Storage cleared!");
  });

let c = document.cookie;
console.log(c);

document.getElementById("set-cookies").addEventListener("click", function () {
  document.cookie =
    "username=Saif; expires=Fri; 15 December 2025 16:50:00 UTC; SameSite=Lax; path=/";
  document.cookie =
    "role=Frontend Developer; expires=Fri; 01 April 2025 12:00:00 UTC; SameSite=Lax; path=/";
  document.cookie =
    "project=Real Estate App; expires=Fri; 01 April 2025 12:00:00 UTC; SameSite=Lax; path=/";
  console.log("Cookies set successfully!");
  console.log(document.cookie);
});

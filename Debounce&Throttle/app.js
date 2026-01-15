// 1. BASIC DEBOUNCE
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
function logSearch(query) {
  console.log("Searching for: ", query, "at ", new Date().toLocaleTimeString());
}
const debouncedSearch = debounce((e) => logSearch(e.target.value), 1000);

// debouncedSearch("H");

// setTimeout(() => debouncedSearch("He"), 500);
// setTimeout(() => debouncedSearch("Hel"), 3000);
// setTimeout(() => debouncedSearch("Hell"), 5500);
// setTimeout(() => debouncedSearch("Hello"), 6500);

// let timer;
// console.log(timer);

function debounceLeading(fn, delay) {
  let timer;
  return function (...args) {
    const callNow = !timer; // true
    clearTimeout(timer);

    timer = setTimeout(() => (timer = null), delay); // after 2 seconds, timer=null.
    if (callNow) {
      fn(...args);
    }
  };
}
function logTyping(text) {
  console.log("Typing started:", text, "at", new Date().toLocaleTimeString());
}
const debouncedTyping = debounceLeading(logTyping, 2000);
// debouncedTyping("H");
// setTimeout(() => debouncedTyping("He"), 500);
// setTimeout(() => debouncedTyping("Hel"), 3000);
// setTimeout(() => debouncedTyping("Hell"), 5500);
// setTimeout(() => debouncedTyping("Hello"), 6500);

// LEADING THROTTLE
function throttle(fn, delay) {
  let lastTime = 0;
  console.log(lastTime);
  return (...args) => {
    const now = Date.now();
    if (now - lastTime < delay) return;
    lastTime = now;
    fn(...args);
  };
}

function logMessage(msg) {
  console.log("Message:", msg, "at", new Date().toLocaleTimeString());
}

const throttledLog = throttle((e) => logMessage(e.target.value), 2000);

// document.getElementById("input").addEventListener("input", throttledLog);

const arrow = (e) => {
  return console.log(e);
};
arrow("arrow");
function func(e) {
  return console.log(e);
}
func("function");

const searchInput = document.querySelector("#search");
// searchInput.addEventListener("input", function (e) {
//   console.log("Arguments: ", e);
//   console.log("This: ", this);
//   console.log("This value: ", this.value);
// });
searchInput.addEventListener("input", (e) => {
  console.log("Arguments: ", e);
  console.log("This: ", this);
  console.log("This value: ", this.value);
  console.log("Event target value: ", e.target.value);
});

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
const debouncedSearch = debounce(logSearch, 1000);

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

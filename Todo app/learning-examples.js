// tasks.forEach((task) => {

//   // Destructuring the task object.

//   const {
//     id,
//     title,
//     notes,
//     completed,
//     createdAt,
//     meta: { priority = "normal", category = "general", dueDate = "-" } = {},
//   } = task;

//   const tr = document.createElement("tr");

//   function formatDate(ts) {
//     const d = new Date(ts);
//     const yyyy = d.getFullYear();
//     const mm = String(d.getMonth() + 1).padStart(2, "0");
//     const dd = String(d.getDate()).padStart(2, "0");
//     return `${yyyy}-${mm}-${dd}`;
//   }

//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.name = "completed";
//   checkbox.checked = completed;
//   checkbox.dataset.id = id;

//   const deleteBtn = document.createElement("button");
//   deleteBtn.innerHTML = "<span class='text-danger'>Delete</span>";
//   deleteBtn.dataset.id = id;

//   const editBtn = document.createElement("button");
//   editBtn.innerHTML = "<span class='text-secondary'>Edit</span>";
//   editBtn.dataset.id = id;

//   const td = document.createElement("td");
//   td.appendChild(checkbox);
//   tr.innerHTML = `<td>${id}</td>
//    <td>${title}</td>
//    <td>${notes}</td>
//    <td>${completed ? "✅" : "❌"}</td>
//    <td>${formatDate(task.createdAt)}</td>
//    <td>${priority}</td>
//    <td>${category}</td>
//    <td>${dueDate}</td>
//                  `;
//   td.appendChild(deleteBtn);
//   td.appendChild(editBtn);
//   tr.appendChild(td);
//   tbody.appendChild(tr);
// });

// function getTitlesSet(tasks) {
//   // First, map array method  transforms the tasks array and returns an array of 'titles' from each task object in 'lowercase'.
//   // Then, Set converts that array into an object of unique values.

//   return new Set(tasks.map((t) => t.title.toLowerCase()));
// }

// console.log(new Date(Date.now())); // readable date.
// console.log(Date.now()); // timestamps.

// const numbersOne = [1, 2, 3];
// const numbersTwo = [4, 5, 6];
// const numbersCombined = [...numbersOne, ...numbersTwo]; // Quickly copy all or part of an existing array or object into another array or object.
// console.log(numbersCombined);

// function fun({ title, ...rest }) {
//   // allows a function to accept an indefinite number of arguments as an array or object.
//   return {
//     id: Date.now(),
//     title,
//     ...rest,
//   };
// }
// console.log(fun({ title: "Breakfast", priority: "high", completed: false }));

// const a = { name: "Task", meta: { done: false } };
// const b = { ...a };

// b.meta.done = true;

// console.log(a.meta.done); // true ❌

// const d = { name: "Task", meta: { done: false } };
// const { name, meta } = d;
// console.log(name, meta);
// const c = structuredClone(d);
// c.meta.done = true;
// console.log(d.meta.done);
// let prevTasks = tasks;

// tasks = tasks.map((task) => {
//   const { id, completed } = task;
//   return id === taskId ? { ...task, completed: !completed } : task;
// });
// console.log("Previous:", prevTasks);
// console.log("toggle:", tasks);
// function outer() {
//   let x = 10;

//   function inner() {
//     console.log(x);
//   }

//   return inner;
// }
// const fn = outer();
// fn();

// function test() {
//   let n = 0;

//   return function () {
//     n++;
//     console.log(n);
//   };
// }
// const t = test();
// t();
// t();
// t();

// function createCounter() {
//   let count = 0; // private variable

//   return {
//     increment() {
//       count++;
//       return count;
//     },
//     decrement() {
//       count--;
//       return count;
//     },
//     reset() {
//       count = 0;
//       return count;
//     },
//   };
// }

// const counter = createCounter();
// console.log(counter);
// console.log(counter.increment()); // 1
// console.log(counter.increment()); // 2
// console.log(counter.decrement()); // 1
// console.log(counter.reset()); // 0

// const promise = new Promise((resolve, reject) => {
//   let string1 = "FocusOnProgress";
//   let string2 = "FocusOnProgress";
//   if (string1 === string2) {
//     resolve();
//   } else {
//     reject();
//   }
// });
// promise
//   .then(() => {
//     console.log("Promise resolved successfully.");
//   })
//   .catch(() => {
//     console.log("Promise is rejected");
//   });

// const helperPromise = function () {
//   const promise = new Promise((resolve, reject) => {
//     let string1 = "FocusOnProgress";
//     let string2 = "FocusOnProgress";
//     if (string1 === string2) {
//       resolve("Mission Successfull!.");
//     } else {
//       reject("Mission Failed!");
//     }
//   });

//   return promise;
// };
// async function demoPromise() {
//   try {
//     let message = await helperPromise();
//     console.log(message);
//   } catch (error) {
//     console.log("Error: " + error);
//   }
// }
// demoPromise();

// const set = new Set([1, 2, 3, 4, 5]);
// set.add(3);
// console.log(set);
// console.log(typeof set);
// console.log(set.size);
// console.log(set.has(5));
// set.forEach((value) => console.log(value));
// console.log(set.values());
// console.log(set.keys());
// console.log(set.entries());

// const map = new Map();
// map.set("apples", 500);
// map.set("bananas", 200);
// map.set("oranges", 300);
// map.set("apples", 250);

// console.log(map);
// console.log(typeof map);
// console.log(map.get("apples"));
// console.log(map.keys());

// function check(e) {
//   console.log(e.target.value);
// }

// let func = function (...args) {
//   return console.log(...args);
// };

// func("e");

// function throttle(fn, limit) {
//   let inThrottle;

//   return function (...args) {
//     if (!inThrottle) {
//       fn.apply(this, args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// }
// const throttledScroll = throttle(() => {
//   console.log("Scroll event handled!");
// }, 1000);

// window.addEventListener("scroll", throttledScroll);

// Prototypes & Inheritance
let person = {
  name: "Saif",
};
console.log(Object.getPrototypeOf(person));
console.log("\n");

function Cat(name) {
  this.name = name;
}
let cat = new Cat("Garfield");
console.log(Object.getPrototypeOf(cat));
console.log(Cat.prototype);

const t = {};
console.log(t.toString());

function Task(title) {
  this.title = title;

  Task.prototype.sayHi = function () {
    console.log("Task:", this.title);
  };
}

const t1 = new Task("Exercise");
t1.sayHi();


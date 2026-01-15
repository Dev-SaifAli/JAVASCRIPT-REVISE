const undoBtn = document.getElementById("undoBtn");
const addBtn = document.querySelector(".addBtn");
const tbody = document.getElementById("task-list");
const todoForm = document.getElementById("todoForm");
const formModal = document.getElementById("todoModal");
const headerDate = document.querySelector("#date");
const searchInput = document.querySelector("#searchInput");

const today = new Date();

const longDate = today.toLocaleDateString("en-US", {
  weekday: "long", // Full day name (e.g., Monday)
  // year: "numeric", // Full year (e.g., 2026)
  month: "long", // Full month name (e.g., January)
  day: "numeric", // Day of the month (e.g., 5)
});
headerDate.innerText = longDate;

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.target;

  const title = form.title.value.trim();

  if (!title) {
    alert("Please enter the title...");
    return;
  }

  if (isDuplicateTitle(title)) {
    alert("Task already exists");
    return;
  }

  const priority = form.priority.value;
  const category = form.category.value;
  const dueDate = form.dueDate.value;
  const notes = form.notes.value.trim();

  const taskData = {
    title,
    notes,
    meta: { priority, category, dueDate },
  };

  console.log(taskData);
  addTask(taskData);

  form.reset();

  const modalInstance = bootstrap.Modal.getInstance(formModal);
  if (modalInstance) {
    modalInstance.hide();
  }
});

let tasks = loadTasks();

// State & Persistence
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

const titlesSet = new Set();

// function getTitlesSet(tasks) {
//   // First, map array method  transforms the tasks array and returns an array of 'titles' from each task object in 'lowercase'.
//   // Then, Set converts that array into an object of unique values.

//   return new Set(tasks.map((t) => t.title.toLowerCase()));
// }

function isDuplicateTitle(title) {
  // const titles = getTitlesSet(tasks);
  return titlesSet.has(title.toLowerCase());
}

async function addTask(taskData) {
  // Object is passed here...

  showLoading();

  const task = await fakeCreateTask(taskData);
  titlesSet.add(task.title.toLowerCase());

  console.log("Before:", tasks);
  tasks = [...tasks, task];
  console.log("After:", tasks);

  saveTasks();
  renderTasks(tasks);

  hideLoading();
}
function fakeCreateTask(taskData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createTask(taskData));
    }, 1000);
  });
}

function showLoading() {
  addBtn.disabled = true;
  addBtn.innerText = "Saving...";
}
function hideLoading() {
  addBtn.disabled = false;
  addBtn.innerText = "Add Task";
}

function createTask({ title, notes = "", meta = {} }) {
  return {
    id: Date.now(),
    title,
    notes,
    completed: false,
    createdAt: Date.now(),
    meta,
  };
}

function createUndoManager() {
  let lastDeletedTask = null;
  let lastIndex = null;

  return {
    save(task, index) {
      lastDeletedTask = task;
      lastIndex = index;
    },

    undo() {
      if (!lastDeletedTask) return null;

      const data = { task: lastDeletedTask, index: lastIndex };

      lastDeletedTask = null;
      lastIndex = null;

      return data;
    },
  };
}

const undoManager = createUndoManager(); // returns an object having save() and undo() methods

function deleteTask(taskId) {
  // Execute the function for each array element.
  // Returns the index of 1st element that passes the condition;

  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) return;

  // Modifies the original array and deleted the taskObject present at that index. Returns the array with the deleted taskObject.

  // Destructuring; and store the value of the 1st element into a deletedTask variable.

  const [deletedTask] = tasks.splice(index, 1);
  console.log(tasks);

  undoManager.save(deletedTask, index);

  undoBtn.disabled = false;
  saveTasks();
  renderTasks(tasks);

  // tasks = tasks.filter((task) => task.id !== taskId);
  // console.log("tasks", tasks);
  // saveTasks();
  // renderTasks(tasks);
}

undoBtn.addEventListener("click", () => {
  const data = undoManager.undo();
  if (!data) return;

  tasks = [
    ...tasks.slice(0, data.index),
    data.task,
    ...tasks.slice(data.index),
  ];

  undoBtn.disabled = true;
  saveTasks();
  renderTasks(tasks);
});

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);

    console.log(timer);
  };
}

function searchTasks(query) {
  const q = query.trim().toLowerCase();
  const filtered = tasks.filter((t) => t.title.toLowerCase().includes(q));
  console.log(filtered);
  console.log(this);
  renderTasks(filtered);
}

const debouncedSearch = debounce((e) => {
  searchTasks(e.target.value);
}, 1000);

function renderTasks(tasks) {
  console.log("renderTasks call();");

  tbody.innerHTML = "";
  if (tasks.length === 0) {
    tbody.innerHTML = `<tr id="defaultText">
                        <td colspan='100%'>
                            <div class="defaultText">
                                <i class="fa-solid fa-calendar " style="color: #ffd500;"></i>
                                <div class="content">
                                    <h4>Focus on your day</h4>
                                    <p>Get things done with My Day, a list <br> that refreshes every day</p>
                                </div>
                            </div>
                        </td>
                    </tr>`;

    return;
  }

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

  tasks.forEach((task) => {
    const { id, title, notes, completed, createdAt, meta } = task;
    const {
      priority = "normal",
      category = "general",
      dueDate = "-",
    } = meta || {};

    const tr = document.createElement("tr");
    // Industry Tip: Set a data-id on the row for easy lookup
    tr.dataset.id = id;
    if (completed) tr.classList.add("table-active");

    // Format date once outside the loop if possible, or as a helper
    const formattedDate = new Date(createdAt).toISOString().split("T")[0];

    tr.innerHTML = `
    <td>
      <input type="checkbox" class="task-check" data-id="${id}" ${
      completed ? "checked" : ""
    }>
    </td>
    <td>${id}</td>
    <td class="task-title">${title}</td>
    <td>${notes}</td>
    <td>${completed ? "✅" : "❌"}</td>
    <td>${formattedDate}</td>
    <td><span class="badge priority-${priority}">${priority}</span></td>
    <td>${category}</td>
    <td>${dueDate}</td>
    <td>
      <button class="btn-delete" data-id="${id}">Delete</button>
      <button class="btn-edit" data-id="${id}">Edit</button>
    </td>
  `;

    tbody.appendChild(tr);
  });
}

// ➡️ Event Delegation

tbody.addEventListener("click", function (e) {
  // const target = e.target;

  const { target } = e;
  const { id } = target.dataset;
  console.log(e);
  console.log(e.currentTarget);
  console.log(e.target);

  // Delete button clicked
  if (target.className === "btn-delete" && id) {
    console.log(id);
    deleteTask(Number(id));
    // saveTasks();
    // renderTasks(tasks);
  }

  if (target.type === "checkbox" && id) {
    toggleTask(Number(id));
    saveTasks();
    renderTasks(tasks);
  }
});

function toggleTask(taskId) {
  // let prevTasks = tasks;

  // tasks = tasks.map((task) => {
  //   const { id, completed } = task;
  //   return id === taskId ? { ...task, completed: !completed } : task;
  // });
  // console.log("Previous:", prevTasks);
  // console.log("toggle:", tasks);

  console.log("Previous:", tasks);

  // 1. Convert tasks array into a MAP with id -> task
  const map = new Map(tasks.map((t) => [t.id, t]));

  // 2. Get the required task by id
  const task = map.get(taskId);
  if (!task) return;

  // 3. Update the task : flip completed true/false

  map.set(taskId, { ...task, completed: !task.completed });
  tasks = Array.from(map.values());
  console.log("toggle:", tasks);
  saveTasks();
  renderTasks(tasks);
}

// Init
renderTasks(tasks);

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

function outer() {
  let x = 10;

  function inner() {
    console.log(x);
  }

  return inner;
}
const fn = outer();
fn();

function test() {
  let n = 0;

  return function () {
    n++;
    console.log(n);
  };
}
const t = test();
t();
t();
t();

function createCounter() {
  let count = 0; // private variable

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    reset() {
      count = 0;
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter);
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.reset()); // 0

const promise = new Promise((resolve, reject) => {
  let string1 = "FocusOnProgress";
  let string2 = "FocusOnProgress";
  if (string1 === string2) {
    resolve();
  } else {
    reject();
  }
});
promise
  .then(() => {
    console.log("Promise resolved successfully.");
  })
  .catch(() => {
    console.log("Promise is rejected");
  });

const helperPromise = function () {
  const promise = new Promise((resolve, reject) => {
    let string1 = "FocusOnProgress";
    let string2 = "FocusOnProgress";
    if (string1 === string2) {
      resolve("Mission Successfull!.");
    } else {
      reject("Mission Failed!");
    }
  });

  return promise;
};
async function demoPromise() {
  try {
    let message = await helperPromise();
    console.log(message);
  } catch (error) {
    console.log("Error: " + error);
  }
}
demoPromise();

const set = new Set([1, 2, 3, 4, 5]);
set.add(3);
console.log(set);
console.log(typeof set);
console.log(set.size);
console.log(set.has(5));
set.forEach((value) => console.log(value));
console.log(set.values());
console.log(set.keys());
console.log(set.entries());

const map = new Map();
map.set("apples", 500);
map.set("bananas", 200);
map.set("oranges", 300);
map.set("apples", 250);

console.log(map);
console.log(typeof map);
console.log(map.get("apples"));
console.log(map.keys());

function check(e) {
  console.log(e.target.value);
}

let func = function (...args) {
  return console.log(...args);
};

func("e");

function throttle(fn, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
const throttledScroll = throttle(() => {
  console.log("Scroll event handled!");
}, 1000);

window.addEventListener("scroll", throttledScroll);

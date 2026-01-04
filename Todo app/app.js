const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("task-list");

// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// function saveTask() {
//   console.log("saveTask...");

//   let task = taskInput.value.trim();

//   if (!task) {
//     alert("Enter some task to add...");
//     return;
//   }

//   tasks.push(task);

//   localStorage.setItem("tasks", JSON.stringify(tasks));

//   console.log("Task is saved in local storage");

//   taskInput.value = "";

//   renderTasks();
// }

// function renderTasks() {
//   taskList.innerHTML = "";

//   tasks.forEach((task) => {

//     const li = document.createElement("li");
//     li.innerText = task;

//     const dltBtn = document.createElement("button");
//     dltBtn.textContent = "Delete";

//     dltBtn.addEventListener("click", () => {
//       deleteTask(task);
//       console.log(task);
//     });

//     li.appendChild(dltBtn);

//     taskList.appendChild(li);
//   });
// }

// function deleteTask(task) {
//   console.log("deleteTask run!");
//   tasks = tasks.filter((t) => t !== task);
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   console.log(tasks);
//   renderTasks();
// }
// addTaskBtn.addEventListener("click", () => {
//   saveTask();
// });

let tasks = loadTasks();

// State & Persistence
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function handleAddTask(title) {
  // Object is passed here...
  const task = createTask({ title, ...rest }); // title property in that object, destructured here...
  let prevTasks = tasks;
  tasks = [...prevTasks, task];
  console.log("Before:", prevTasks);
  console.log("After:", tasks);
  updateAndRender();
}

function createTask({ title, ...rest }) {
  console.log("createTask called");
  return {
    id: Date.now(),
    title,
    completed: false,
    ...rest,
  };
}

// tasks.push(task); // State Update
// const task = createTask();
// const prevTasks = tasks;
// tasks = [...prevTasks, task];
// saveTask(); // Persistence
// renderTasks(); // Render UI
// console.log("Before:", prevTasks);
// console.log("After:", tasks);
// updateAndRender();

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  console.log("tasks", tasks);
  updateAndRender();
}

function renderTasks() {
  console.log("renderTasks call();");

  taskList.innerHTML = "";

  tasks.forEach((task) => {
    // Destructuring the task object.
    const { id, title, completed } = task;

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "completed";

    // checkbox.value = task.title;
    // ⭐ UI depends upon the state 'task.completed'
    // checkbox.checked = task.completed;
    // checkbox.dataset.id = task.id;

    checkbox.checked = completed;
    checkbox.dataset.id = id;

    const span = document.createElement("span");
    span.className = "strike";

    // span.textContent = task.title;
    // span.className = task.completed ? "checked" : "";

    span.textContent = title;
    span.className = completed ? "checked" : "";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.dataset.id = id;

    // *Instead of creating event listener again and again for each checkbox & delete element on every render, we use event delegation.⬇

    // checkbox.addEventListener("change", function () {
    //   // if(this.checked) {

    //   //   span.style.textDecoration = "line-through";
    //   //   span.style.color = "#999";
    //   //   task.completed = true;
    //   //   console.log("true");
    //   // } else {
    //   //   span.style.textDecoration = "none";
    //   //   span.style.color = "#000"
    //   //   task.completed = false;
    //   //   console.log("false");
    //   // }
    //   // task.completed = checkbox.checked;
    //   toggleTask(task.id);

    //   // saveTask();
    //   // renderTasks();
    //   updateAndRender();
    // });

    // deleteBtn.addEventListener("click", () => {
    //   deleteTask(task.id);
    // });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// ➡️ Event Delegation

taskList.addEventListener("click", function (e) {
  // const target = e.target;

  const { target } = e;
  const { id } = target.dataset;
  console.log(e);
  console.log(e.currentTarget);
  console.log(e.target);

  // Delete button clicked
  if (target.tagName === "BUTTON" && id) {
    deleteTask(Number(id));
    updateAndRender();
  }

  if (target.type === "checkbox" && id) {
    toggleTask(Number(id));
    updateAndRender();
  }
});

function toggleTask(taskId) {
  tasks = tasks.map((task) => {
    const { id, completed } = task;
    return id === taskId ? { ...task, completed: !completed } : task;
  });
}

function updateAndRender() {
  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener("click", () => {
  let title = taskInput.value.trim();

  if (!title) {
    alert("Type something...☺️");
    return;
  }

  // const task = createTask({ title }); // {title: title} => {title}
  // let prevTasks = tasks;
  // tasks = [...prevTasks, task];

  // console.log("Before:", prevTasks);
  // console.log("After:", tasks);

  // updateAndRender();

  handleAddTask(title);

  taskInput.value = "";
});

// Init
renderTasks();

console.log(new Date(Date.now())); // readable date.
console.log(Date.now()); // timestamps.

const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo]; // Quickly copy all or part of an existing array or object into another array or object.
console.log(numbersCombined);

function fun({ title, ...rest }) {
  // allows a function to accept an indefinite number of arguments as an array or object.
  return {
    id: Date.now(),
    title,
    ...rest,
  };
}
console.log(fun({ title: "Breakfast", priority: "high", completed: false }));

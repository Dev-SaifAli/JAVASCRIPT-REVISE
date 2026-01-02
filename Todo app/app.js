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

function addTask(title) {
  let task = {
    id: Date.now(),
    title: title,
    completed: false,
  };
  // tasks.push(task); // State Update
  tasks = [...tasks, task];
  // saveTask(); // Persistence
  // renderTasks(); // Render UI
  updateAndRender();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  console.log("tasks", tasks);
  updateAndRender();
}

function renderTasks() {
  console.log("renderTasks call....");

  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "completed";
    // checkbox.value = task.title;
    checkbox.checked = task.completed;
    checkbox.dataset.id = task.id;

    const span = document.createElement("span");
    span.className = "strike";
    span.textContent = task.title;
    span.className = task.completed ? "checked" : "";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.dataset.id = task.id;

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
  const target = e.target;

  // Delete button clicked
  if (target.tagName === "BUTTON" && target.dataset.id) {
    deleteTask(Number(target.dataset.id));
    updateAndRender();
  }

  if (target.type === "checkbox" && target.dataset.id) {
    toggleTask(Number(target.dataset.id));
    updateAndRender();
  }
});

function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
}

function updateAndRender() {
  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener("click", () => {
  let title = taskInput.value;
  if (!title) {
    alert("Type something...☺️");
    return;
  }

  addTask(title);
  taskInput.value = "";
});

// Init
renderTasks();

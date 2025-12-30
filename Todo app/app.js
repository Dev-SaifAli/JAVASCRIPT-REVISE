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
function saveTask() {
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
  tasks.push(task); // State Update
  saveTask(); // Persistence
  renderTasks(); // Render UI
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  console.log("tasks", tasks);
  saveTask();
  renderTasks();
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

    const span = document.createElement("span");
    span.className = "strike";
    span.textContent = task.title;
    span.className = task.completed ? "checked" : "";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    checkbox.addEventListener("change", function () {
      // if(this.checked) {

      //   span.style.textDecoration = "line-through";
      //   span.style.color = "#999";
      //   task.completed = true;
      //   console.log("true");
      // } else {
      //   span.style.textDecoration = "none";
      //   span.style.color = "#000"
      //   task.completed = false;
      //   console.log("false");
      // }
      task.completed = checkbox.checked;

      saveTask();
      renderTasks();
      console.log(task);
    });

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
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

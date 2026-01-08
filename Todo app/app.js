const addTaskBtn = document.getElementById("addTaskBtn");
const tbody = document.getElementById("task-list");
const todoForm = document.getElementById("todoForm");
const formModal = document.getElementById("todoModal");
const headerDate = document.querySelector("#date");

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

function addTask(taskData) {
  // Object is passed here...
  const task = createTask(taskData); // object in shorthand form is created here:{title: title}

  console.log("Before:", tasks);
  tasks = [...tasks, task];
  console.log("After:", tasks);
  saveTasks();
  renderTasks(tasks);
}

function createTask({ title, notes = "", meta = {} }) {
  alert("saved to local storage.");
  return {
    id: Date.now(),
    title,
    notes,
    completed: false,
    createdAt: Date.now(),
    meta,
  };
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  console.log("tasks", tasks);
  saveTasks();
  renderTasks(tasks);
}

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
  let prevTasks = tasks;
  tasks = tasks.map((task) => {
    const { id, completed } = task;
    return id === taskId ? { ...task, completed: !completed } : task;
  });
  console.log("Previous:", prevTasks);
  console.log("toggle:", tasks);
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

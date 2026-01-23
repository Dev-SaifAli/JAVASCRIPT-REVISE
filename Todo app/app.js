class Task {
  // Initialize properties for the objects
  static nextID = 1;

  constructor(data) {
    if (data.id) {
      this.id = data.id;

      if (data.id >= Task.nextID) {
        Task.nextID = data.id + 1;
      }
    } else {
      this.id = Task.nextID++;
    }
    this.title = data.title || "";
    this.notes = data.notes || "";
    this.completed = data.completed || false;
    this.createdAt = data.createdAt || Date.now();
    this.meta = meta || {};
  }

  toggle() {
    this.completed = !this.completed;
  }

  matches(query) {
    const q = query.toLowerCase();
    return (
      this.title.toLowerCase().includes(q) ||
      this.notes.toLowerCase().includes(q)
    );
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      notes: this.notes,
      completed: this.completed,
      createdAt: this.createdAt,
      meta: this.meta,
    };
  }

  static fromJSON(json) {
    return new Task(json);
  }
}

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
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return true;
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      alert("Storage full! Please delete some tasks.");
    } else {
      console.error("Failed to save tasks: ", error);
    }
    return false;
  }
}

function loadTasks() {
  // bad: return JSON.parse(localStorage.getItem("tasks")) || [];
  // What if localStorage full and json.parse fails

  try {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load tasks: ", error);
    return [];
  }
}

const titlesSet = new Set(tasks.map((t) => t.title.toLowerCase()));

function isDuplicateTitle(title) {
  console.log(titlesSet);
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
      resolve(new Task(taskData));
    }, 300);
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

// function createTask({ title, notes = "", meta = {} }) {
//   return {
//     id: Date.now(),
//     title,
//     notes,
//     completed: false,
//     createdAt: Date.now(),
//     meta,
//   };
// }

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

// Debounce function
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

searchInput.addEventListener("input", debouncedSearch);

function renderTasks(tasks) {
  console.log("renderTasks call();");

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
  // Clear defaultText if it exists.

  const defaultText = tbody.querySelector("#defaultText");
  if (defaultText) {
    defaultText.remove();
  }

  // Build MAP of existing rows
  const existingRows = new Map();
  tbody.querySelectorAll("tr[data-id]").forEach((row) => {
    existingRows.set(Number(row.dataset.id), row);
  });

  // Get current task IDs
  const taskIDs = new Set(tasks.map((t) => t.id));

  // Remove rows for deleted tasks
  existingRows.forEach((row, id) => {
    if (!taskIDs.has(id)) {
      row.remove();
    }
  });

  // Update the existing row

  tasks.forEach((task) => {
    const existingRow = existingRows.get(task.id);

    if (existingRow) {
      updateTaskRow(existingRow, task);
    } else {
      const newRow = createTaskRow(task);
      tbody.appendChild(newRow);
    }
  });
}

function createTaskRow(task) {
  const { id, title, notes, completed, createdAt, meta } = task;
  const {
    priority = "normal",
    category = "general",
    dueDate = "-",
  } = meta || {};

  const tr = document.createElement("tr");
  // Industry Tip: Set a data-id on the row for easy lookup
  tr.dataset.id = id;
  const formattedDate = new Date(createdAt).toISOString().split("T")[0];

  tr.innerHTML = `
    <td><input type="checkbox" class="task-check" data-id="${id}" ${completed ? "checked" : ""}></td>
    <td class="task-id"></td>
    <td class="task-title"></td>
    <td class="task-notes"></td>
    <td class="task-status"></td>
    <td class="task-date"></td>
    <td class="task-priority"></span></td>
    <td class="task-category"></td>
    <td class="task-dueDate"></td>
    <td>
      <button class="btn-delete" data-id="${id}">Delete</button>
      <button class="btn-edit" data-id="${id}">Edit</button>
    </td>
  `;

  tr.querySelector(".task-id").textContent = id;
  tr.querySelector(".task-title").textContent = title;
  tr.querySelector(".task-notes").textContent = notes;
  tr.querySelector(".task-status").textContent = completed ? "✅" : "❌";
  tr.querySelector(".task-date").textContent = formattedDate;
  tr.querySelector(".task-date").textContent = createdAt;
  tr.querySelector(".task-category").textContent = category;
  tr.querySelector(".task-dueDate").textContent = dueDate;

  const priorityCell = tr.querySelector(".task-priority");
  const span = document.createElement("span");
  span.className = `badge badge-${priority}`;
  priorityCell.appendChild(span);
  priorityCell.textContent = priority;

  return tr;
}

function updateTaskRow(row, task) {
  const { title, notes, completed } = task;

  const checkbox = row.querySelector(".task-check");
  if (checkbox) checkbox.checked = completed;

  // Update status cell
  const statusCell = row.querySelector(".task-status");
  if (statusCell) statusCell.textContent = completed ? "✅" : "❌";

  // Update row class
  if (completed) {
    row.classList.add("table-active");
  } else {
    row.classList.remove("table-active");
  }
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
  }

  if (target.type === "checkbox" && id) {
    toggleTask(Number(id));
  }
});

function toggleTask(taskId) {
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

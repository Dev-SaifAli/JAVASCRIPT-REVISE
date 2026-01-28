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
    this.meta = data.meta || {};
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
class TaskManager {
  constructor() {
    this.tasks = [];
    this.undoManager = this.createUndoManager();
  }
  add(taskData) {
    if (!taskData.title || !taskData.title.trim()) {
      throw new Error("Title is required.");
    }
    if (this.isDuplicate(taskData.title)) {
      throw new Error("Task already exists!");
    }
    const task = new Task(taskData);
    this.tasks.push(task);
    return task;
  }

  delete(taskId) {
    const index = this.tasks.findIndex((t) => t.id === taskId);
    if (index === -1) return null;
    const [deletedTask] = this.tasks.splice(index, 1);
    this.undoManager.save(deletedTask, index);
    return deletedTask;
  }

  toggle(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return null;
    task.toggle();
    return task;
  }

  undoDelete() {
    const data = this.undoManager.undo();
    this.tasks.splice(data.index, 0, data.task);
    return data.task;
  }

  search(query) {
    if (!query || !query.trim()) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.matches(query));
  }

  isDuplicate(title) {
    return this.tasks.some(
      (t) => t.title.toLowerCase() === title.toLowerCase(),
    );
  }

  getAll() {
    return this.tasks;
  }

  getById(id) {
    return this.tasks.find((t) => t.id === id);
  }

  // SERIALIZATION
  toJSON() {
    return this.tasks.map((task) => task.toJSON());
  }
  fromJSON(data) {
    this.tasks = data.map(Task.fromJSON);
  }

  createUndoManager() {
    let lastDeletedTask;
    let lastIndex;

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
      canUndo() {
        return lastDeletedTask !== null;
      },
    };
  }
}
const taskManager = new TaskManager();

function loadTasks() {
  try {
    const data = localStorage.getItem("tasks");

    if (!data) return [];

    const parsed = JSON.parse(data);
    taskManager.fromJSON(parsed);

    // if (tasks.length > 0) {
    //   const maxId = Math.max(...tasks.map((t) => t.id));
    //   Task.nextID = maxId + 1;
    // }
  } catch (error) {
    console.error("Failed to load tasks: ", error);
    return [];
  }
}

function saveTasks() {
  try {
    const json = taskManager.toJSON();

    localStorage.setItem("tasks", JSON.stringify(json));
    return true;
  } catch (error) {
    console.error("Failed to save tasks:", error);
    return false;
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

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const taskData = {
    title: form.title.value.trim(),
    notes: form.notes.value.trim(),
    meta: {
      priority: form.priority.value,
      category: form.category.value,
      dueDate: form.dueDate.value,
    },
  };

  try {
    showLoading();
    await new Promise((resolve) => setTimeout(resolve, 300));
    taskManager.add(taskData);
    saveTasks();
    renderTasks(taskManager.getAll());

    form.reset();
    bootstrap.Modal.getInstance(formModal)?.hide();
  } catch (error) {
    alert(error.message);
  } finally {
    hideLoading();
  }
});

let tasks = loadTasks();

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
  const q = query.trim();
  if (!q) {
    renderTasks(tasks);
    return;
  }
  const filtered = tasks.filter((t) => t.matches(q));
  console.log(filtered);
  console.log(this);
  renderTasks(filtered);
}
const SEARCH_DEBOUNCE_MS = 300;
const debouncedSearch = debounce((e) => {
  searchTasks(e.target.value);
}, SEARCH_DEBOUNCE_MS);

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
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;
  task.toggle();
  console.log("toggle:", tasks);

  saveTasks();
  renderTasks(tasks);
}

// Init
renderTasks(tasks);

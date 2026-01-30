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
    if (!data) return null;
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
  update(taskId, updatedData) {
    const task = this.getById(taskId);
    if (!task) return null;

    task.title = updatedData.title || task.title;
    task.notes = updatedData.notes || task.notes;

    task.meta = { ...task.meta, ...updatedData.meta };

    return task;
  }

  // SERIALIZATION
  toJSON() {
    return this.tasks.map((task) => task.toJSON());
  }
  fromJSON(data) {
    this.tasks = data.map(Task.fromJSON);

    if (this.tasks.length > 0) {
      const maxId = Math.max(...this.tasks.map((t) => t.id));
      Task.nextID = maxId + 1;
    }
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
    taskManager.fromJSON(parsed); // returns an array of task objects.
  } catch (error) {
    console.error("Failed to load tasks: ", error);
    return [];
  }
}

function saveTasks() {
  try {
    const json = taskManager.toJSON(); // returns an array of plain js objects.

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
const todoForm = document.querySelector("#todoForm");
const formModal = document.getElementById("todoModal");
const headerDate = document.querySelector("#date");
const searchInput = document.querySelector("#searchInput");
const editForm = document.getElementById("editForm");
const editModal = document.getElementById("editModal");

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

    if (editingTaskId) {
      taskManager.update(editingTaskId, taskData);
      editingTaskId = null;
    } else {
      taskManager.add(taskData);
    }

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

function showLoading() {
  addBtn.disabled = true;
  addBtn.innerText = "Saving...";
}
function hideLoading() {
  addBtn.disabled = false;
  addBtn.innerText = "Add Task";
}
// Modal Management
formModal.addEventListener("hide.bs.modal", () => {
  editingTaskId = null;
  todoForm.reset();
  todoForm.querySelector(".modal-title").textContent = "Add Task";
});
let editingTaskId = null;

// ➡️ Event Delegation
tbody.addEventListener("click", function (e) {
  const { target } = e;
  const taskId = Number(target.dataset.id);
  console.log(e);
  console.log(e.currentTarget);
  console.log(e.target);

  // Delete button clicked
  if (target.classList.contains("btn-delete") && taskId) {
    console.log(taskId);

    const deleted = taskManager.delete(taskId);
    if (deleted) {
      saveTasks();
      searchInput.value = "";
      renderTasks(taskManager.getAll());
      undoBtn.disabled = false;
    }
  }

  if (target.classList.contains("task-check") && taskId) {
    taskManager.toggle(taskId);
    saveTasks();
    renderTasks(taskManager.getAll());
  }

  if (target.classList.contains("btn-edit") && taskId) {
    const task = taskManager.getById(taskId);
    if (task) {
      editingTaskId = taskId;
    }

    const { title, notes, meta } = task;
    const {
      priority = "normal",
      category = "general",
      dueDate = "-",
    } = meta || {};

    const form = todoForm;
    console.log(form);
    form.title.value = title;
    form.notes.value = notes;
    form.priority.value = priority;
    form.category.value = category;
    form.dueDate.value = dueDate;

    form.querySelector(".modal-title").textContent = "Edit Task";
    addBtn.textContent = "Update Task";

    const modal = new bootstrap.Modal(formModal);
    modal.show();
  }
});

undoBtn.addEventListener("click", () => {
  const restored = taskManager.undoDelete();
  if (restored) {
    saveTasks();
    renderTasks(taskManager.getAll());
    undoBtn.disabled = true;
  }
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

const SEARCH_DEBOUNCE_MS = 300;
const debouncedSearch = debounce((e) => {
  const results = taskManager.search(e.target.value);
  renderTasks(results);
}, SEARCH_DEBOUNCE_MS);

searchInput.addEventListener("input", debouncedSearch);

function renderTasks(tasks) {
  console.log("renderTasks call();");
  console.log(tasks);

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
      <button class="btn-edit"  data-id="${id}">Edit</button>
    </td>
  `;

  tr.querySelector(".task-id").textContent = id;
  tr.querySelector(".task-title").textContent = title;
  tr.querySelector(".task-notes").textContent = notes;
  tr.querySelector(".task-status").textContent = completed ? "✅" : "❌";
  tr.querySelector(".task-date").textContent = formattedDate;
  tr.querySelector(".task-category").textContent = category;
  tr.querySelector(".task-dueDate").textContent = dueDate;

  const priorityCell = tr.querySelector(".task-priority");
  const span = document.createElement("span");
  span.className = `badge badge-${priority}`;
  span.textContent = priority;
  priorityCell.appendChild(span);

  return tr;
}

function updateTaskRow(row, task) {
  const { title, notes, completed } = task;

  const checkbox = row.querySelector(".task-check");
  if (checkbox) checkbox.checked = completed;

  // Update status cell
  const statusCell = row.querySelector(".task-status");
  if (statusCell) statusCell.textContent = completed ? "✅" : "❌";

  const titleCell = row.querySelector(".task-title");
  if (titleCell) titleCell.textContent = title;

  const notesCell = row.querySelector(".task-notes");
  if (notesCell) notesCell.textContent = notes;

  // Update row class
  if (completed) {
    row.classList.add("table-active");
  } else {
    row.classList.remove("table-active");
  }
}

// Init
loadTasks();
renderTasks(taskManager.getAll());

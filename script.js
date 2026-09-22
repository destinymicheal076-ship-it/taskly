const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const STORAGE_KEY = 'taskly-tasks';

let tasks = loadTasks();
tasks.forEach(renderTask);

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === '') {
    return;
  }

  addTask(taskText);
  taskInput.value = '';
});

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(text) {
  const task = {
    id: Date.now().toString(),
    text: text,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);
}

function renderTask(task) {
  const listItem = document.createElement('li');
  listItem.dataset.id = task.id;
  if (task.completed) {
    listItem.classList.add('completed');
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', function () {
    setCompleted(task.id, checkbox.checked);
    listItem.classList.toggle('completed');
  });

  const taskSpan = document.createElement('span');
  taskSpan.className = 'task-text';
  taskSpan.textContent = task.text;
  taskSpan.addEventListener('click', function () {
    checkbox.checked = !checkbox.checked;
    setCompleted(task.id, checkbox.checked);
    listItem.classList.toggle('completed');
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteTask(task.id);
    listItem.remove();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteButton);

  taskList.appendChild(listItem);
}

function setCompleted(id, completed) {
  const task = tasks.find(function (t) {
    return t.id === id;
  });
  if (task) {
    task.completed = completed;
    saveTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) {
    return t.id !== id;
  });
  saveTasks();
}

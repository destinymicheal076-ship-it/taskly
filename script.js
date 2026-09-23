const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskError = document.getElementById('task-error');

const STORAGE_KEY = 'taskly-tasks';

let tasks = loadTasks();
tasks.forEach(renderTask);

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === '') {
    taskError.hidden = false;
    return;
  }

  taskError.hidden = true;
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

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = task.text;
  editInput.hidden = true;

  const editButton = document.createElement('button');
  editButton.className = 'edit-btn';
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function () {
    if (listItem.classList.contains('editing')) {
      saveEdit();
    } else {
      startEdit();
    }
  });

  editInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveEdit();
    }
  });

  function startEdit() {
    editInput.value = task.text;
    taskSpan.hidden = true;
    editInput.hidden = false;
    editInput.focus();
    editInput.select();
    editButton.textContent = 'Save';
    listItem.classList.add('editing');
  }

  function saveEdit() {
    const newText = editInput.value.trim();
    if (newText === '') {
      taskError.hidden = false;
      editInput.focus();
      return;
    }

    taskError.hidden = true;
    editTaskText(task.id, newText);
    task.text = newText;
    taskSpan.textContent = newText;
    taskSpan.hidden = false;
    editInput.hidden = true;
    editButton.textContent = 'Edit';
    listItem.classList.remove('editing');
  }

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    const confirmed = window.confirm('Delete this task?');
    if (!confirmed) {
      return;
    }
    deleteTask(task.id);
    listItem.remove();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taskSpan);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
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

function editTaskText(id, text) {
  const task = tasks.find(function (t) {
    return t.id === id;
  });
  if (task) {
    task.text = text;
    saveTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) {
    return t.id !== id;
  });
  saveTasks();
}

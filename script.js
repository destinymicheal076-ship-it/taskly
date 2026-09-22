const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === '') {
    return;
  }

  addTask(taskText);
  taskInput.value = '';
});

function addTask(text) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', function () {
    listItem.classList.toggle('completed');
  });

  const taskSpan = document.createElement('span');
  taskSpan.className = 'task-text';
  taskSpan.textContent = text;
  taskSpan.addEventListener('click', function () {
    checkbox.checked = !checkbox.checked;
    listItem.classList.toggle('completed');
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    listItem.remove();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteButton);

  taskList.appendChild(listItem);
}

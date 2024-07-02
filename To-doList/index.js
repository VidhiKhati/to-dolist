let inptbx = document.getElementById('inputbx');
let taskListContainer = document.getElementById('task-list');
let count = 1;
let data = [];
getData();
inptbx.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
function addTask() {
    let task_value = inptbx.value.trim();
    if (task_value === '') {
        alert('Please enter a task.');
        return;
    }
    let taskObj = {
        task: task_value,
        task_id: count++,
        is_complete: false
    };
    createTask(taskObj);
    setData(taskObj);
    inptbx.value = '';
}
function deleteTask(event) {
    let element = event.currentTarget;
    let parentElement = element.parentElement;
    let taskId = parentElement.dataset.taskId;
    parentElement.remove();
    let idx = data.findIndex(item => item.task_id == taskId);
    if (idx !== -1) {
        data.splice(idx, 1);
        localStorage.setItem('tasks', JSON.stringify(data));
    }
}
function toggleComplete(event) {
    let checkbox = event.target;
    let parentElement = checkbox.parentElement;
    let taskId = parentElement.dataset.taskId;
    let taskIndex = data.findIndex(item => item.task_id == taskId);
    if (taskIndex !== -1) {
        data[taskIndex].is_complete = checkbox.checked;
        localStorage.setItem('tasks', JSON.stringify(data));
        if (checkbox.checked) {
            parentElement.classList.add('completed');
        } else {
            parentElement.classList.remove('completed');
        }
    }
}
function createTask(obj) {
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');
    taskDiv.dataset.taskId = obj.task_id;
    let taskText = document.createElement('div');
    taskText.classList.add('task-text');
    taskText.textContent = obj.task;
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = obj.is_complete;
    checkbox.classList.add('task-checkbox');
    checkbox.addEventListener('change', toggleComplete);
    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.style.display = 'none';
    editBtn.addEventListener('click', function() {
        alert('Edit functionality can be implemented here.');
    });
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', deleteTask);
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteBtn);
    taskListContainer.appendChild(taskDiv);
    editBtn.style.display = 'inline-block';
    if (obj.is_complete) {
        taskDiv.classList.add('completed');
    }
}
function setData(obj) {
    data.push(obj);
    localStorage.setItem('tasks', JSON.stringify(data));
}
function getData() {
    let storedData = localStorage.getItem('tasks');
    if (storedData) {
        data = JSON.parse(storedData);
        data.forEach(element => {
            createTask(element);
        });
        count = data.length + 1;
    }
}
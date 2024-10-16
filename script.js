const users = {};
let currentUser = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock user registration
    if (!users[username]) {
        users[username] = password; // Register user
    }

    if (users[username] === password) {
        currentUser = username;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('task-form').style.display = 'block';
        loadTasks();
    } else {
        alert('Invalid credentials');
    }
}

function addTask() {
    const title = document.getElementById('task-title').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;

    const tasks = JSON.parse(localStorage.getItem(currentUser + '-tasks')) || [];
    tasks.push({ title, deadline, priority });
    localStorage.setItem(currentUser + '-tasks', JSON.stringify(tasks));

    document.getElementById('task-title').value = '';
    document.getElementById('task-deadline').value = '';
    loadTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem(currentUser + '-tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - ${task.deadline} - ${task.priority}`;
        li.innerHTML += ` <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem(currentUser + '-tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem(currentUser + '-tasks', JSON.stringify(tasks));
    loadTasks();
}

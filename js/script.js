let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");

    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText === "" || taskDate === "") {
        alert("Please fill all fields");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        date: taskDate,
        completed: false
    };

    tasks.push(newTask);
    saveToLocalStorage();
    
    taskInput.value = "";
    dateInput.value = "";

    renderTasks();
}

function renderTasks(filteredTasks = tasks){
    const tasklist = document.getElementById("tasklist");
    tasklist.innerHTML = "";

    if (filteredTasks.length === 0) {
        tasklist.innerHTML = "<tr><td colspan='4'>No tasks found</td></tr>";
        return;
    }

    filteredTasks.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td class="${task.completed ? "completed" : ""}">
        ${task.text}</td>
        <td>${task.date}</td>
        <td>
            <input type="checkbox" 
            ${task.completed ? "checked" : ""} 
            onchange="toggleTask(${task.id})">
            </td>
        <td><button onclick="deleteTask(${task.id})">Delete</button>
        </td>
        `;

        tasklist.appendChild(row);
    });
}

function toggleTask(id){
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
);
    saveToLocalStorage();
    renderTasks();
}

function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks();
}   
function deleteAllTasks(){
        tasks = [];
        saveToLocalStorage();
        renderTasks();
    }


function filterTasks(){
    const filterValue = document.getElementById("filter").value;

    if (filterValue === "completed") {
        renderTasks(tasks.filter(task => task.completed));
    } else if (filterValue === "pending") {
        renderTasks(tasks.filter(task => !task.completed));
    } else {
        renderTasks();
    }
}

renderTasks();
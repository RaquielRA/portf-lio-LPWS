const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// Carrega as tarefas do localStorage ao iniciar
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

// Adiciona uma tarefa ao DOM e ao localStorage
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToDOM(taskText); // Adiciona a tarefa sem limitar os caracteres
        
        // Salva a tarefa no localStorage
        saveTask(taskText);
        taskInput.value = ""; // Limpa o textarea
    }
}

// Função para adicionar uma tarefa ao DOM
function addTaskToDOM(taskText) {
    const li = document.createElement("li");
    
    // Cria um contêiner para o texto
    const textContainer = document.createElement("div");
    textContainer.innerHTML = `<span>${taskText}</span>`;
    
    // Cria um contêiner para os botões
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button class="doneButton" style="margin-right: 10px;" onClick="markAsDone(this)">Feito</button>
        <button class="editButton" onClick="editTask(this)">Editar</button>
        <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
    `;
    
    // Adiciona os contêineres ao li
    li.appendChild(textContainer);
    li.appendChild(buttonContainer);
    
    tasklist.appendChild(li);
}

// Marca a tarefa como feita ou desfaz
function markAsDone(button) {
    const li = button.parentElement.parentElement; 
    const span = li.querySelector("span");
    
    if (li.style.backgroundColor === "rgb(255, 209, 216)") {
        li.style.backgroundColor = ""; 
        span.style.textDecoration = ""; 
    } else {
        li.style.backgroundColor = "rgb(255, 209, 216)"; 
        span.style.textDecoration = "line-through"; 
    }
}

// Edita uma tarefa
function editTask(button) {
    const li = button.parentElement.parentElement; 
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        const oldText = span.textContent;
        span.textContent = newText.trim();
        updateTask(oldText, newText.trim());
    }
}

// Remove uma tarefa
function deleteTask(button) {
    const li = button.parentElement.parentElement; 
    const taskText = li.querySelector("span").textContent;
    tasklist.removeChild(li);
    removeTask(taskText);
}

// Salva a tarefa no localStorage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Atualiza a tarefa no localStorage
function updateTask(oldText, newText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.indexOf(oldText);
    if (index > -1) {
        tasks[index] = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Remove a tarefa do localStorage
function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

// Carrega as tarefas ao iniciar
loadTasks();

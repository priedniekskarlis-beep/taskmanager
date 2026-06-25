console.log("script.js loaded")

function validateTask(title, description) {
    if(title.trim() === "") {
        return "Title is required"
    }
    if(title.length > 140) {
        return "Title must be 140 characters or less"
    }
    if(description.length > 5000) {
        return "Description must be 5000 characters or less"
    }
    return ""
}

let currentTask = null
let currentCard = null

document.querySelector("#modal-save").addEventListener("click", () => {
    const title = document.querySelector("#modal-title").value
    const status = document.querySelector("#modal-status").value
    const priority = document.querySelector("#modal-priority").value
    const description = document.querySelector("#modal-description").value
    const dueDate = document.querySelector("#modal-due-date").value

    const error = validateTask(title, description)
    if(error) {
        document.querySelector("#modal-error").textContent = error
        return
    }
    document.querySelector("#modal-error").textContent = ""

    fetch(`http://127.0.0.1:5000/tasks/${currentTask.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title,
            status: status,
            priority: priority,
            description: description,
            due_date: dueDate || null,
            assigned_to: currentTask.assigned_to
        })
    })
    .then(response => response.json())
    .then(updated => {
        currentCard.remove()
        renderTask(updated)
        updateCounts()
        document.querySelector("#modal-overlay").style.display = "none"
    })
})

document.querySelector("#modal-close").addEventListener("click", () => {
    document.querySelector("#modal-overlay").style.display = "none"
})

function renderTask(task) {
    const card = document.createElement("article")
    card.classList.add("card")
    const titleEl = document.createElement("span")
    titleEl.textContent = task.title 
    const column = document.querySelector(`.column[data-status="${task.status}"]`)
    card.appendChild(titleEl)
    const priorityEl = document.createElement("p")
    priorityEl.textContent = `Priority: ${task.priority}`
    card.appendChild(priorityEl)
    if (task.due_date) {
        const dueDateEl = document.createElement("p")
        dueDateEl.textContent = `Due date: ${new Date(task.due_date).toISOString().slice(0, 10)}`
        card.appendChild(dueDateEl)
    }
    if (task.description) {
        const descriptionEl = document.createElement("p")
        descriptionEl.textContent = `Description: ${task.description}`
        card.appendChild(descriptionEl)
    }
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    card.appendChild(deleteButton)
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation()
        fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {method: "DELETE"})
        .then(response => {
            if (response.ok) {
                card.remove()
                updateCounts()
            }
        })
    })
    card.addEventListener("click", () => openModal(task, card))
        if(column) {column.appendChild(card)}
}

function openModal(task, card) {
    currentTask = task
    currentCard = card
    document.querySelector("#modal-title").value = task.title
    document.querySelector("#modal-status").value = task.status
    document.querySelector("#modal-priority").value = task.priority
    document.querySelector("#modal-description").value = task.description || ""
    document.querySelector("#modal-due-date").value = task.due_date ? new Date(task.due_date).toISOString().slice(0, 10) : ""
    document.querySelector("#modal-overlay").style.display = "flex"
}

fetch("http://127.0.0.1:5000/tasks")
    .then(response => response.json())
    .then(data => {
        data.forEach(task => renderTask(task))
        updateCounts()
    })

const form = document.querySelector(".taskentry")
    form.addEventListener("submit", event => {
        event.preventDefault()
        const taskTitle = document.querySelector("#task-title") .value
        const taskStatus = document.querySelector("#task-status") .value 
        const taskDescription = document.querySelector("#task-description") .value
        const taskPriority = document.querySelector("#task-priority") .value
        const taskDueDate = document.querySelector("#task-due-date") .value

        const error = validateTask(taskTitle, taskDescription)
        if (error) {
            document.querySelector("#form-error").textContent = error
            return
        }
        document.querySelector("#form-error").textContent = ""

        fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: taskTitle, 
            status: taskStatus,
            description: taskDescription,
            priority: taskPriority,
            due_date: taskDueDate || null
        })
        })
        
        .then(response => response.json())
        .then(newTask => {
            renderTask(newTask)
            updateCounts()
            form.reset()
        })
          
    })

function updateCounts() {
    const todoCount = document.querySelectorAll(`.column[data-status="To do"] .card`) .length
    document.querySelector("#count-todo").textContent = `To do: ${todoCount}`
    document.querySelector("#empty-todo").style.display = todoCount === 0 ? "" : "none"
    const inprogressCount = document.querySelectorAll(`.column[data-status="In progress"] .card`) .length
    document.querySelector("#count-inprogress").textContent = `In progress: ${inprogressCount}`
    document.querySelector("#empty-inprogress").style.display = inprogressCount === 0 ? "" : "none"
    const doneCount = document.querySelectorAll(`.column[data-status="Done"] .card`) .length
    document.querySelector("#count-done").textContent = `Done: ${doneCount}`
    document.querySelector("#empty-done").style.display = doneCount === 0 ? "" : "none"
}

const searchInput = document.querySelector("#search")
searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase()
    document.querySelectorAll(".card").forEach(card => {
        const title = card.querySelector("span").textContent.toLowerCase()
        if (title.includes(text)) {
             card.style.display = "" 
        } else {
        card.style.display = "none"
         }
    })
})

const adminArea = document.querySelector(".admin-area")
const roleSelect = document.querySelector(".user-select")

function updateAdminVisibility() {
    adminArea.style.display = roleSelect.value === "Admin" ? "" : "none"
}

roleSelect.addEventListener("change", updateAdminVisibility)
updateAdminVisibility()
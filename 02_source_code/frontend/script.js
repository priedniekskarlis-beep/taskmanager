console.log("script.js loaded")

function renderTask(task) {
    const card = document.createElement("article")
    card.classList.add("card")
    const titleEl = document.createElement("span")
    titleEl.textContent = task.title 
    const column = document.querySelector(`.column[data-status="${task.status}"]`)
    card.appendChild(titleEl)
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    card.appendChild(deleteButton)
    deleteButton.addEventListener("click", () => {
        fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {method: "DELETE"})
        .then(response => {
            if (response.ok) {
                card.remove()
                updateCounts()
            }
        })
    })
    const editButton = document.createElement("button")
    editButton.textContent = "Edit"
    card.appendChild(editButton)
    editButton.addEventListener("click", () => {
        const newTitle = prompt("New title:", task.title)
        if(newTitle) {
            fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({title: newTitle, status: task.status})
            })

            .then(response => response.json())
            .then(updated => {
                titleEl.textContent = updated.title
                task.title = updated.title
            })
        }
    })

        if(column) {column.appendChild(card)}
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

        fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title: taskTitle, status: taskStatus})
        })
        
        .then(response => response.json())
        .then(newTask => {
            renderTask(newTask)
            updateCounts()
        })
          
    })

function updateCounts() {
    const todoCount = document.querySelectorAll(`.column[data-status="To do"] .card`) .length
    document.querySelector("#count-todo").textContent = `To do: ${todoCount}`
    const inprogressCount = document.querySelectorAll(`.column[data-status="In progress"] .card`) .length
    document.querySelector("#count-inprogress").textContent = `In progress: ${inprogressCount}`
    const doneCount = document.querySelectorAll(`.column[data-status="Done"] .card`) .length
    document.querySelector("#count-done").textContent = `Done: ${doneCount}`
}

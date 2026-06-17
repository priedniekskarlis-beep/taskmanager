console.log("script.js loaded")

function renderTask(task) {
    const card = document.createElement("article")
    card.classList.add("card")
    card.textContent = task.title
    const column = document.querySelector(`.column[data-status="${task.status}"]`)
    if (column) {column.appendChild(card)}
    const button = document.createElement("button")
    button.textContent = "Delete"
    card.appendChild(button)
    button.addEventListener("click", () => {
        fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {method: "DELETE"})
        .then(response => {
            if (response.ok) card.remove()
        })
    })
    
}

fetch("http://127.0.0.1:5000/tasks")
    .then(response => response.json())
    .then(data => data.forEach(task => renderTask(task)))

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
        .then(newTask => renderTask(newTask))
          
    })

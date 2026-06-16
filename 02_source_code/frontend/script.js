console.log("script.js loaded")

fetch("http://127.0.0.1:5000/tasks")
    .then(response => response.json())
    .then(data => data.forEach(task => {
    const card = document.createElement("article")
    card.classList.add("card")
    card.textContent = task.title
    const column = document.querySelector(`.column[data-status="${task.status}"]`)
    if (column) {column.appendChild(card)}
    }))

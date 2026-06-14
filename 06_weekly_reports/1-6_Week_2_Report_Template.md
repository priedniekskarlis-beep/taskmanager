# 1-6 Weekly Report - Week 2

## Student Information

Student name: Kārlis Priednieks
Group: PX25
Project ID: 1-6
Project name: Task Management Application
Week number: 2

## Planned Work For This Week

Implement the database layer in the backend, backend structure, first API endpoints, initial test cases.

## Completed Work
Day 8: Set up DBeaver and connected it to the PostgreSQL database. Started the backend by installing python, creating an isolated virtual environment in the backend folder, installing Flask, and saving the dependencies to requirements.txt. Wrote my first Flask app to confirm the dev server runs in the browser.     
Day 9: Connected the backend to the PostgreSQL database. Installed psycopg driver. Created a database module 'db.py' with a connection function, that reads its settings from env variables, and another function that fetches tasks. Added /tasks API endpoint in 'app.py' that returns the tasks as JSON, which was tested and gave live database data in the browser.
Day 10: Built a 'create-task' feature on the backend. Added a create_task function in 'db.py' that inserts a task with a secure query (placeholder not string values) and commits it. Updated the /tasks route to accept POST requests, reading the new task from the JSON body and returning it with a created status. Tested it with a POST request and confirmed the task was saved.
Day 11: Added input validation to the POST /tasks endpoint. Checks if title isnt missing and returns an error instead of crashing. Tested missing title request (got 400) and a valid request (got created task).
Day 12: Added a DELETE /tasks/<id> endpoint to remove a task by id. Added delete_task() in db.py which had DELETE with a WHERE clause + rowcount, and a route using url path parameter, returning 404 if the id doesn't exist. Tested deleting a real task, which disappeared, and a missing id, which returned 404.
Day 13: Added a PUT /tasks/<id> endpoint to update a task. Added update_task() in db.py which had a UPDATE with a WHERE clause + RETURNING and a route reusing title validation, returning 404 if the id doesn't exist. Tested updating a tasks title and status, which changed.
Day 14: Did a review session to strengthen my understanding of the backend. Rewrote the database connection function and get_all_tasks read query from the start in a practice folder.
## GitHub Commits
https://github.com/priedniekskarlis-beep/taskmanager/commit/2cfbef18a8d7cf235b24a239ca1261b80d884b5e
https://github.com/priedniekskarlis-beep/taskmanager/commit/9eb37892a63f75b742ddbd4d50ad8cc6dbdf0dc2
https://github.com/priedniekskarlis-beep/taskmanager/commit/2bd78ddf77d4f6c36edf1c35ece441d1685a72eb
https://github.com/priedniekskarlis-beep/taskmanager/commit/c01152706b63181766cf8d61ffbc6ab9f0bf3f23
https://github.com/priedniekskarlis-beep/taskmanager/commit/b8f38fad64422dfeb620d383bf502edab51111e5
https://github.com/priedniekskarlis-beep/taskmanager/commit/6179f126917fc301bcf95d060398327ef77e92b5

## Screenshots / Evidence
flask_backend_running.png - shows the first flask app responding at localhost:5000
tasks_api_json.png - shows the /tasks API returning tasks from the database as JSON
tasks_after_post.png - shows the /tasks endpoint listing all tasks, including one created with POST
post_validation.png - shows POST /tasks rejecting a missing title with 400 and an error message, as well as accepting a valid one.
put_task_updated.png - shows PUT /tasks/<id> updating a task and returning it
delete_task.png - shows DELETE /tasks/<id> removing a task

## Problems Found
In PowerShell, cd..\.. gave a "not recognized" error.
The first POST request with Invoke-RestMethod failed with "Unable to connect to the
remote server."
The DELETE endpoint kept 404ing, and a syntax error stopped Flask from loading.
## Solutions Applied
Learned that PowerShell requires a space after cd (unlike the old Command Prompt), so cd ..\.. with a space works.
Understood that this meant the Flask server wasn't running, and started it with 'python app.py', in a new terminal. Sent the request from a different terminal. Learned that a running server occupies its own terminal, so a second one is needed to send requests.
Moved the route above the if __name__ block, and manually restarted Flask because the auto-reloader had died from the error.


## Next Week Plan
Connect the frontend to the backend. Display tasks from /tasks API on the board and change the Submit form to create tasks. Continue UI improvements.

## Supervisor Notes

To be completed by the practice supervisor if needed.

# 1-6 Weekly Report - Week 3

## Student Information

Student name: Kārlis Priednieks
Group: PX25
Project ID: 1-6
Project name: Task Management Application
Week number: 3

## Planned Work For This Week

Main feature implementation, frontend/form validation, authentication if required, UI improvements, integration testing.

## Completed Work
- Day 15: Finish practicing and rebuilding of db.py and app.py to strengthen my understanding of the backend.
- Day 16: Connected the frontend to the backend. Replaced hardcoded cards with fetched cards from GET /tasks, created in the column matching its status. Made the submit form create tasks via POST /tasks, so new tasks now show up instantly.
- Day 17: Added a delete button that removes the card from the board with DELETE /tasks/<id>. Added an edit button that prompts for a new title and updates the task with PUT /tasks/<id>.

## GitHub Commits

Add links or commit hashes.

## Screenshots / Evidence
- cross_origin_error.png - shows the browser refusing to give data across origins by default
- create_task_via_form.png - shows a task on the board which was created with the submit form
- delete_request_200.png - the network tab in DevTools shows that clicking delete sends DELETE /tasks/6, and the server responds 200
- edit_put_200.png - editing a task sends PUT /tasks/5 and the server responds 200

## Problems Found
- The browser blocked the fetch with a CORS error for security reasons, because the page and API are different origins.
- After editing a task title, using the edit prompt again still showed the original title, even though it was updated on the board.

## Solutions Applied
- Enabled flask-cors 'CORS(app)', which added the Access-Control-Allow-Origin header to responses.
- Updated the in-memory task object 'task.title = updated.title'.

## Next Week Plan

Describe what will be done next.

## Supervisor Notes

To be completed by the practice supervisor if needed.

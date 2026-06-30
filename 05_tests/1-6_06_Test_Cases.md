# 1-6 Test Cases

## Test Case Format

Each test case must include:

- Test case ID
- Feature
- Preconditions
- Test steps
- Expected result
- Actual result
- Status: Passed or Failed
- Screenshot reference

## Required Functional Test Cases

1. Application starts successfully.
2. Main page opens without errors.
3. User can create a new record.
4. User can view a list of records.
5. User can open record details.
6. User can edit an existing record.
7. User can delete or archive a record.
8. Required fields are validated.
9. Invalid data is rejected.
10. Search or filtering works if implemented.

## Required Technical Test Cases

1. Docker containers start successfully.
2. Database connection works.
3. Database schema is created automatically.
4. Seed data is loaded.
5. Application can be restarted without losing database data.

## Required Security Test Cases

1. Passwords or secrets are not committed to GitHub.
2. User input is validated.
3. Error messages do not expose stack traces.
4. User roles are checked where roles are implemented.

### TC-F-01 - Application starts successfully
- Feature: Start app
- Preconditions: Docker Desktop running, GitHub repo, unstarted tools
- Test steps:
    1. 'cd 04_docker'
    2. 'docker compose  -f 1-6_docker-compose.yml up -d'
    3. 'cd ../02_source_code/backend'
    4. activate the virtual environment and run 'python app.py' after
    5. open 'http://localhost:8080'
- Expected result: Both containers run, backend responds, the page loads.
- Actual result: Both containers run, backend responds, the page loads.
- Status: Passed
- Screenshot: test_docker_running.png,test_flask_backend_running.png

### TC-F-02 - Main page opens without errors
- Feature: Page loading
- Preconditions: App started (Docker up, backend running), page open (http://localhost:8080)
- Test steps:
    1. Open the page.
    2. Open DevTools console 'F12'
- Expected result: Three columns render, tasks load as cards, no errors in console
- Actual result: Three columns render, tasks load as cards, no errors in console
- Status: Passed
- Screenshot: test_main_page.png

### TC-F-03 - User can create a new record
- Feature: Create task
- Preconditions: App started (Docker up, backend running), page open (http://localhost:8080)
- Test steps:
    1. Type a title: "test task"
    2. Select a priority: "High", and status: "To do"
    3. Submit the task
- Expected result: A card appears in the "To do" column with the correct title and priority set to "High". The entry form clears.
- Actual result: The card appeared in the "To do" column with title and priority, and the form cleared after submitting.
- Status: Passed
- Screenshot: test_create_task.png

### TC-F-04 - User can view a list of records
- Feature: Read tasks
- Preconditions: App started, page open, at least one task exists
- Test steps:
    1. Reload the page
- Expected result: All tasks from the database appear as cards in the column matching each task's status.
- Actual result: All tasks loaded as cards in their correct columns.
- Status: Passed
- Screenshot: test_task_list.png

### TC-F-05 - User can open record details
- Feature: Detail modal
- Preconditions: App started, page open, at least one task exists
- Test steps:
    1. Click a task card
- Expected result: A modal opens showing the task's full details (title, status, priority, due date, description).
- Actual result: The modal opened showing the task's details.
- Status: Passed
- Screenshot: test_detail_view.png

### TC-F-06 - User can edit an existing record
- Feature: Edit task (modal)
- Preconditions: App started, page open, at least one task exists
- Test steps:
    1. Click a card to open the modal
    2. Change the status from: "To do" to: "Done"
    3. Save the task
- Expected result: Modal closes; the card updates and moves to the "Done" column; untouched fields stay the same.
- Actual result: Modal closed, card updated and moved columns; other fields preserved.
- Status: Passed
- Screenshot: test_edit_task.png

### TC-F-07 - User can delete a record
- Feature: Delete task
- Preconditions: App started, page open, at least one task exists
- Test steps:
    1. Click the Delete button on a card
- Expected result: The card disappears from the page (task removed via DELETE).
- Actual result: The card disappeared from the page.
- Status: Passed
- Screenshot: test_delete_task.png

### TC-F-08 - Required fields are validated
- Feature: Frontend validation
- Preconditions: App started, page open
- Test steps:
    1. Leave the title empty (or type only spaces)
    2. Submit the task
- Expected result: A "Title is required" message shows up on the screen and a task isn't created.
- Actual result: The "Title is required" message showed up and the task wasn't created.
- Status: Passed
- Screenshot: test_required_validation.png

### TC-F-09 - Invalid data is rejected
- Feature: Backend validation
- Preconditions: App started (backend running), Postman open
- Test steps:
    1. In Postman, create a POST request to http://localhost:5000/tasks
    2. Set Body to raw JSON '{"title":"test","status":"12345"}'
    3. Send the data
- Expected result: Server responds HTTP 400 with an error message ("Invalid status") and rejects the task creation.
- Actual result: Server returned 400 Bad Request with {"error": "Invalid status"} and didn't create a task.
- Status: Passed
- Screenshot: test_invalid_data.png

### TC-F-10 - Search / filtering works
- Feature: Search filter
- Preconditions: App started, page open, multiple tasks with unique titles have been made
- Test steps:
    1. Type part of a task's title into the search box.
- Expected result: Only cards that have the same text in their title as the searched text remain visible.
- Actual result: Only matching cards stayed visible.
- Status: Passed
- Screenshot: test_search.png

### TC-T-01 - Docker containers start successfully
- Feature: Containers
- Preconditions: Docker Desktop running
- Test steps:
    1. 'cd 04_docker'
    2. 'docker compose -f 1-6_docker-compose.yml up -d'
    3. Run: 'docker ps'  (or check Docker Desktop)
- Expected result: Both 1-6_database and 1-6_app show as running.
- Actual result: Both showing as up and running.
- Status: Passed
- Screenshot: test_docker_running.png

### TC-T-02 - Database connection works
- Feature: Backend + DB
- Preconditions: Containers + backend running
- Test steps:
    1. In Postman, send GET http://localhost:5000/tasks
- Expected result: Returns the tasks as JSON (200), showing that the backend reads from the database.
- Actual result: GET /tasks returned 200 + JSON
- Status: Passed
- Screenshot: test_db_connection.png

### TC-T-03 - Database schema is created automatically
- Feature: Schema init
- Preconditions: Containers + backend running
- Test steps:
    1. Open DBeaver, connect to the database
    2. View the tables
- Expected result: The tables from 1-6_schema.sql exist (users, tasks, audit_logs).
- Actual result: Three tables exist: audit_logs, tasks, users
- Status: Passed
- Screenshot: test_schema.png

### TC-T-04 - Seed data is loaded
- Feature: Seed init
- Preconditions: Containers + backend running, DBeaver is loaded
- Test steps:
    1. In DBeaver, open the users table and view its data
- Expected result: The seeded admin user "Demo administrator" (role: administrator) is present.
- Actual result: "Demo Administrator" user is in the users table. The seed inserted task id=1, which was later edited to "Updated task" during testing.
- Status: Passed
- Screenshot: test_seed_data.png

### TC-T-05 - App restarts without losing data
- Feature: Data persistence (volume)
- Preconditions: Containers + backend running, page open
- Test steps:
    1. Create a task and remember it
    2. 'docker compose -f 1-6_docker-compose.yml down'
    3. 'docker compose -f 1-6_docker-compose.yml up -d'
    4. Reload the board
- Expected result: The task is still there - the db_data volume persisted it.
- Actual result: The task was still on the page.
- Status: Passed
- Screenshot: test_persistence.png

### TC-S-01 - Passwords/secrets are not committed to GitHub
- Feature: Secret management
- Preconditions: Repo pushed to GitHub
- Test steps:
    1. Open .gitignore and check if .env and venv/ are ignored
    2. Check the repo: no .env, keys, or real credentials are committed
- Expected result: No secrets in the repo. The only password is the local DB password: "student_password", which is allowed by the requirements.
- Actual result: .gitignore excluded .env and venv/ . No .env, keys or real credentials were committed. The local credential: "student_password" remained
- Status: Passed
- Screenshot: test_no_secrets.png

### TC-S-02 - User input is validated
- Feature: Input validation (frontend + backend)
- Preconditions: App started, Postman downloaded
- Test steps:
    1. Frontend: submit the form with an empty title
    2. Backend: POST {"title":"test","status":"12345"} in Postman
- Expected result: Invalid input gets rejected on frontend with a message and on backend with 400. Bad data is rejected from the database.
- Actual result: Frontend rejected an empty title with "Title is required" and backend returned 400 "Invalid status" for invalid data sent through Postman. Both were blocked and didn't enter the database.
- Status: Passed
- Screenshot: frontend_validation.png, test_invalid_data.png

### TC-S-03 - Error messages do not expose stack traces
- Feature: Safe error handling (Flask debug off)
- Preconditions: Backend running with debug off
- Test steps:
    1. In Postman, POST {"title":"error test","assigned_to":999999} to http://localhost:5000/tasks
- Expected result: "500 Internal Server Error" with no traceback, because debug is turned off
    (assigned_to points to a user id that doesn't exist)
- Actual result: 500 returned with a generic message and no traceback was exposed.
- Status: Passed
- Screenshot: test_error_no_trace.png

### TC-S-04 - User roles are checked (where implemented)
- Feature: Role-based UI gating
- Preconditions: App running, page open
- Test steps:
    1. Set the role dropdown to Guest / Standard user
    2. Set it to Admin
- Expected result: The admin panel shows only for the Administrator role.
- Actual result: The admin panel was not visible for non-Administrators.
- Status: Passed
- Screenshot: test_admin_panel.png
- Note: Roles are only gated on the frontend, backend doesn't enforce roles as auth is out of scope

### TC-S-05 - Static code analysis (SonarLint) --- bonus ---
- Feature: Code quality and security analysis
- Preconditions: SonarLint (SonarQube for IDE) installed in VS Code, Node.js installed (for JS analysis)
- Test steps:
    1. Open the backend (app.py, db.py) and frontend (script.js, index.html) in VS Code
    2. Check the results in the SonarQube panel
- Expected result: No security risks. Any problems reviewed and fixed or explained.
- Actual result: 4 small problems, no security risks. Fixed: duplicated "To do" literal in app.py (extracted constants), and missing labels on the search, as well as role inputs in index.html. Unchanged: "prefer top-level await" in script.js (requires changing the entire script to an ES module which is out of scope).
- Status: Passed (no security risks; quality problems fixed and explained)
- Screenshot: test_sonarlint.png
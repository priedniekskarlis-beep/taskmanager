# 1-6 Final Internship Practice Report Template

## 1. Student Information

Student name: Kārlis Priednieks
Group: PX25
Practice period: 01.06.2026-30.06.2026
Project ID: 1-6
Project name: Task Management Application
GitHub repository URL: https://github.com/priedniekskarlis-beep/taskmanager

## 2. Project Summary

A Task Management Application on the web. It stores cards on a Kanban task board and sorts them in "To do" / "In progress" / "Done" columns. The users can create, read, update and delete tasks. Each task must have a title, priority, status, and it can optionally contain a description and due date for clarity. (An 'assigned to' field exists in the data model, but full assignment is planned in the future.) A task's details can be fully viewed and edited by clicking on the card, which opens a modal. The admin panel shows only for the Administrator role. Frontend and backend both have input validation. The project is built with a HTML + CSS + JavaScript frontend, a Python Flask REST API, and a PostgreSQL database, which all run with Docker Compose.

## 3. Requirements Completed

Main requirements:

Create form with validation - task entry form in index.html, validated by validateTask() (script.js) + validate_task() (app.py)
List view with search - the Kanban task board, search box matches cards live (searchInput listener, script.js)
Detail view - clicking a card opens the detail modal (openModal(), script.js)
Edit - the modal is editable, Save sends 'PUT /tasks/<id>' with all fields
Delete - Delete button activates 'DELETE /tasks/<id>'
Status / workflow - status "To do" / "In progress" / "Done", cards render in the matching column
Dashboard summary - "Task summary" counts in the admin panel (updateCounts(), script.js)
Error handling for bad input - messages on the screen "#form-error" / "#modal-error" + backend 400 responses
Empty-state messages - "No tasks yet" placeholders on each column
Audit fields - created_at and updated_at columns on the tasks table (03_database/1-6_schema.sql)

User roles: 
role dropdown "Guest" / "Standard user" / "Admin" in index.html
Administration area shows only for Admin (updateAdminVisibility(), script.js)

Non-functional:
Runs locally with Docker Compose
Logical folder structure (01-08)
No secrets committed (.gitignore)
Database initialized from schema.sql + seed_data.sql
Readable on laptop, basic mobile support with viewport meta 

Technical:
Git + GitHub, Docker Compose, PostgreSQL
DB connection with environment variables (os.environ.get in db.py)
README with startup steps

## 4. System Architecture

The app has a frontend, a backend API, and a database, with Docker for local execution.

Frontend '02_source_code/frontend/': HTML + CSS + JavaScript, no framework. index.html (structure), style.css (styling), script.js (logic). The Kanban task board gets loaded and it can connect to the backend with fetch(). Served by an nginx container on port 8080.

Backend '02_source_code/backend/': a Python Flask REST API - app.py handles the routing (GET/POST /tasks, PUT/DELETE /tasks/<id>), and db.py is the data-access layer (connection + queries). Input is checked by 'validate_task()'. Runs on port 5000 with 'python app.py' in a virtual environment.

Database '03_database/': PostgreSQL 15 in a Docker container (port 5432). Three tables - users, tasks, audit_logs. Schema and seed data load automatically on first startup from    1-6_schema.sql and 1-6_seed_data.sql. Data survives restarts because of a named volume (db_data). Connection settings come from environment variables.

Docker '04_docker/1-6_docker-compose.yml': two services - app (nginx) and database (postgres) - started with docker compose up -d.

External libraries: Flask, flask-cors, psycopg (in requirements.txt), frontend uses no libraries.

Data flow: 1. Browser loads the frontend from nginx 2. script.js calls Flask (5000) 3. app.py routes call db.py 4. Query PostgreSQL (5432) 5. JSON flows back and renders as cards.

Only the frontend and DB are containerized. Flask runs on the host.

## 5. Database Description

The database (practice_project, PostgreSQL 15) has three tables.

users - application users:
id (SERIAL, PK)
full_name VARCHAR(120) NOT NULL
email VARCHAR(160) NOT NULL UNIQUE
password_hash VARCHAR(255) NOT NULL
role VARCHAR(50) NOT NULL (CHECK: 'administrator' or 'user')
created_at, updated_at TIMESTAMP DEFAULT now

tasks - the task records on the board:
id (SERIAL, PK)
title VARCHAR(140) NOT NULL
description TEXT
status VARCHAR(50) NOT NULL DEFAULT 'To do'
priority VARCHAR(50) NOT NULL DEFAULT 'Medium'
due_date DATE
assigned_to INT (FK → users.id, ON DELETE SET NULL)
created_at, updated_at TIMESTAMP DEFAULT now

audit_logs - an action log:
id (SERIAL, PK)
user_id INTEGER
action VARCHAR(120) NOT NULL
entity_name VARCHAR(120) NOT NULL
entity_id INTEGER
created_at TIMESTAMP DEFAULT now

Relationships:
tasks.assigned_to is a foreign key to users.id with ON DELETE SET NULL - if a user is removed, their tasks stay but the assignment becomes NULL. audit_logs references users without forcing a foreign key.

Indexes:
primary-key indexes on each id automatically and a unique index on users.email (from the UNIQUE constraint). No custom indexes were added.

Seed data (1-6_seed_data.sql, loaded on first startup): one admin user ("Demo Administrator"), one task ("Setting up the repository", Done/High, assigned to user 1), and one audit-log entry.

## 6. Docker Execution

-- First time setup (backend):

cd 02_source_code/backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

-- Project running:

# 1. Start the frontend and database

cd 04_docker
docker compose -f 1-6_docker-compose.yml up -d

# 2. Start the backend (new terminal window)

cd 02_source_code/backend
.\venv\Scripts\Activate.ps1
python app.py

-- Open:

app: http://localhost:8080
backend API: http://localhost:5000

-- Stop:

# Backend: 

Ctrl + C in its terminal

# Containers (frontend + database):

cd 04_docker
docker compose -f 1-6_docker-compose.yml down

Make sure to use 'down' WITHOUT '-v' at the end to keep your data.

## 7. Testing Summary

Testing is documented in 05_tests/1-6_06_Test_Cases.md (19 cases, all passed), with evidence screenshots in 07_screenshots_and_evidence/.

Functional (10): app startup, main page loads without console errors, create a task, view the task list, open task details, edit a task, delete a task, required-field validation, invalid-data rejection, and search/filter. Verified through the UI and, for API, in Postman.

Technical (5): Docker containers start, the backend + database connection works, the schema is created automatically, seed data loads, and data remains through a restart (named volume). Verified with docker ps, Postman, DBeaver, and a down/up restart test.

Security (4): no secrets committed, input validated on both frontend and backend, error messages don't expose stack traces (Flask debug off returns generic 500), and role-based UI gating. 
Bonus: SonarLint static analysis: 4 minor findings, no security risks. Fixed the duplicated-literal (app.py) and input-label (index.html) problems.

Tools: Postman (API testing), DBeaver (database inspection), SonarLint / SonarQube for IDE (static analysis).

Evidence: the test cases document (05_tests/1-6_06_Test_Cases.md) and the test_- screenshots in 07_screenshots_and_evidence/

## 8. Screenshots

Weeks 1-4:

webapp_design.png / wireframe.png                     - early design/wireframe
github_repo.png                   - the GitHub repository
wsl_error.png                     - a setup error encountered
cross_origin_error.png            - CORS error before flask-cors
docker_running.png                - containers running (earlier)
database_running.png              - DBeaver connected to the DB
flask_backend_running.png         - first Flask app running
localhost_starter.png             - early frontend page
tasks_api_json.png                - /tasks API returning JSON
tasks_after_post.png              - task list after a POST
create_task_via_form.png          - task created via the form
post_validation.png               - POST rejects missing title (400)
put_task_updated.png / edit_put_200.png                  - edit (PUT) updating a task / 200
delete_task.png / delete_request_200.png            - delete + 200 response
card_detail_view.png              - detail modal
edit_task_via_modal.png           - editing via the modal
admin_panel_hidden.png            - admin panel hidden
frontend_validation.png           - frontend validation message

Test evidence:

test_docker_running.png        - Docker containers running
test_flask_backend_running.png - Flask backend running (Debug mode: off)
test_main_page.png             - board loads, no console errors
test_create_task.png           - creating a task
test_task_list.png             - tasks listed in their columns
test_detail_view.png           - detail modal open
test_edit_task.png             - editing a task via the modal
test_delete_task.png           - task deleted
test_required_validation.png   - empty title rejected ("Title is required")
test_search.png                - search filter showing only matches
test_invalid_data.png          - API rejects invalid status (400)
test_db_connection.png         - GET /tasks returns JSON (DB connection)
test_schema.png                - DBeaver: 3 tables exist
test_seed_data.png             - DBeaver: seeded admin user
test_no_secrets.png            - .gitignore / no secrets committed
test_error_no_trace.png        - generic 500, no stack trace (debug off)
test_admin_panel.png           - admin panel hidden for non-admin
test_persistence.png           - data persists after a restart
test_sonarlint.png             - SonarLint findings




## 9. GitHub Work Summary

Repository: https://github.com/priedniekskarlis-beep/taskmanager

Branches: all work was done on the main branch (a solo learning project), using small commits often instead of feature branches.

Commits: 41 commits, made step by step throughout the internship. Each is a seperate, working block with a comprehensible description, and each was sorted with its matching weekly report entry. 

Pull requests: no pull requests were used for a solo project on main

Repository structure (numbered folders for clarity):

01_documentation - requirements, weekly plan, setup guide
02_source_code - frontend (HTML/CSS/JS) + backend (Flask app.py, db.py)
03_database - schema + seed SQL
04_docker - Docker Compose file
05_tests - test cases
06_weekly_reports - Week 1-4 reports
07_screenshots_and_evidence - screenshots
08_final_delivery - final report + delivery checklist
README.md and database_documentation.md at the root

## 10. Problems and Solutions

1. Running Flask in its own terminal
The first POST request wasn't able to form a connection with the server.
For Flask to run a server and send requests it needs an independent terminal for itself.
2. CORS rejected requests from the frontend
The browser blocked the fetch with a CORS error for security reasons, because the page and API are unmutual origins.
Enabled flask-cors 'CORS(app)'. This allowed different origins to send requests with the new 'Access-Control-Allow-Origin' header.
3. Editing a task caused other fields to not show up
The edit only sent a title and status, but the backend PUT changed every column so it made the other fields not show up.
Switched the title prompt to a modal that can be edited and sends every field when you click the Save button.
4. The admin panel was accessible to every user
The condition for the panel to be visible was just the string "Admin", which is always true.
Changed it to compare the role dropdown value: 'roleSelect.value === "Admin"'
5. Modal styles weren't showing
The browser was giving a cached style.css from before the modal rules were added.
Added up to the ?v= cache-buster so it downloads again.
6. A missing brace stopped the entire script from working
A single syntax error in script.js made every UI feature appear wrong, including no cards rendering.
Fixed the brace and found out that even one syntax error from JavaScript can break the whole file.

## 11. Self-evaluation

I made a full stack Task Management Application, with Flask + Python for the backend API, PostgreSQL for the database and a HTML + CSS + JavaScript frontend. I made them communicate with 'fetch', and run with Docker Compose. I learned how to form a connection between the stack and add input validation on the frontend and backend. I added a security measure by turning Flask debug off and keeping secrets off the repo. I did documentation and testing, for which i used Postman, DBeaver and SonarLint. My commits were small, often made and clean.
I struggled mostly with JavaScript. I had missing brackets or braces many times, as well as having inconsistent names for the HTML ids, CSS selectors, JSON keys. 
The backend was very hard at the start until I had patterns to follow. I learned to count placeholders against values. I understood unfamiliar ideas by encountering bugs and fixing them.s
If i were to continue this project, I would add a user authentication system, make task assignment work, update the mobile layout, add full testing with pytest and CI
with GitHub Actions, and make the backend a container so the whole stack can get started with Docker.


## 12. Final Checklist

- [x] Source code is committed.
- [x] Docker Compose file is present.
- [x] Database schema is present.
- [x] Test cases are present.
- [x] Weekly reports are present.
- [x] Screenshots are present.
- [x] Final report is completed.

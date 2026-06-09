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
Day 9: Connected the backend to the PostgreSQL database. Installed psycopg driver. Created a database module 'db.py' with a connection function, that reads its settings from env variables, and another function that fetches tasks. Added /tasks API endpoint in 'app.py' that returns the tasks as JSON,which was tested to been giving live database data in the browser.

## GitHub Commits
https://github.com/priedniekskarlis-beep/taskmanager/commit/6179f126917fc301bcf95d060398327ef77e92b5

## Screenshots / Evidence
flask_backend_running.png - shows the first flask app responding at localhost:5000
tasks_api_json.png - shows the /tasks API returning tasks from the database as JSON

## Problems Found
In PowerShell, cd..\.. gave a "not recognized" error.


## Solutions Applied
Learned that PowerShell requires a space after cd (unlike the old Command Prompt), so cd ..\.. with a space works.


## Next Week Plan

Describe what will be done next.

## Supervisor Notes

To be completed by the practice supervisor if needed.

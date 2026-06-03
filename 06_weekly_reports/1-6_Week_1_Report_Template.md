# 1-6 Weekly Report - Week 1

## Student Information

Student name: Kārlis Priednieks
Group: PX25
Project ID: 1-6
Project name: Task Management Application
Week number: 1

## Planned Work For This Week

Project setup, repository creation, requirements review, wireframes, database draft, Docker baseline.

## Completed Work
Repository setup, setting up and running Docker, getting the starter page to show up.
Wrote database code to implement users and tasks tables, and added starting data to them.
Checked the columns and the connection between tasks and users inside the database through terminal.
Created a git attributes file to convert line endings across Windows and Linux.
Created a wireframe.

## GitHub Commits
https://github.com/priedniekskarlis-beep/taskmanager/commit/a2e884b446864eb605da478e2115d3bc3c5aa3f7
https://github.com/priedniekskarlis-beep/taskmanager/commit/34a696d6c99a87c20aebc41ca9b2298e046267ab



## Screenshots / Evidence
docker_running.png - shows docker compose ps output
github_repo.png - shows files that are pushed to the GitHub repository
localhost_starter.png - shows the starter page at localhost:8080
wsl_error.png - shows WSL network error
database_running.png - shows the database schema running in docker


## Problems Found
Access to the WSL network was blocked while connecting WSL to VS Code.
SQL commands weren't allowed with the database being up, because the system was trying to use the default system name (practice_project) instead of recognizing the name in the database configuration (student).

## Solutions Applied
Switching from Ubuntu to Windows with VSC.  
Used a explicit terminal command flag (specific instruction) '-U student' that signed-in manually rather than automatically and gave control and overview over the tables.

## Next Week Plan
Start creating the database and backend


## Supervisor Notes


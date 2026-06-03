# Task Management Application - Week 1

A Kanban-style web application that is made to sort user assigned tasks and give a simple overview of their details.

## Getting started

These instructions will help to start the local development environment and database.

### Required technologies

Docker Desktop
Git

### Setup

1. Clone the repository
git clone https://github.com/priedniekskarlis-beep/taskmanager.git   
cd taskmanager

2. Docker start
docker compose up -d
docker ps

### Database 

The project uses a PostgreSQL database. The custom SQL schema defines entity relationships where a user can be assigned multiple tasks, but no two users can have the same task. The users table tracks user identification and roles, whereas the tasks table tracks task details. Audit logs automatically hold timestamps to log data changes.






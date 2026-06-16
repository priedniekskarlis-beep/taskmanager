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
- Day 16: Connected the frontend to the backend. Replaced hardcoded cards with fetched cards from GET /tasks, created in the column matching its status.

## GitHub Commits

Add links or commit hashes.

## Screenshots / Evidence
cross_origin_error.png - shows the browser refusing to give data across origins by default

## Problems Found
The browser blocked the fetch with a CORS error for security reasons, because the page and API are different origins.

## Solutions Applied
Enabled flask-cors 'CORS(app)', which added the Access-Control-Allow-Origin header to responses.

## Next Week Plan

Describe what will be done next.

## Supervisor Notes

To be completed by the practice supervisor if needed.

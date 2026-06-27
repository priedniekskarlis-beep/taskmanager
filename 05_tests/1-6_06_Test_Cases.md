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

### TC-F-01 — Application starts successfully
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

### TC-F-02 — Main page opens without errors
- Feature: Page loading
- Preconditions: App started (Docker up, backend running), page open (http://localhost:8080)
- Test steps:
    1. Open the page.
    2. Open DevTools console 'F12'
- Expected result: Three columns render, tasks load as cards, no errors in console
- Actual result: Three columns render, tasks load as cards, no errors in console
- Status: Passed
- Screenshot: test_main_page.png

### TC-F-03 — User can create a new record
- Feature: Create task
- Preconditions: App started (Docker up, backend running), page open (http://localhost:8080)
- Test steps:
    1. Type a title, select a priority and status
    2. Submit the task
- Expected result: 
- Actual result:
- Status:
- Screenshot: 
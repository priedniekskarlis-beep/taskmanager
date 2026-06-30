# 1-6 Weekly Report - Week 4

## Student Information

Student name: Kārlis Priednieks
Group: PX25
Project ID: 1-6
Project name: Task Management Application
Week number: 4

## Planned Work For This Week

Detail view, admin panel access, validation, testing, bug fixing, final documentation, final report, GitHub cleanup.

## Completed Work
- Day 22: Made the card pop up with detailed information about a task.
- Day 23: Changed the editing system by making the detail modal editable with a save button that updates every field.
- Day 24: Made the admin panel only visible to admin roled users and made the create form clear after submitting.
- Day 25: Added frontend validation by rejecting an empty or whitespaced title, setting character limits (140 for the title, 5000 for the description). Added error messages that appear on the create form and modal.
Also added validation in app.py for POST and PUT to reject invalid data with 400.
Made Flask debug off by default so the interactive debugger cant be exposed.
- Day 27: Started the functional tests.
- Day 29: Completed the functional, technical and security test cases with screenshots. 
Ran SonarLint static analysis: fixed the duplicated literal and input label problems. 
- Day 30: Finalized the project: wrote the final internship report, updated the README, cleaned the repo, and delivered to GitHub
## GitHub Commits
https://github.com/priedniekskarlis-beep/taskmanager/commit/469226e  
https://github.com/priedniekskarlis-beep/taskmanager/commit/2dfeead  
https://github.com/priedniekskarlis-beep/taskmanager/commit/382d070  
https://github.com/priedniekskarlis-beep/taskmanager/commit/d147358  
https://github.com/priedniekskarlis-beep/taskmanager/commit/76c902c  
https://github.com/priedniekskarlis-beep/taskmanager/commit/86c2a44 
https://github.com/priedniekskarlis-beep/taskmanager/commit/596a263   
https://github.com/priedniekskarlis-beep/taskmanager/commit/b51e07f   
https://github.com/priedniekskarlis-beep/taskmanager/commit/235b95c   

## Screenshots / Evidence
- card_detail_view.png - shows the card in an opened state displaying the tasks details
- edit_task_via_modal.png - shows the task's status being edited in the detailed view
- admin_panel_hidden.png - shows that the admin panel is restricted and can't be viewed by non-admins
- frontend_validation.png - shows the form rejecting an empty title with a "Title is required" message

## Problems Found
The background behind the centered modal box didnt appear initially.
Editing a task's title ignored it's description, priority and due date.
The admin panel stayed visible to every role even after making the role gate.
After creating a task, the entered values stayed in the form fields.

## Solutions Applied
Bumped the ?v= number in the stylesheet link.
The old edit only sent title and status, but backend PUT replaces every column, so the edit prompt was replaced with an editable modal that sends all fields upon clicking the 'Save' button.
The condition was just the string "Admin", which always returned true, so I changed it to compare the dropdown's value 'roleSelect.value'.
Called 'form.reset()' in the submit success callback to clear the form once the task was created.

## Conclusion
Completed the test cases and the final internship report, all work committed and pushed to GitHub repo. Possible additions in the future: 
authentication, 'assigned to' having a /users endpoint, GitHub Actions CI

## Supervisor Notes

To be completed by the practice supervisor if needed.

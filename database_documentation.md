The users table holds information about every person who registers on the app and creates a row for them.
id - automatically (using SERIAL) assigns and stores a unique ID to users.
username - a text field that serves as a users identifier publicly.
role - a text field which dictates app permissions.
timestamps - automatically marks the precise date and clock time that user data was created or updated for audit tracking.

The tasks table stores all the project requirements and tasks, showing what needs to be completed, who is doing it, and its current stage.
id - automatically (using SERIAL) assigns a unique integer to each task, which makes sure tasks arent confused by the system but identified.
title - the main heading of a kanban card, which holds the name of a task.
description - a text field which gives the user an insight on a given task.
status - a tracker that allows users to follow the progress of a specific task, behaving as a column in the kanban card.
assigned_to - stores the persons id from the users table, connecting that person to the task, giving him ownership and responsibility.
timestamps - automatically tracks the precise time a task card was created or its description, status, ownership was changed.

Entity Relationship description:
A single user can be assigned multiple tasks in the system, however each task can only be assigned to one user. This allows a simple responsibility overview.
The Foreign Key constraint mechanism, used inside the tasks table, behaves like a pointer that stores a unique ID which is owned by each user.
In case of account deletion, ON DELETE SET NULL clears the ID of the user from the assigned_to column rather than causing a system error by making the app point to nothing or crash.






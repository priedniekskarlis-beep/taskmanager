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
## GitHub Commits

Add links or commit hashes.

## Screenshots / Evidence
- card_detail_view.png - shows the card in an opened state displaying the tasks details
- edit_task_via_modal.png - shows the task's status being edited in the detailed view

## Problems Found
The background behind the centered modal box didnt appear initially.
Editing a task's title ignored it's description, priority and due date.

## Solutions Applied
Bumped the ?v= number in the stylesheet link.
The old edit only sent title and status, but backend PUT replaces every column, so the edit prompt was replaced with an editable modal that sends all fields upon clicking the 'Save' button.

## Next Week Plan

Describe what will be done next.

## Supervisor Notes

To be completed by the practice supervisor if needed.

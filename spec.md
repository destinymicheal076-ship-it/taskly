# Spec: Taskly

## Problem

Students need a simple way to keep track of things they need to do in school.

## Users

Students.

## Core Flow

1. Open Taskly.
2. Add a school task.
3. See it in the task list.
4. Edit the task if needed.
5. Mark it complete.
6. Completed tasks stay in the main list, shown with a checkmark/strikethrough.
7. Delete a task after confirmation.
8. Tasks remain saved when the student closes and returns to Taskly.

## Requirements

- Adding a valid task immediately displays it in the task list.
- The input clears after adding.
- Empty tasks cannot be added and should show the message "Please enter a task."
- Students can edit tasks.
- Completed tasks show a checkmark/strikethrough and remain in the main task list.
- Deleting a task requires confirmation.
- Tasks persist after closing and reopening the app.
- Each task stores: task name and completion status.

## Out of Scope (v1)

- Login/accounts
- Notifications/reminders
- Categories/subjects
- Social features
- Chat
- Payments
- Advanced analytics
- Task date (cut from this pass's scope; tasks do not store or display a date)
- Separate Completed section (cut from this pass's scope; completed tasks stay in the main list instead of moving)

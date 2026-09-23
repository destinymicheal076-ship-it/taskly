# To-Do: Taskly

Scope for this pass (per the 30% scope cut): Add, View, Edit, Complete, Delete, and Save. Task date and a separate Completed section are out of scope for now.

## Setup / Data model

- [ ] Confirm the task object stores: id, text, completed (no `date` field — cut from this pass's scope).
- [ ] Confirm `localStorage` load/save works with this task shape.
- [ ] Handle missing/corrupted `localStorage` data gracefully (start with an empty list, no crash).

## Adding tasks

- [ ] Validate input on submit: trim whitespace, reject empty input.
- [ ] Show "Please enter a task." when the input is empty.
- [ ] Create a new task with id, text, and `completed: false`.
- [ ] Add the task to the `tasks` array and save to `localStorage`.
- [ ] Render the new task in the task list.
- [ ] Clear the input field after a successful add.
- [ ] Test: valid task appears immediately in the list.
- [ ] Test: input clears after adding.
- [ ] Test: empty/whitespace input shows the error message and adds nothing.

## Viewing tasks

- [ ] Render all saved tasks in the list when the app loads.
- [ ] Test: tasks display correctly after loading the app.

## Editing tasks

- [ ] Add an "Edit" action to each task.
- [ ] Let the student change the task text.
- [ ] Validate the edited text is not empty; reject and show "Please enter a task." if it is.
- [ ] Update the task's text in the `tasks` array and save to `localStorage`.
- [ ] Re-render the task with the updated text.
- [ ] Test: editing and saving updates the visible text.
- [ ] Test: editing to an empty value is rejected and old text is kept.
- [ ] Test: edited text persists after reload.

## Completing tasks

- [ ] Add a way to mark a task complete (checkbox or click).
- [ ] Apply a checkmark/strikethrough style to completed tasks in place (no separate Completed section for this pass).
- [ ] Let the student un-mark a completed task, restoring its normal style.
- [ ] Update `completed` status in the `tasks` array and save to `localStorage`.
- [ ] Test: completing a task shows the checkmark/strikethrough style.
- [ ] Test: un-completing a task removes the checkmark/strikethrough style.
- [ ] Test: completion status persists after reload.

## Deleting tasks

- [ ] Add a "Delete" action to each task.
- [ ] Show a confirmation prompt before deleting.
- [ ] On confirm, remove the task from the `tasks` array, save to `localStorage`, and remove it from the DOM.
- [ ] On cancel, leave the task unchanged.
- [ ] Test: delete requires confirmation.
- [ ] Test: confirming delete removes the task permanently (not present after reload).
- [ ] Test: cancelling delete leaves the task in place.

## Persistence

- [ ] Load tasks from `localStorage` on page load and render them.
- [ ] Save the full `tasks` array to `localStorage` after every add, edit, complete/un-complete, and delete.
- [ ] Test: tasks are still correct (text and completion status) after closing and reopening the app.

## Final checks

- [ ] Walk through the full core flow end-to-end once, manually: add, view, edit, complete, delete (with confirmation), and reload to confirm saving.
- [ ] Confirm no out-of-scope features were added (no login, notifications, categories, social features, chat, payments, or analytics).
- [ ] Confirm this checklist's scope cuts (no date, no separate Completed section) are reflected consistently, and flag with the user if `spec.md` still needs updating to match.

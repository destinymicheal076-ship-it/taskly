# Plan: Taskly

This plan explains how to build Taskly, a simple task list for students, according to `spec.md`. It's written to be beginner-friendly: each phase is a small, self-contained step you can build and test before moving to the next one.

## Approach

Taskly stays a single-page app: one HTML file, one CSS file, one JS file, no build tools, no backend. All task data is stored in the browser's `localStorage` so tasks survive closing and reopening the app. Each task is a plain object:

```js
{
  id: "...",        // unique id
  text: "...",      // task name
  completed: false  // completion status
}
```

All tasks live in a single list. Completed tasks stay in that same list and are shown with a checkmark/strikethrough style rather than being moved anywhere. Every change to the `tasks` array is immediately saved to `localStorage` so the student never loses data.

## Phase 1: Adding tasks

- Handle the "add task" form submit.
- Trim the input value. If it's empty, don't add a task — show the message "Please enter a task." near the input instead.
- If the input has valid text, create a task object (with a generated id, the text, and `completed: false`), add it to the `tasks` array, save to `localStorage`, and render it in the task list.
- Clear the input field after a successful add.

**Testing:**
- Adding a task with text shows it in the list right away.
- Adding a task clears the input.
- Submitting an empty or whitespace-only input shows "Please enter a task." and does not add anything.
- The new task appears in the list and is not marked complete.

## Phase 2: Editing tasks

- Let the student click an "Edit" action on a task to turn its text into an editable field (or a simple prompt, whichever is simplest to implement first).
- On save, validate the new text is not empty (same rule as adding). If empty, keep the old text and show "Please enter a task."
- Update the task's `text` in the `tasks` array, save to `localStorage`, and re-render the task with the new text.

**Testing:**
- Editing a task and saving new text updates what's shown in the list.
- Editing a task with an empty value is rejected and the original text is kept.
- The edited text is still there after reloading the page.

## Phase 3: Completing tasks

- Let the student mark a task complete (e.g. a checkbox or a click on the task).
- When a task is marked complete, update its `completed` flag, save to `localStorage`, and show a checkmark/strikethrough style on it in place (it stays in the same list).
- Let the student un-mark a completed task, which removes the checkmark/strikethrough style.

**Testing:**
- Marking a task complete shows the checkmark/strikethrough style, and the task stays in the list.
- Un-marking a completed task removes the checkmark/strikethrough style.
- Completion status is still correct after reloading the page.

## Phase 4: Deleting tasks

- Add a "Delete" action on each task.
- Clicking delete shows a confirmation (e.g. `confirm("Delete this task?")` or a small confirm UI).
- If confirmed, remove the task from the `tasks` array, save to `localStorage`, and remove it from the DOM.
- If not confirmed, do nothing and leave the task as-is.

**Testing:**
- Clicking delete shows a confirmation before anything is removed.
- Confirming deletes the task from the list and it does not come back after reloading.
- Cancelling the confirmation leaves the task untouched.

## Phase 5: Saving and loading tasks

- On page load, read tasks from `localStorage` and render the task list from that data.
- Every add, edit, complete/un-complete, and delete action re-saves the full `tasks` array to `localStorage` right away, so no separate "save" step is needed.

**Testing:**
- Add a few tasks (some complete, some not), close the tab, and reopen the app — all tasks appear with the correct text and completion state.
- With `localStorage` empty (first run), the app starts with an empty task list and no errors.
- Corrupted or missing `localStorage` data doesn't crash the app; it just starts with an empty list.

## Phase 6: Polish and full walkthrough

- Confirm completed tasks are clearly styled (checkmark/strikethrough) while staying in the same list as active tasks.
- Run through the whole core flow end-to-end: open Taskly, add a task, see it listed, edit it, mark it complete, delete it with confirmation, close and reopen the app to confirm persistence.
- Double-check nothing outside `spec.md` was added (no accounts, notifications, categories, social features, chat, payments, analytics, task dates, or a separate Completed section).

**Testing:**
- Full manual walkthrough of the core flow passes without errors.
- Feature checklist matches `spec.md` exactly, with nothing extra.

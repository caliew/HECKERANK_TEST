# Level 2 - Project 01: Debounced Search UI

## The Challenge
Implement a search input that fetches suggestions from an API as the user types. 
However, you MUST implement **Debouncing**.

### Requirements:
1.  The search should NOT trigger an API call on every keystroke.
2.  It should only trigger after the user has stopped typing for **300ms**.
3.  If a new keystroke occurs within that 300ms, the previous timer should be cancelled.
4.  Handle the "Race Condition": If an older API request finishes *after* a newer one, the UI should show the newest data.

### Why this is "Level 2":
It tests your knowledge of **Web APIs (setTimeout)**, **Closures**, and **Asynchronous Control Flow**.

## The "Trick"
You need a `debounce` wrapper function that returns a new function. This new function holds a `timeoutId` in its closure.

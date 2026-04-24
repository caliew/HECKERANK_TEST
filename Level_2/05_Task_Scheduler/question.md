# Level 2 - Project 05: Task Scheduler (Concurrency Control)

## The Challenge
Implement a task scheduler that runs asynchronous tasks but limits the number of **concurrently** running tasks to `N`.

### Requirements:
1.  If you add 10 tasks but `N = 2`, only 2 tasks should run at a time.
2.  As soon as one task finishes, the next one in the queue should start immediately.
3.  The `addTask` function should return a Promise that resolves when that specific task finishes.

### Why this is "Level 2":
It's a common requirement when scraping websites or making many API calls where you don't want to "spam" the server. It tests **Promises** and **Async/Await** mastery.

## The "Trick"
Maintain a `runningCount` and a `queue`. When `runningCount < N`, pull a task from the queue and run it. Use `.finally()` on the task's promise to decrement the count and trigger the next task.

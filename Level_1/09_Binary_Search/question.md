# Q9: Binary Search on Answer (Allocation)

## Problem Description
You have $N$ tasks with different execution times and $K$ workers. All tasks must be assigned to workers, and each worker can only take a contiguous block of tasks. Find the minimum possible "maximum time" a worker spends on their assigned tasks.

## The Trick (Binary Search)
Instead of searching for *who* gets *what*, we search for the **Answer** itself.
1. The answer must be between `max(tasks)` and `sum(tasks)`.
2. Binary search for a value `mid` in this range.
3. For each `mid`, check if it's possible to assign tasks such that no worker exceeds `mid` time.
4. If possible, try a smaller `mid` (left half). Otherwise, try a larger `mid` (right half).

## Example
Input: `tasks = [1, 2, 3, 4, 5], K = 3`
Possible assignment: `[1,2,3], [4], [5]` -> Max is 6.
Output: `6`

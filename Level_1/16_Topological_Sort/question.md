# Q16: Course Schedule (Topological Sort)

## Problem Description
There are $N$ courses you have to take, labeled from 0 to $N-1$. Some courses have prerequisites (e.g., to take course 0 you have to first take course 1). Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to finish all.

## The Trick (Topological Sort / Kahn's Algorithm)
1. Use an **In-degree** array to count how many prerequisites each course has.
2. Put all courses with `in-degree == 0` (no prerequisites) into a **Queue**.
3. While the queue is not empty:
   - Pop a course and add it to your result.
   - For each course that depends on it, decrement its in-degree.
   - If its in-degree becomes 0, add it to the queue.

## Example
Input: `N=2, pre=[[1,0]]`
Output: `[0, 1]`

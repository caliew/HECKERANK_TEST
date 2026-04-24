# Q6: Minimum Cost to Connect Ropes (Merging Files)

## Problem Description
You are given $N$ ropes of different lengths. You need to connect all these ropes into a single rope. The cost to connect two ropes is equal to the sum of their lengths. Find the minimum total cost to connect all $N$ ropes.

## The Trick (Heaps / Priority Queue)
This is a **Greedy** problem that requires a **Min-Heap**.
To minimize the total cost, you should always pick the **two shortest ropes** available, connect them, and then put the resulting rope back into the collection.

A Min-Heap allows you to find and remove the smallest element in $O(\log N)$ time.

## Example
Input: `[4, 3, 2, 6]`
1. Pick 2 and 3. Cost = 5. Remaining: `[4, 6, 5]`
2. Pick 4 and 5. Cost = 5 + 9 = 14. Remaining: `[6, 9]`
3. Pick 6 and 9. Cost = 14 + 15 = 29.
Total Cost: `29`

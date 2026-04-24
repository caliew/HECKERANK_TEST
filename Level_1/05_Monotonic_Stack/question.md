# Q5: Next Greater Element (Building Heights)

## Problem Description
Given an array of heights of $N$ buildings, for each building, find the height of the first building to its right that is strictly taller. If no such building exists, return -1.

## The Trick (Monotonic Stack)
Use a **Stack** to store indices of buildings whose "next greater" has not been found yet.
1. Iterate through the array.
2. While the current height is greater than the height at the index on top of the stack:
   - Pop the index.
   - The current height is the "Next Greater" for that popped index.
3. Push the current index onto the stack.

This ensures each element is pushed and popped exactly once, making it **$O(N)$**.

## Example
Input: `[4, 5, 2, 25]`
Output: `[5, 25, 25, -1]`

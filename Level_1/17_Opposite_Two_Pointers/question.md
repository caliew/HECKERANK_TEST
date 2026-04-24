# Q17: Container With Most Water (Opposite Two-Pointers)

## Problem Description
Given $N$ non-negative integers representing the height of walls, find two walls that together with the x-axis forms a container, such that the container contains the most water.

## The Trick (Opposite Two-Pointers)
1. Place one pointer at the **start** and one at the **end**.
2. Calculate the area: `min(height[left], height[right]) * (right - left)`.
3. **Crucial Move:** Move the pointer that points to the **shorter** wall. Why? Because the width is already shrinking, the only way to find a larger area is to find a taller wall to replace the current shorter one.

## Example
Input: `[1, 8, 6, 2, 5, 4, 8, 3, 7]`
Output: `49` (Walls at index 1 and 8)

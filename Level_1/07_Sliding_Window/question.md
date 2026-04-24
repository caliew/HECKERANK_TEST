# Q7: Longest Subarray with K Distinct Elements

## Problem Description
Given an array and an integer $K$, find the length of the longest contiguous subarray that contains at most $K$ distinct elements.

## The Trick (Sliding Window)
Use two pointers, `left` and `right`, to represent a "window".
1. Expand `right` and add elements to a **Frequency Map**.
2. If the number of keys in the map exceeds $K$, shrink the window from the `left` by removing elements from the map.
3. Keep track of the maximum `right - left + 1`.

This ensures we visit each element at most twice, resulting in **$O(N)$**.

## Example
Input: `arr = [1, 2, 1, 2, 3], K = 2`
Output: `4` (Subarray `[1, 2, 1, 2]`)

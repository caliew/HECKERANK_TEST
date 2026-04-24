# Q12: Subarray Sum Equals K

## Problem Description
Given an array of integers and an integer $K$, find the total number of continuous subarrays whose sum equals $K$.

## The Trick (Prefix Sums + Hashing)
1. Calculate the **Prefix Sum** as you iterate.
2. If `prefixSum - K` has been seen before, it means the subarray between that previous point and the current point sums exactly to $K$.
3. Use a **Map** to store how many times each `prefixSum` has occurred.

This is the standard way to solve range-sum problems in **$O(N)$**.

## Example
Input: `nums = [1, 1, 1], k = 2`
Output: `2` (Indices [0,1] and [1,2])

# Q18: Find the Missing Number (Cyclic Sort)

## Problem Description
You are given an array containing $N$ distinct numbers taken from $0, 1, 2, ..., N$. Find the one that is missing from the array.

## The Trick (Cyclic Sort / Swapping)
If the numbers are in the range $[0, N]$, every number `x` "belongs" at index `x`.
1. Iterate through the array.
2. If `arr[i] < N` and `arr[i] != i`, swap `arr[i]` with the value at `arr[arr[i]]`.
3. After one pass, the first index `i` where `arr[i] != i` is your missing number.

(Alternative math trick: `Sum(0..N) - Sum(arr)`)

## Example
Input: `[3, 0, 1]`
Output: `2`

# Q11: Path to Target Sum (Backtracking)

## Problem Description
Given a set of candidate numbers (without duplicates) and a target number, find all unique combinations in candidates where the candidate numbers sum to the target. (Each number can be used multiple times).

## The Trick (Backtracking)
1. Use a recursive function `backtrack(remaining, startIndex, currentPath)`.
2. If `remaining == 0`, we found a path. Add it to results.
3. If `remaining < 0`, stop (too high).
4. Iterate from `startIndex` to avoid duplicate combinations (like [2,3] and [3,2]).

## Example
Input: `candidates = [2, 3, 6, 7], target = 7`
Output: `[[2, 2, 3], [7]]`

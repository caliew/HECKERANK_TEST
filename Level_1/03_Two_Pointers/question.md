# Q3: Perfect Pairs

## Problem Description
Find the number of pairs `(i, j)` such that `i < j` and the following conditions are met:
1. `min(|arr[i]-arr[j]|, |arr[i]+arr[j]|) <= min(|arr[i]|, |arr[j]|)`
2. `max(|arr[i]-arr[j]|, |arr[i]+arr[j]|) >= max(|arr[i]|, |arr[j]|)`

## The Trick (Two Pointers)
The conditions look complex but simplify to:
**`|y| <= 2 * |x|` where `|x| <= |y|`.**

1. Convert all numbers to their absolute values.
2. Sort the array.
3. For each element at index `right`, find how many elements to its left (`left`) satisfy `arr[right] <= 2 * arr[left]`.
4. Use a sliding window / two pointers to maintain the valid range in $O(N)$.

## Example
Input: `[2, 5, -3]`
Output: `2` (Pairs: (2, -3) and (-3, 5). (2, 5) fails because 5 > 2*2)

# Q10: Coin Change (Ways to make sum)

## Problem Description
Given an array of coin denominations and a target sum, find the number of ways you can make that sum using any number of coins.

## The Trick (Dynamic Programming)
This is the classic **Knapsack** variation.
1. Create a `dp` array of size `sum + 1` initialized with 0.
2. `dp[0] = 1` (There is 1 way to make a sum of 0: use no coins).
3. For each coin, iterate from `coin` to `sum`:
   - `dp[i] += dp[i - coin]`
4. This builds up the number of ways using sub-problems.

## Example
Input: `coins = [1, 2], sum = 4`
Ways: `{1,1,1,1}, {1,1,2}, {2,2}`
Output: `3`

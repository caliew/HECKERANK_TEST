# Q2: Maximize XOR Multiplication

## Problem Description
Given integers `A`, `B`, and `N`, find an integer `X` (where `0 <= X < 2^N`) such that `(A ^ X) * (B ^ X)` is maximized.
Return the maximum product modulo `10^9 + 7`.

## The Trick (Bit Manipulation)
1. Let `A' = A ^ X` and `B' = B ^ X`.
2. Notice that `A' ^ B' = A ^ B`. Let this be `C`.
3. If `C_i = 0` (bits are same in A and B), we can make both `A'_i` and `B'_i` equal to 1.
4. If `C_i = 1` (bits are different), one must be 1 and one must be 0.
5. To maximize the product, we want `A'` and `B'` to be as close as possible.
6. **Strategy:** Give the first (most significant) different bit to `A'`. Give all subsequent different bits to `B'` to help it "catch up."

## Example
Input: `N=3, A=4, B=6`
Output: `35` (A=100, B=110. X=011 makes A'=111(7) and B'=101(5). 7*5=35)

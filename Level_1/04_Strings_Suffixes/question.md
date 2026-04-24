# Q4: Lexicographical Maximum Substring

## Problem Description
Given a string `s`, find the substring that is lexicographically the largest among all possible substrings.

## The Trick (String/Suffixes)
Any substring `S` that is NOT a suffix can be extended by one character to `S + c`.
Since `S` is a prefix of `S + c`, then `S + c` is ALWAYS lexicographically larger than `S`.
Therefore, the maximum substring **must be a suffix**.

Finding the max suffix is $O(N)$ with a clever pointer approach, or $O(N^2)$ with a simple loop (usually passes if $N$ is small).

## Example
Input: `banana`
Output: `nana` (Suffixes: banana, anana, nana, ana, na, a. Max is 'nana')

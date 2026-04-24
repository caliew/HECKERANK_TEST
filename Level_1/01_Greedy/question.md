# Q1: Minimum Operations to Balance Brackets

## Problem Description
You are given a string of parentheses of length `n`. The string has exactly `n/2` opening brackets `(` and `n/2` closing brackets `)`.
In one operation, you can take any bracket and move it to the beginning or the end of the string.
Find the minimum number of operations to make the string balanced.

## The Trick (Greedy)
Since you are guaranteed an equal number of brackets, you only need to worry about the "imbalanced" closing brackets.
A closing bracket `)` is imbalanced if it appears when there are no available opening brackets to its left to match it.
Simply counting these "illegal" closing brackets gives you the minimum moves, because moving them to the end will eventually satisfy the balance.

## Example
Input: `))((`
Output: `2` (Move the two `))` to the end to get `(())`)

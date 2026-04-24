# Q8: Number of Islands

## Problem Description
Given an $M \times N$ 2D grid map of `'1'`s (land) and `'0'`s (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

## The Trick (Graphs / DFS)
1. Iterate through every cell in the grid.
2. When you find a `'1'`, start a **DFS (Depth First Search)** to "sink" the entire island (change all connected `'1'`s to `'0'`s).
3. Increment your island count each time you start a new DFS.

## Example
Input:
```
11000
11000
00100
00011
```
Output: `3`

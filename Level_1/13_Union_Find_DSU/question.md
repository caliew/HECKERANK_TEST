# Q13: Friend Circles (Union-Find)

## Problem Description
There are $N$ students. Some of them are friends, others are not. If A is a friend of B and B is a friend of C, then A is an indirect friend of C. A "Friend Circle" is a group of students who are direct or indirect friends. Find the total number of friend circles.

## The Trick (Union-Find / DSU)
Use a **Disjoint Set Union (DSU)** structure.
1. Initialize each student as their own parent.
2. For each friendship (edge), use the `union(a, b)` function to merge their groups.
3. The number of unique "roots" at the end is the number of circles.

DSU is incredibly fast—almost $O(1)$ per operation with path compression.

## Example
Input: Matrix `[[1,1,0],[1,1,0],[0,0,1]]`
Output: `2` (Students 0 and 1 are in one circle, student 2 is in another)

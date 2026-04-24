# Level 2 - Project 04: Nested Comments (Recursive UI)

## The Challenge
Given a flat list of comments with `id` and `parentId`, transform them into a nested tree structure and implement a function to display them.

### Requirements:
1.  Convert the flat array into a tree where each comment has a `replies` array.
2.  Implement a function that "renders" the tree with indentation for each level.

### Why this is "Level 2":
Real-world data is often stored "flat" in databases for efficiency but needs to be "tree-like" for the UI. This tests **Recursion** and **Data Mapping**.

## The "Trick"
Use a **Map** for $O(N)$ lookup. First, put every comment into the map. Then, iterate through the list and attach each comment to its parent's `replies` array.

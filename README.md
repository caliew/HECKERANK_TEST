# 🏆 Heckerank Test Preparation Roadmap

Welcome to your ultimate preparation workspace! This repository is organized into three levels of increasing complexity, designed to master everything from foundational algorithms to advanced systems engineering and low-level object-oriented design.

---

## 🗺️ Workspace Structure

```text
HECKERANK_TEST
├── 📂 Level_1  (18 Core Data Structures & Algorithms Patterns)
├── 📂 Level_2  (6 Machine Coding & System Design Systems)
└── 📂 Level_3  (Low-Level Design / Object-Oriented Patterns)
```

---

## 🎯 Level 1 — Core Data Structures & Algorithms (DSA)

This level is dedicated to mastering standard algorithmic problem-solving. Almost all competitive programming and technical screening questions are derived from these **18 foundational patterns**.

> 💡 **Reference Cheat Sheet:** You can view a consolidated summary of when to use which algorithm in [Level 1 Cheat Sheet](./Level_1/information.md).

| `#` | Pattern / Algorithm | Focus & Core Concept | Directory Link |
|:---:|:---|:---|:---|
| **01** | **Greedy** | Local optimization to achieve global optima | [01_Greedy](./Level_1/01_Greedy) |
| **02** | **Bit Manipulation** | Binary arithmetic, XOR properties, and fast shifts | [02_Bit_Manipulation](./Level_1/02_Bit_Manipulation) |
| **03** | **Two Pointers** | Fast/slow, sliding bounds, and pair counting | [03_Two_Pointers](./Level_1/03_Two_Pointers) |
| **04** | **Strings & Suffixes** | Suffix trees, dictionary sorting, and string tricks | [04_Strings_Suffixes](./Level_1/04_Strings_Suffixes) |
| **05** | **Monotonic Stack** | "Next greater/smaller" element problems in $O(N)$ | [05_Monotonic_Stack](./Level_1/05_Monotonic_Stack) |
| **06** | **Heaps / Priority Queues** | Merging optimization, K-largest elements, and binary heaps | [06_Heaps_Priority_Queues](./Level_1/06_Heaps_Priority_Queues) |
| **07** | **Sliding Window** | Contiguous subarray/substring search under constraints | [07_Sliding_Window](./Level_1/07_Sliding_Window) |
| **08** | **Graphs (BFS & DFS)** | Grid flood-filling, island counts, and matrix traversals | [08_Graphs_BFS_DFS](./Level_1/08_Graphs_BFS_DFS) |
| **09** | **Binary Search** | "Binary search on answer" bounds optimization | [09_Binary_Search](./Level_1/09_Binary_Search) |
| **10** | **Dynamic Programming** | Overlapping subproblems, state machines, and memoization | [10_Dynamic_Programming](./Level_1/10_Dynamic_Programming) |
| **11** | **Backtracking** | Exhaustive combinatorial search with pruning rules | [11_Backtracking](./Level_1/11_Backtracking) |
| **12** | **Prefix Sums & Hashing** | Constant time range-sum queries and instant lookups | [12_Prefix_Sums_Hashing](./Level_1/12_Prefix_Sums_Hashing) |
| **13** | **Union Find / DSU** | Dynamic connectivity, disjoint-set joins, and cycle checks | [13_Union_Find_DSU](./Level_1/13_Union_Find_DSU) |
| **14** | **Shortest Path (Dijkstra)** | Shortest route in weighted directed/undirected graphs | [14_Shortest_Path_Dijkstra](./Level_1/14_Shortest_Path_Dijkstra) |
| **15** | **Trie (Prefix Tree)** | Extremely fast prefix searches and autocomplete matching | [15_Trie_Prefix_Tree](./Level_1/15_Trie_Prefix_Tree) |
| **16** | **Topological Sort** | Job dependency scheduling and directed acyclic graphs | [16_Topological_Sort](./Level_1/16_Topological_Sort) |
| **17** | **Opposite Two Pointers** | Mirror convergence bounds from both ends of an array | [17_Opposite_Two_Pointers](./Level_1/17_Opposite_Two_Pointers) |
| **18** | **Cyclic Sort** | Sorting arrays containing values in range `1` to `N` in-place | [18_Cyclic_Sort](./Level_1/18_Cyclic_Sort) |

---

## 🏗️ Level 2 — Machine Coding & Applied Utilities

This level tests your ability to design working systems, manage concurrency, write clean asynchronous JavaScript, and organize high-performance code structures.

> 💡 **Reference Cheat Sheet:** You can view a consolidated summary of architectural and design patterns in [Level 2 Cheat Sheet](./Level_2/information.md).

| Module | System / Concept | Key Focus area | Directory Link |
|:---|:---|:---|:---|
| **01** | **Debounced Search** | Performance rate-limiting, timing events, and search UI control | [01_Debounced_Search](./Level_2/01_Debounced_Search) |
| **02** | **LRU Cache** | Hybrid hashmap and doubly linked list data structure in $O(1)$ | [02_LRU_Cache](./Level_2/02_LRU_Cache) |
| **03** | **Rate Limiter** | Token Bucket/Sliding Window system security scaling | [03_Rate_Limiter](./Level_2/03_Rate_Limiter) |
| **04** | **Nested Comments** | Rendering and handling deep, self-referential graph/tree systems | [04_Nested_Comments](./Level_2/04_Nested_Comments) |
| **05** | **Task Scheduler** | Async task queue limits, priority concurrency control | [05_Task_Scheduler](./Level_2/05_Task_Scheduler) |
| **06** | **Removable Indices** | Complex array binary optimizations and validation | [06_Removable_Indices](./Level_2/06_Removable_Indices) |

---

## 🚀 Level 3 — Low-Level Design (LLD)

Focuses on **Object-Oriented Design (OOD)**, Clean Code patterns, and strict adherence to **SOLID Principles**.

* **Mars Rover Problem**: Implement the clean state/command orchestration system for an autonomous rover.
  * **Directory Link:** [Mars Rover](./Level_3/Mars_Rover)
  * **Design Patterns:** Command Pattern, State Pattern, Strategy Pattern.

---

## 📚 Study Recommendations

1. **Keep it Dry & Performant:** Always consider time vs. space complexity ($O(N)$ vs $O(N^2)$).
2. **Review the Information Cheat Sheets:** Keep the [Level 1 Cheat Sheet](./Level_1/information.md) and [Level 2 Cheat Sheet](./Level_2/information.md) open to quickly match concepts with optimal solutions.
3. **Verify:** Check your work by running the test suite command (`node solution.js`) inside each corresponding directory!

# Level 1 — Algorithm Pattern Recognition Cheat Sheet

Use this guide to quickly identify **which algorithm to use** based on the problem description.

---

## 🔍 Pattern Recognition

| If the problem says... | Use this Algorithm | Level |
|---|---|---|
| "Minimize/maximize locally at each step to get a global optimal solution" | **Greedy** | Q1 |
| "Maximize a product using XOR / bit operations" | **Bit Manipulation** | Q2 |
| "Count pairs satisfying a min/max condition in a sorted list" | **Two Pointers** | Q3 |
| "Find the lexicographically largest string/substring" | **Suffix / String Trick** | Q4 |
| "First element taller/larger/smaller to the right/left" | **Monotonic Stack** | Q5 |
| "K smallest/largest elements" / "Minimize total cost of merging" | **Heap / Priority Queue** | Q6 |
| "Find the max/min length of a contiguous block matching a condition" | **Sliding Window** | Q7 |
| "Count connected components / flood-fill in a grid or graph" | **Graphs / BFS / DFS** | Q8 |
| "Minimize the maximum value of a budget/capacity allocation limit" | **Binary Search** | Q9 |
| "Find the number of ways to make a target sum using coin combinations" | **Dynamic Programming** | Q10 |
| "Find all unique paths/combinations that sum up to a target" | **Backtracking** | Q11 |
| "Find total count of continuous subarrays whose sum equals K" | **Prefix Sums & Hashing** | Q12 |
| "Count dynamic connected components (friend groups) / detect cycles" | **Union-Find / DSU** | Q13 |
| "Find the minimum time/cost to travel from a source node to all nodes" | **Shortest Path (Dijkstra)** | Q14 |
| "Suggest search dictionary words sharing the same typed prefix" | **Trie (Prefix Tree)** | Q15 |
| "Determine linear dependency schedule of courses with prerequisites" | **Topological Sort** | Q16 |
| "Find the maximum area bounded by two walls (container with most water)" | **Opposite Two Pointers** | Q17 |
| "Find the missing or duplicate number in a strict finite range [0, N]" | **Cyclic Sort** | Q18 |

---

## 🧠 Quick Concept Summaries

### Q2 — Bit Manipulation
- **Key Idea:** Process bits from MSB to LSB (greedy).
- **When bits are the same:** Flip both to `1` (maximizes both numbers).
- **When bits differ:** Transfer the `1` to the smaller number (keeps them balanced).
- **Complexity:** $O(N)$

---

### Q3 — Two Pointers (Sorted Array Pairing)
- **Key Idea:** Sort absolute values, then use a `left` boundary.
- **Condition:** A pair `(x, y)` is valid if `|y| <= 2 * |x|` (where `|x| <= |y|`).
- **Count:** For each `right`, count `right - left` valid partners to its left.
- **Complexity:** $O(N \log N)$ (due to sort)

---

### Q4 — Strings / Suffixes
- **Key Idea:** The lexicographically largest substring is **always a suffix**.
- **Why:** Any non-suffix can be extended by one more character, making it even larger.
- **Algorithm:** Compare suffixes using a 3-pointer approach (champion vs. challenger).
- **Complexity:** $O(N)$

---

### Q5 — Monotonic Stack
- **Key Idea:** Use a stack as a "waiting room" for elements that haven't found their answer yet.
- **Rule:** When a new (larger) element arrives, it resolves all smaller elements waiting in the stack.
- **Stack property:** Always decreasing from bottom to top.
- **Complexity:** $O(N)$

---

### Q6 — Heaps / Priority Queues
- **Key Idea:** Always pick the **two smallest** elements to merge. Use a Min-Heap.
- **Min-Heap Property:** Parent is always smaller than its children.
- **Storage:** Stored as a flat array. Parent/child positions found using index math:
  - Parent of index `i`: `Math.floor((i - 1) / 2)`
  - Left child of `i`: `2 * i + 1`
  - Right child of `i`: `2 * i + 2`
- **Insertion / Deletion:** `bubbleUp` and `bubbleDown` swap along a single path in $O(\log N)$.
- **Complexity:** $O(N \log N)$

---

### Q7 — Sliding Window
- **Key Idea:** Use a `left` and `right` pointer to define a moving "window" (frame).
- **Expand:** Move `right` forward to grow the window.
- **Shrink:** Move `left` forward when the window becomes invalid.
- **Track:** Keep a Frequency Map (`Map`) to count distinct elements inside the window.
- **Complexity:** $O(N)$

---

### Q8 — Graphs / BFS / DFS
- **Key Idea:** When you find an unvisited land cell (`'1'`), use DFS to sink the **entire connected island**.
- **Sinking Trick:** Change visited `'1'`s to `'0'`s to avoid counting the same island twice.
- **DFS:** Recursively visit all 4 neighbors (up, down, left, right).
- **Complexity:** $O(M \times N)$ where M and N are the grid dimensions.

---

### Q9 — Binary Search on Answer
- **Key Idea:** Instead of searching for the *assignment*, search for the **boundary of the optimal answer** directly in the sorted range of possible answers `[low, high]`.
- **Low Boundary:** The minimum possible valid answer (typically `Math.max(...elements)`).
- **High Boundary:** The maximum possible valid answer (typically `sum(elements)`).
- **Evaluation:** For each candidate `mid`, run a greedy check `canAssign(mid)`. 
  - If possible: save `mid`, try smaller values by searching the left half (`high = mid - 1`).
  - If impossible: try larger values by searching the right half (`low = mid + 1`).
- **Complexity:** $O(N \log(\text{high} - \text{low}))$

---

### Q10 — Dynamic Programming (Coin Change)
- **Key Idea:** Use sub-problem solutions to build the final answer (a variation of the Knapsack problem).
- **Tabulation:** Create a `dp` array of size `targetSum + 1` representing the number of ways to make each sum.
  - Base case: `dp[0] = 1` (1 way to make a sum of 0: use no coins).
  - For each coin, iterate from `coin` to `targetSum`, adding the combinations: `dp[i] += dp[i - coin]`.
- **Complexity:** $O(N \times \text{targetSum})$ time and $O(\text{targetSum})$ space.

---

### Q11 — Backtracking (Combination Sum)
- **Key Idea:** Recursively build potential solutions step-by-step, backtracking (removing choices) when a path fails or exceeds boundaries.
- **Deduplication:** Sort the candidates and pass a `startIndex` to recursive calls so that we only look forward, preventing duplicate combinations (e.g. `[2,3]` and `[3,2]`).
- **Pruning:** Stop searching immediately (`return`) when the remaining target sum becomes negative.
- **Complexity:** Exponential time (typical for backtracking), but heavily optimized via pruning.

---

### Q12 — Prefix Sums & Hashing (Subarray Sum Equals K)
- **Key Idea:** Maintain a running cumulative sum (`prefixSum`) as you scan the array.
- **The Equation:** If $PrefixSum[j] - PrefixSum[i] = K$, then the subarray between $i+1$ and $j$ sums exactly to $K$. This is rewritten as $PrefixSum[j] - K = PrefixSum[i]$.
- **Hashmap Speedup:** Store the frequency of each `prefixSum` in a Map. At each index, look up `prefixSum - K` in the map and add its frequency to your count.
- **Complexity:** $O(N)$ time and $O(N)$ space.

---

### Q13 — Union-Find / DSU (Friend Circles)
- **Key Idea:** Model dynamic relationships using a Disjoint Set Union (DSU) structure to group elements into connected components.
- **Two Core Operations:**
  - `find(i)`: Find the absolute root leader of element `i` (uses *Path Compression* to flatten the tree for instant subsequent lookups).
  - `union(i, j)`: Merge the groups containing elements `i` and `j` under a single root.
- **Complexity:** Almost $O(1)$ per operation ($O(\alpha(N))$ time where $\alpha$ is the Inverse Ackermann function).

---

### Q14 — Shortest Path (Dijkstra)
- **Key Idea:** Find the shortest path from a single source node to all other nodes in a weighted graph.
- **The Min-Heap Trick:** Always process the node with the **shortest accumulated distance** first.
- **Relaxation:** For the active node, check all its outgoing neighbors. If traveling through the active node offers a shorter path than their currently known shortest distance, update their distance and push the neighbor onto the Min-Heap.
- **Complexity:** $O((E + V) \log V)$ time where $E$ is the number of edges and $V$ is the number of vertices.

---

### Q15 — Trie / Prefix Tree (Search Suggestions)
- **Key Idea:** Store strings in a retrieval tree (Trie) where each node represents a character. Excellent for prefix matching.
- **Caching Suggestion Lists:** During insertions, store sorted dictionary words directly at every node they traverse. When query auto-completion is typed, navigate directly to that prefix node and instantly retrieve the pre-stored suggestions.
- **Complexity:** $O(L)$ time for search queries where $L$ is the length of the prefix.

---

### Q16 — Topological Sort (Course Schedule)
- **Key Idea:** Find a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge $U \to V$, $U$ comes before $V$.
- **Kahn's Algorithm (BFS):**
  1. Count the number of incoming edges (**In-degree**) for each vertex.
  2. Enqueue all vertices with an `in-degree` of 0 (no prerequisites).
  3. While queue is not empty, pop a vertex, append it to the order, decrement in-degrees of all its neighbors, and enqueue neighbors that hit 0 in-degree.
- **Complexity:** $O(V + E)$ time and $O(V + E)$ space.

---

### Q17 — Opposite Two Pointers (Container With Most Water)
- **Key Idea:** Place two pointers at the absolute boundaries (`left = 0`, `right = N-1`) and converge inward.
- **Greedy Shifting:** Calculate the active container area, then move the pointer pointing to the **shorter wall**. Since narrowing the width always hurts the volume, the only way to find a larger area is to search for a taller wall to replace the shorter one.
- **Complexity:** $O(N)$ time and $O(1)$ space.

---

### Q18 — Cyclic Sort (Find Missing Number)
- **Key Idea:** When an array contains numbers in a strict finite range (e.g. `0` to `N` or `1` to `N`), sort the elements in-place in linear time without comparison.
- **The In-Place Swap:** Every value `x` belongs at index `x`. Scan the array, and if `arr[i] != i` (and `arr[i] < N`), swap `arr[i]` with the element at `arr[arr[i]]` to place it in its correct slot. Repeat until the current element belongs at index `i`.
- **Complexity:** $O(N)$ time and $O(1)$ space.

---

## 🔀 Array Pointer Patterns: Key Differences

Often, Binary Search, Two Pointers, and Sliding Window get confused because they all use two boundaries (pointers) to process arrays. Here is how to immediately tell them apart:

### 1. Pointer Mechanics & Visual Differences
- **Binary Search (Jumping Inward):** Discards **half of the remaining search space** in every single step by jumping `low` or `high` directly to the `mid` boundaries.
- **Two Pointers (Inward Convergence):** Pointers start at opposite ends (`left = 0`, `right = N-1`) and move **towards each other** step-by-step to meet in the middle.
- **Sliding Window (Same-Direction Caterpillar):** Pointers start at the beginning (`left = 0`, `right = 0`) and move **in the same direction**. The space between them represents a contiguous subarray.

### 2. Conceptual Selection Guide

| Pattern | Use Case / "If the problem asks..." | Pre-requisites | Derived / Similar Patterns |
|---|---|---|---|
| **Binary Search** | "Find a specific value," or "Minimize the maximum value of a budget/capacity constraint." | Sorted array or a sorted range of potential answers. | - Standard Binary Search<br>- Binary Search on Answer (Allocation)<br>- Find Peak Element |
| **Two Pointers** | "Find a pair/triplet that sums to X," or "Count pairs satisfying an absolute limit." | Typically sorted array (or sort first). | - Opposite End convergence<br>- Fast & Slow Pointers (Floyd's Cycle)<br>- Three Pointers |
| **Sliding Window** | "Find the longest/shortest contiguous block," or "Find a consecutive subarray matching a criteria." | Unsorted/sorted array where elements are contiguous. | - Fixed-size Window<br>- Variable-size Window<br>- Two-pointer Sliding Window |

---

## 🗂️ Algorithmic Families & Problem Groupings

Rather than memorizing 18 individual algorithms, think of them as belonging to **5 main families**. If a problem belongs to a certain family, you instantly narrow your choice to its members:

### 1. 🔀 Array & Index Manipulation Family (Linear Parsing)
*These solve array puzzles, contiguous subarrays, indexing missing items, or matching pairings in $O(N)$ or $O(N \log N)$ time.*
* **Opposite Two Pointers (Q17):** Converges inwards from both ends (e.g. wall height comparisons, maximum water).
* **Two Pointers (Q3):** Compares indices side-by-side or paired (e.g. counting valid sum partners).
* **Sliding Window (Q7):** Analyzes moving contiguous blocks or sub-segments (e.g. max sum subarray, distinct substrings).
* **Cyclic Sort (Q18):** Places integers in-place at their matching index (`val` goes to `arr[val]`) to spot duplicates or missing elements.

### 2. 🌲 Graphs, Connectivity & Networks Family
*These model and traverse networks, relational cycles, topological dependencies, or short routes.*
* **Graphs BFS & DFS (Q8):** Grid navigation, connected clusters (islands), and flood filling.
* **DSU / Union-Find (Q13):** Dynamic connectivity updates (e.g. tracking friends, union merges, fast cycle detection).
* **Topological Sort (Q16):** Linear ordering of dependencies (e.g. course schedules, package installer pipelines).
* **Dijkstra's Algorithm (Q14):** Shortest paths on weighted network edges.

### 3. 🔍 Search & Range Optimization Family
*These reduce search boundaries or search dictionary elements via specialized trees.*
* **Binary Search (Q9):** Discards half the search space. Used for target queries or optimizing a capacity boundary ("binary search on answer").
* **Trie / Prefix Tree (Q15):** Character-branching tree for prefix lookups and autocomplete suggestions.

### 4. 📈 Space-Time Accumulation & Ordering Family
*These buffer and sort elements in specialized structures to resolve continuous order-based queries.*
* **Monotonic Stack (Q5):** Holds decreasing/increasing elements to find "next greater/smaller" indices in a single pass.
* **Heaps / Priority Queues (Q6):** Dynamically tracks the minimum/maximum of a stream of elements for optimal merge operations.
* **Prefix Sums & Hashing (Q12):** Computes range-sum queries instantly by storing running totals in a Map.

### 5. 🧠 Decision Trees & Optimization Family
*These solve complex combinatorial paths, subset selection, or minimization/maximization problems.*
* **Greedy (Q1):** Makes the immediate, best local move at each step (e.g. MSB to LSB bits, minimal connection rope merges).
* **Bit Manipulation (Q2):** Low-level bit calculations and subset masking.
* **Backtracking (Q11):** Explores all combinations recursively and prunes invalid subtrees (combination sums).
* **Dynamic Programming (Q10):** Prevents duplicate computation by tabulating/memoizing overlapping subproblems (coin combinations).

---

## 🛠️ The 4 Core Data Structure Building Blocks

Under the hood, there are no "18 separate algorithms." All of them are just different ways of utilizing **4 basic programming tools**:

### 1. 🔀 The "Simple Pointer" Family (Just Arrays & Indexes)
*These use nothing but a standard array and 1 or 2 pointer indexes (`left`, `right`, `i`, `j`). No fancy dynamic storage structures!*
- **Q1 (Greedy) & Q2 (Bit Manipulation):** A single loop. Scan left-to-right, making optimal choices on the spot.
- **Q3 (Two Pointers) & Q17 (Opposite Pointers):** Two index boundaries (`i = 0`, `j = N-1`) moving towards each other.
- **Q4 (Suffixes) & Q7 (Sliding Window):** A sub-segment frame defined by `left` and `right` moving in the same direction.
- **Q18 (Cyclic Sort):** A loop swapping index coordinates in-place: `[arr[i], arr[correct]] = [arr[correct], arr[i]]`.

### 🗃️ 2. The "Seen It Before" Family (Sets & Maps)
*These use a Set (to check duplicates) or a Map (to count frequencies) to optimize search time from $O(N)$ to $O(1)$.*
- **Q12 (Prefix Sums & Hashing):** Summing values and checking the Map dynamically: `map.has(currentSum - target)`.
- **Q13 (Union-Find / DSU):** A parent mapping structure: `parentMap.set(child, parent)`. If nodes share the same root, they are connected.
- **Q15 (Trie / Prefix Tree):** A nested object of character keys: `{c: {a: {t: {isWord: true}}}}` for instant path navigation.

### 🥞 3. The "Waiting Room" Family (Stacks & Queues)
*These use a temporary array buffer (`[]`) to process items sequentially: LIFO (`push`/`pop`) or FIFO (`push`/`shift`).*
- **Q5 (Monotonic Stack):** A LIFO stack. Values wait inside the buffer until a larger number arrives to resolve them.
- **Q6 (Heaps) & Q14 (Dijkstra):** A binary tree buffer that keeps itself sorted. You always pop the smallest/largest value.
- **Q16 (Topological Sort):** A FIFO queue. Decrement dependency counts and enqueue items as soon as they hit 0 prerequisites.

### 🌀 4. The "Deep Search" Family (Recursion & Nested Loops)
*These solve complex search options by dividing problems, guessing middle boundaries, or exploring recursive state-space branches.*
- **Q9 (Binary Search):** A simple `while (low <= high)` loop calculating `mid = (low+high)/2` to halve options in each step.
- **Q8 (Graphs DFS/BFS):** Nested coordinate loops calling a helper `dfs(r, c)` that recursively visits all 4 adjacent directions.
- **Q11 (Backtracking):** A recursive loop executing: Make choice (`path.push()`), Go deep (`backtrack()`), Undo choice (`path.pop()`).
- **Q10 (Dynamic Programming):** A flat grid tabulation filled step-by-step using nested loops to accumulate combinations.

---

## 🗓️ Terms to Remember

| Term | Meaning |
|---|---|
| **Subarray** | Contiguous (connected) slice of an array. No skipping allowed. |
| **Subsequence** | Elements in order, but skipping is allowed. |
| **Lexicographic** | Dictionary / alphabetical order. |
| **Monotonic** | Strictly increasing or decreasing in one direction. |
| **Greedy** | Always make the locally optimal choice at each step. |
| **Min-Heap** | A tree where every parent is smaller than its children. |

# Level 2 — Machine Coding & Applied Systems Cheat Sheet

Use this guide to master real-world coding implementations, asynchronous control flows, API throttling, caching engines, and complex tree rendering.

---

## 🔍 Pattern Recognition & System Architectures

| Project / Pattern | Core Technical Challenge | Standard Solution Pattern | Real-World Application |
|---|---|---|---|
| **01 Debounced Search** | Performance throttling & Race Conditions | Wrapper holding `timeoutId` inside a **Closure** + Request IDs | Search auto-complete inputs, resizing windows |
| **02 LRU Cache** | $O(1)$ operations with eviction policy | **JS Map** (ordered insertion) or **Hashmap + Doubly Linked List** | Session storage, database caching |
| **03 Rate Limiter** | API security & request throttling | **Sliding Window Log** using timestamp queues per user | API rate-limiting, DDoS prevention |
| **04 Nested Comments** | Linear tree building from flat arrays | Adjacency lookup **Map** in $O(N)$ (avoiding $O(N^2)$ recursion) | Reddit/Facebook threads, folder structures |
| **05 Task Scheduler** | Concurrency bounds & queue execution | **Promise Wrapper Queue** with recursive run triggers | Thread pools, async request throttling |
| **06 Removable Indices** | String parsing performance optimization | **Prefix (L) & Suffix (R) boundary matching** in $O(N)$ | Text diffing, syntax error corrections |

---

## 🧠 System Architectures & Key Concepts

### L2_01 — Debounced Search
- **Core Problem:** Triggering API calls on every keystroke floods the network. Slow older requests might resolve *after* fast newer ones, causing incorrect UI rendering (Race Condition).
- **The Remedy:**
  - **Debounce:** Wrap the trigger function inside a closure containing `timeoutId`. Clear the timer on every keystroke and only execute when the user pauses for `delay` ms.
  - **Race Condition Guard:** Maintain a global `lastQueryId = 0`. Each time a debounced call starts, increment this ID and store its local copy. After `await API`, only render if the local copy matches the global `lastQueryId`.
- **Complexity:** $O(1)$ timing overhead.

---

### L2_02 — LRU Cache (Least Recently Used)
- **Core Problem:** Keep up to `Capacity` items. When adding an item past capacity, evict the item that hasn't been accessed for the longest time. Operations must be **$O(1)$**.
- **JavaScript Map Trick:** JavaScript `Map` preserves insertion order.
  - **Read (`get`):** If key exists, `delete(key)` and immediately `set(key, value)`. This moves it to the end of the insertion order (representing Most Recently Used).
  - **Write (`put`):** If key exists, `delete(key)`. Add `set(key, value)`. If size exceeds capacity, evict the oldest key using `this.cache.keys().next().value` (the first key in the map).
- **Classic Low-Level Design:** In languages without ordered maps, implement this using a **Hashmap** (for $O(1)$ lookup) and a **Doubly Linked List** (for $O(1)$ node relocation and eviction).

---

### L2_03 — Rate Limiter (Sliding Window Log)
- **Core Problem:** Limit a user to `limit` requests within a rolling window of `windowMs` (e.g., 3 requests per 1000ms).
- **The Algorithm:**
  - Maintain a map: `userId` $\to$ `[timestamps of requests]`.
  - Upon request, fetch current timestamp `now`.
  - Filter out all timestamps in the user's queue that are older than `now - windowMs`.
  - If the remaining length is less than `limit`, push `now` to the queue and approve the request.
  - Otherwise, reject the request (throttled).
- **Complexity:** $O(K)$ where $K$ is the limit per window.

---

### L2_04 — Nested Comments Tree
- **Core Problem:** Given a flat list of items with `id` and `parentId`, rebuild them into a hierarchical tree structure. 
- **The $O(N)$ Map Pattern:**
  - Avoid recursive lookup loops (which take $O(N^2)$ time).
  - First, populate a `Map` of `id` $\to$ `{...comment, replies: []}`.
  - Iterate through the flat array once:
    - If `parentId === null`, push the map reference to the `root` tree array.
    - If `parentId` exists, fetch the parent from the map and push the child directly to `parent.replies`.
  - Because objects are passed by reference, this constructs the entire nested tree in a single linear pass!

---

### L2_05 — Task Scheduler (Concurrency)
- **Core Problem:** Execute asynchronous tasks, but limit active executions to a maximum concurrency `C`. Remaining tasks must wait in a queue.
- **The Promise Queue Pattern:**
  - Store a queue of tasks, along with their `resolve` and `reject` handles inside a Promise.
  - Maintain `runningCount`.
  - In `runNext()`:
    - If `runningCount >= concurrency` or `queue.length === 0`, stop.
    - Increment `runningCount`, shift a task from the queue, and execute it.
    - Chain `.finally(() => { runningCount--; runNext(); })` to automatically launch the next waiting task as soon as one finishes.

---

### L2_06 — Removable Indices
- **Core Problem:** Find indices in `str1` (length $M$) that, when deleted, match `str2` (length $M - 1$) in $O(N)$ time.
- **The Boundary Match Pattern:**
  - Do NOT slice and compare strings (which takes $O(N^2)$ time).
  - Find the **Longest Common Prefix** length `L` from the start: `str1[L] === str2[L]`.
  - Find the **Longest Common Suffix** length `R` from the end: `str1[n - 1 - R] === str2[m - 1 - R]`.
  - Any index `i` that lies in the overlapping boundary `[n - 1 - R, L]` can be safely removed because everything before it matches the prefix and everything after it matches the suffix!

---

## 🗂️ Architectural Families & Problem Groupings

Just like the DSA patterns in Level 1, these 6 applied systems and utility projects belong to **3 core families of practical systems engineering**. Grouping them makes it easier to understand their relationships:

### 1. ⏱️ Rate Limiting & Flow Control Family
*These systems regulate the speed, frequency, or timing of operations, requests, or events over time to optimize bandwidth and enforce safety limits.*
* **01 Debounced Search:**
  * **Goal:** Throttle rapid user events (like keystrokes) and resolve execution order.
  * **Group Connection:** Relies on **asynchronous timers (`setTimeout`)** and **closures** to delay actions. Prevents race conditions by tagging asynchronous flows with execution IDs.
* **03 Rate Limiter (Sliding Window Log):**
  * **Goal:** Restrict API calls per user within a rolling duration window.
  * **Group Connection:** Monitors the timeline of requests. Tracks timestamps in a queue and uses dynamic filtering to reject requests that exceed safety thresholds.

### 2. 🥞 Resource Buffering, Caching & Concurrency Family
*These systems manage resources with strict capacity limits, optimizing storage or active thread execution slots.*
* **02 LRU Cache (Least Recently Used):**
  * **Goal:** A memory-bound key-value store that automatically discards the oldest, unaccessed data.
  * **Group Connection:** Optimizes data access performance. Relies on insertion order to relocate active elements to the "most recent" slot and evicts from the boundary.
* **05 Task Scheduler (Concurrent Queue):**
  * **Goal:** Restricts active concurrent Promise tasks to a maximum cap `C`, queueing up the remaining tasks.
  * **Group Connection:** Manages concurrency starvation and thread pools. Uses a Promise-based FIFO queue buffer and recursively schedules new workers as active ones resolve.

### 3. 🌲 Tree Modeling & Complex Index Parsing Family
*These optimize representation and extraction of structural relationships (hierarchies or linear boundary overlaps).*
* **04 Nested Comments:**
  * **Goal:** Builds a nested tree structure out of flat relational rows with child-to-parent pointers.
  * **Group Connection:** Solves tree hierarchy representation. Groups elements in linear $O(N)$ lookup maps using reference sharing instead of slow nested recursive lookups.
* **06 Removable Indices:**
  * **Goal:** Spots matching string alignments after deletions in $O(N)$ linear time.
  * **Group Connection:** Performs structural parsing. Maps boundaries by matching intersecting prefix/suffix sequences from opposite directions to identify valid modification indices.

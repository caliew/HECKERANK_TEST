# Level 2 - Project 02: LRU Cache (Least Recently Used)

## The Challenge
Design and implement a data structure for **Least Recently Used (LRU) Cache**. 
It should support the following operations: `get` and `put`.

### Requirements:
1.  `get(key)`: Get the value of the key if the key exists in the cache, otherwise return -1.
2.  `put(key, value)`: Update or insert the value if the key is not already present. When the cache reaches its **capacity**, it should invalidate the least recently used item before inserting a new item.
3.  **Performance:** Both operations must be **O(1)**.

### Why this is "Level 2":
To get $O(1)$ for both, you can't just use an Array (which is $O(N)$ to find/remove). You need a combination of a **Hash Map** (for fast lookup) and a **Doubly Linked List** (for fast re-ordering).

## The "Trick"
In JavaScript, the `Map` object actually maintains insertion order. You can leverage this to build a very clean LRU cache without manually building a Linked List!

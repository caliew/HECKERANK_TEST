# Q14: Shortest Path (Dijkstra)

## Problem Description
Given a network of $N$ nodes (servers) and travel times between them (weighted edges), find the minimum time it takes for a signal to travel from a source node $K$ to all other nodes.

## The Trick (Dijkstra)
1. Use a **Min-Heap** (Priority Queue) to store `(time, node)`.
2. Start with `(0, source)`.
3. Always pop the node with the **smallest** accumulated time.
4. For its neighbors, if `currentTime + edgeWeight` is smaller than their current known distance, update and push to the heap.

## Example
Input: `times = [[2,1,1],[2,3,1],[3,4,1]], N = 4, K = 2`
Output: `2` (Signal reaches all nodes in 2 units of time)

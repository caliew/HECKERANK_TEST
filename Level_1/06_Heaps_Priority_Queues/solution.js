
/**
 * Q6: Min cost to connect ropes.
 * Logic: Use a Min-Heap to always pick the two smallest elements.
 * (Note: JS doesn't have a built-in Priority Queue, so we'll use a simple sorted array for demonstration, 
 * but in a real test, you'd implement a Heap or use a library).
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    size() {
        return this.heap.length;
    }

    bubbleUp(idx) {
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[idx] >= this.heap[parentIdx]) break;
            [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
            idx = parentIdx;
        }
    }

    bubbleDown(idx) {
        const length = this.heap.length;
        while (true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let smallest = idx;

            if (leftIdx < length && this.heap[leftIdx] < this.heap[smallest]) {
                smallest = leftIdx;
            }
            if (rightIdx < length && this.heap[rightIdx] < this.heap[smallest]) {
                smallest = rightIdx;
            }
            if (smallest === idx) break;

            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

/**
 * Optimized O(N log N) approach using a Min-Heap.
 */
function minCostToConnectOptimized(ropes) {
    const heap = new MinHeap();
    for (let rope of ropes) {
        heap.push(rope);
    }

    let totalCost = 0;
    while (heap.size() > 1) {
        let first = heap.pop();
        let second = heap.pop();
        let cost = first + second;
        totalCost += cost;
        heap.push(cost);
    }
    return totalCost;
}

/**
 * Simple way to simulate a Min-Heap if N is small (O(N^2 log N))
 */
function minCostToConnect(ropes) {
    let totalCost = 0;
    while (ropes.length > 1) {
        ropes.sort((a, b) => a - b);
        let first = ropes.shift();
        let second = ropes.shift();
        let cost = first + second;
        totalCost += cost;
        ropes.push(cost);
    }
    return totalCost;
}


// --- Test Suite ---
const testCases = [
    { input: [4, 3, 2, 6], expected: 29 },
    { input: [1, 2, 3, 4, 5], expected: 33 },
    { input: [10, 20, 30], expected: 90 }
];

testCases.forEach(({ input, expected }, index) => {
    const resultSimple = minCostToConnect([...input]);
    const resultOptimized = minCostToConnectOptimized([...input]);
    
    const passed = (resultSimple === expected) && (resultOptimized === expected);
    console.log(`Test #${index + 1}: [${input}] -> Simple: ${resultSimple} | Optimized: ${resultOptimized} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});


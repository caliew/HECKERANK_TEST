
/**
 * Q6: Min cost to connect ropes.
 * Logic: Use a Min-Heap to always pick the two smallest elements.
 * (Note: JS doesn't have a built-in Priority Queue, so we'll use a simple sorted array for demonstration, 
 * but in a real test, you'd implement a Heap or use a library).
 */
function minCostToConnect(ropes) {
    let totalCost = 0;
    
    // Simple way to simulate a Min-Heap if N is small (O(N^2 log N))
    // For large N, use a proper Binary Heap class.
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
    const result = minCostToConnect([...input]); // Pass copy as function modifies array
    const passed = result === expected;
    console.log(`Test #${index + 1}: [${input}] -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});


/**
 * Q5: Next Greater Element.
 * Logic: Use a monotonic stack to find the first larger element to the right in O(N).
 */
function nextGreaterElement(arr) {
    let n = arr.length;
    let result = new Array(n).fill(-1);
    let stack = []; // Stores indices

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
            let index = stack.pop();
            result[index] = arr[i];
        }
        stack.push(i);
    }
    return result;
}


// --- Test Suite ---
const testCases = [
    { input: [4, 5, 2, 25], expected: [5, 25, 25, -1] },
    { input: [13, 7, 6, 12], expected: [-1, 12, 12, -1] },
    { input: [1, 2, 3, 4], expected: [2, 3, 4, -1] },
    { input: [4, 3, 2, 1], expected: [-1, -1, -1, -1] }
];

testCases.forEach(({ input, expected }, index) => {
    const result = nextGreaterElement(input);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`Test #${index + 1}: [${input}] -> Result: [${result}] | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

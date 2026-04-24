
/**
 * Q17: Container with most water.
 */
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let max = 0;
    
    while (left < right) {
        let currentArea = Math.min(height[left], height[right]) * (right - left);
        max = Math.max(max, currentArea);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return max;
}


// --- Test Suite ---
const testCases = [
    { input: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
    { input: [1, 1], expected: 1 },
    { input: [4, 3, 2, 1, 4], expected: 16 }
];

testCases.forEach(({ input, expected }, index) => {
    const result = maxArea(input);
    const passed = result === expected;
    console.log(`Test #${index + 1}: [${input}] -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

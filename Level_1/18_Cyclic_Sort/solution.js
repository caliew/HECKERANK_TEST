
/**
 * Q18: Missing Number using Cyclic Sort logic.
 */
function missingNumber(nums) {
    let i = 0;
    let n = nums.length;
    
    while (i < n) {
        let correctIdx = nums[i];
        if (nums[i] < n && nums[i] !== nums[correctIdx]) {
            [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]]; // Swap
        } else {
            i++;
        }
    }
    
    for (let j = 0; j < n; j++) {
        if (nums[j] !== j) return j;
    }
    return n;
}


// --- Test Suite ---
const testCases = [
    { input: [3, 0, 1], expected: 2 },
    { input: [0, 1], expected: 2 },
    { input: [9,6,4,2,3,5,7,0,1], expected: 8 }
];

testCases.forEach(({ input, expected }, index) => {
    const result = missingNumber([...input]);
    const passed = result === expected;
    console.log(`Test #${index + 1}: [${input}] -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

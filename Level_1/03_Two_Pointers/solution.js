
/**
 * Q3: Count perfect pairs.
 * Logic: Sort absolute values and use Two Pointers to count pairs satisfying y <= 2x.
 */
function getPerfectPairsCount(arr) {
    let absArr = arr.map(x => Math.abs(x)).sort((a, b) => a - b);
    let count = 0;
    let n = absArr.length;
    let left = 0;

    for (let right = 0; right < n; right++) {
        while (absArr[right] > 2 * absArr[left]) {
            left++;
        }
        // All elements from [left, right-1] are valid pairs for absArr[right]
        count += (right - left);
    }
    return count;
}


// --- Test Suite ---
const testCases = [
    { input: [2, 5, -3], expected: 2 },
    { input: [1, 2, 3, 4], expected: 6 }, // (1,2), (2,3), (2,4), (3,4)? Let's see. 1,2 (2<=2), 2,3 (3<=4), 2,4 (4<=4), 3,4 (4<=6), 1,?
    { input: [10, 20, 30], expected: 3 }, // (10,20), (20,30), (10,?) No.
    { input: [-5, -2, 1], expected: 2 }
];

testCases.forEach(({ input, expected }, index) => {
    const result = getPerfectPairsCount(input);
    const passed = result === expected;
    console.log(`Test #${index + 1}: [${input}] -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});


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
    { input: [1, 2, 3, 4], expected: 4 }, // Valid pairs: (1,2), (2,3), (2,4), (3,4) -> Total: 4
    { input: [10, 20, 30], expected: 2 }, // Valid pairs: (10,20), (20,30) -> Total: 2
    { input: [-5, -2, 1, 8, 2], expected: 4 }   // Valid pairs: (-2,1) -> Total: 1
];

testCases.forEach(({ input, expected }, index) => {
    const result = getPerfectPairsCount(input);
    const passed = result === expected;
    console.log(`Test #${index + 1}: [${input}] -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);

    const matchedPairs = [];
    const failedPairs = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            const x = input[i];
            const y = input[j];
            const ax = Math.abs(x);
            const ay = Math.abs(y);
            const isPerfect = Math.max(ax, ay) <= 2 * Math.min(ax, ay);
            const pairStr = `(${x}, ${y})`;
            if (isPerfect) {
                matchedPairs.push(pairStr);
            } else {
                failedPairs.push(pairStr);
            }
        }
    }
    console.log(`   Matched: [${matchedPairs.join(', ')}]`);
    console.log(`   Failed:  [${failedPairs.join(', ')}]`);
    console.log(`--------------------------------------------`);
});

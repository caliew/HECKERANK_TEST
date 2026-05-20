const testCases = [
    { input: [2, 5, -3], expected: 2 },
    { input: [1, 2, 3, 4], expected: 4 }, // Valid pairs: (1,2), (2,3), (2,4), (3,4) -> Total: 4
    { input: [10, 20, 30], expected: 2 }, // Valid pairs: (10,20), (20,30) -> Total: 2
    { input: [-5, -2, 1, 8, 2], expected: 4 }   // Valid pairs: (-2,1) -> Total: 1
];

function getPerfectPairsCount(arr: number[]): number {
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

testCases.forEach(({ input, expected }, index) => {
    const result = getPerfectPairsCount(input);
    const passed = result === expected;
    console.log(`Test #${index + 1}: "${input}" -> Result: "${result}" | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});
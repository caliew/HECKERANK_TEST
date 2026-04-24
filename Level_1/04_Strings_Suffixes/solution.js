
/**
 * Q4: Lexicographically maximum substring.
 * Logic: The maximum substring is always a suffix.
 */
function getMaxSubstring(s) {
    let n = s.length;
    let i = 0, j = 1, k = 0;
    
    // Optimized O(N) approach to find the largest suffix
    while (j + k < n) {
        if (s[i + k] === s[j + k]) {
            k++;
            continue;
        } else if (s[i + k] < s[j + k]) {
            i = Math.max(i + k + 1, j);
            j = i + 1;
            k = 0;
        } else {
            j = j + k + 1;
            k = 0;
        }
    }
    return s.substring(i);
}


// --- Test Suite ---
const testCases = [
    { input: "banana", expected: "nana" },
    { input: "baca", expected: "ca" },
    { input: "aaaaa", expected: "aaaaa" },
    { input: "ababa", expected: "baba" },
    { input: "hackerrank", expected: "rrank" }
];

testCases.forEach(({ input, expected }, index) => {
    const result = getMaxSubstring(input);
    const passed = result === expected;
    console.log(`Test #${index + 1}: "${input}" -> Result: "${result}" | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

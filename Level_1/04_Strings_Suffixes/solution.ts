
// --- Test Suite ---
const testCases = [
    { input: "banana", expected: "nana" },
    { input: "baca", expected: "ca" },
    { input: "aaaaa", expected: "aaaaa" },
    { input: "ababa", expected: "baba" },
    { input: "hackerrank", expected: "rrank" }
];

function getMaxSubstring(s: string): string {
    let maxStr: number = s.length;
    let startIndex: number = 0;
    let nextIndex: number = 1;
    while (nextIndex < maxStr) {
        if (s[startIndex] === s[nextIndex]) {
            nextIndex++;
            continue;
        } else if (s[startIndex] < s[nextIndex]) {
            startIndex = Math.max(startIndex + 1, nextIndex);
            nextIndex = startIndex + 1;
        } else {
            nextIndex = nextIndex + 1;
        }
    }
    return s.substring(startIndex);

}

testCases.forEach(({ input, expected }, index) => {
    const result = getMaxSubstring(input);
    const passed = result === expected;
    console.log(`Test #${index + 1}: "${input}" -> Result: "${result}" | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

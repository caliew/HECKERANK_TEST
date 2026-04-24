
/**
 * Q11: Backtracking (Combination Sum).
 * Logic: Recursively explore all paths, pruning when sum is exceeded.
 */
function combinationSum(candidates, target) {
    let results = [];

    function backtrack(remain, start, path) {
        if (remain === 0) {
            results.push([...path]);
            return;
        }
        if (remain < 0) return;

        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            // Use i because we can reuse the same element
            backtrack(remain - candidates[i], i, path);
            path.pop(); // Backtrack
        }
    }

    backtrack(target, 0, []);
    return results;
}


// --- Test Suite ---
const testCases = [
    { candidates: [2, 3, 6, 7], target: 7, expectedCount: 2 },
    { candidates: [2, 3, 5], target: 8, expectedCount: 3 }, // [2,2,2,2], [2,3,3], [3,5]
    { candidates: [2], target: 1, expectedCount: 0 }
];

testCases.forEach(({ candidates, target, expectedCount }, index) => {
    const result = combinationSum(candidates, target);
    const passed = result.length === expectedCount;
    console.log(`Test #${index + 1}: (target=${target}) -> Found ${result.length} paths | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    if (result.length > 0) console.log("   Paths:", JSON.stringify(result));
});

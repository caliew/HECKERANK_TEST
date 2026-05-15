/**
 * L2_06: Removable Indices
 * 
 * Problem: Given str1 and str2 where |str1| = |str2| + 1.
 * Find all indices in str1 that, when removed, leave str2.
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @returns {number[]}
 */
/**
 * SOLUTION 1: Naive Approach (O(N^2))
 * Simple to write, but will TIMEOUT on large inputs.
 */
function getRemovableIndices_Naive(str1, str2) {
    const result = [];
    for (let i = 0; i < str1.length; i++) {
        // slice and concatenation take O(N) time each
        if (str1.slice(0, i) + str1.slice(i + 1) === str2) {
            result.push(i);
        }
    }
    return result.length > 0 ? result : [-1];
}

/**
 * SOLUTION 2: Optimized Approach (O(N))
 * Uses prefix and suffix matching to achieve linear time.
 */
function getRemovableIndices_Optimized(str1, str2) {
    const n = str1.length;
    const m = str2.length;

    if (n !== m + 1) return [-1];

    let L = 0;
    while (L < m && str1[L] === str2[L]) L++;

    let R = 0;
    while (R < m && str1[n - 1 - R] === str2[m - 1 - R]) R++;

    const start = n - 1 - R;
    const end = L;

    if (start > end) return [-1];

    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result.length > 0 ? result : [-1];
}

// Default export/main function
function getRemovableIndices(str1, str2) {
    return getRemovableIndices_Optimized(str1, str2);
}

// --- Test Suite ---

function runTest(str1, str2, expected) {
    const result = getRemovableIndices(str1, str2);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`str1: "${str1}", str2: "${str2}"`);
    console.log(`Result: ${JSON.stringify(result)} | Expected: ${JSON.stringify(expected)} | ${passed ? "✅ PASSED" : "❌ FAILED"}`);
    return passed;
}

console.log("🚀 Running Removable Indices Tests...\n");

let allPassed = true;
allPassed &= runTest("abdgggda", "abdggda", [3, 4, 5]);
allPassed &= runTest("babc", "abc", [0]);
allPassed &= runTest("abcc", "abc", [2, 3]);
allPassed &= runTest("aaaa", "aaa", [0, 1, 2, 3]);
allPassed &= runTest("abcd", "efg", [-1]);
allPassed &= runTest("xyz", "xy", [2]);
allPassed &= runTest("pqr", "qr", [0]);

// --- HackerRank Fast I/O Boilerplate ---
/**
 * Use this pattern for the actual HackerRank environment to avoid timeouts.
 */
function solveHackerRank() {
    const fs = require('fs');
    try {
        const input = fs.readFileSync(0, 'utf8').split(/\r?\n/);
        if (input.length < 2) return;
        const str1 = input[0].trim();
        const str2 = input[1].trim();
        const result = getRemovableIndices(str1, str2);
        process.stdout.write(result.join(' ') + '\n');
    } catch (err) {}
}

console.log(`\n${allPassed ? "🎉 ALL TESTS PASSED!" : "⚠️ SOME TESTS FAILED."}`);

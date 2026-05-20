
/**
 * Q7: Longest subarray with at most K distinct elements.
 * Logic: Sliding window with a Frequency Map.
 */
function longestSubarrayKDistinct(arr, k) {
    let map = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < arr.length; right++) {
        map.set(arr[right], (map.get(arr[right]) || 0) + 1);

        while (map.size > k) {
            map.set(arr[left], map.get(arr[left]) - 1);
            if (map.get(arr[left]) === 0) {
                map.delete(arr[left]);
            }
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

/**
 * Cleaner non-shrinking sliding window.
 * Instead of shrinking the window, we just slide it forward.
 * The size of the window never shrinks, it only stays the same or grows.
 */
function longestSubarrayKDistinctClean(arr, k) {
    let map = new Map();
    let left = 0;

    for (let right = 0; right < arr.length; right++) {
        map.set(arr[right], (map.get(arr[right]) || 0) + 1);

        // If we exceed K distinct elements, slide the window by shifting the left boundary once
        if (map.size > k) {
            map.set(arr[left], map.get(arr[left]) - 1);
            if (map.get(arr[left]) === 0) {
                map.delete(arr[left]);
            }
            left++;
        }
    }
    return arr.length - left;
}



// --- Test Suite ---
const testCases = [
    { arr: [1, 2, 1, 2, 3, 1, 2], k: 2, expected: 4 },
    { arr: [1, 2, 3, 1, 2, 3], k: 3, expected: 6 },
    { arr: [1, 2, 3, 1, 2, 3], k: 1, expected: 1 },
    { arr: [1, 1, 1, 1, 1], k: 1, expected: 5 }
];

testCases.forEach(({ arr, k, expected }, index) => {
    const resultIterative = longestSubarrayKDistinct(arr, k);
    const resultClean = longestSubarrayKDistinctClean(arr, k);

    const passed = (resultIterative === expected) && (resultClean === expected);
    console.log(`Test #${index + 1}: (arr=[${arr}], k=${k}) -> Iterative: ${resultIterative} | Clean: ${resultClean} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

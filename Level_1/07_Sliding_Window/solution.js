
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


// --- Test Suite ---
const testCases = [
    { arr: [1, 2, 1, 2, 3], k: 2, expected: 4 },
    { arr: [1, 2, 3, 1, 2, 3], k: 3, expected: 6 },
    { arr: [1, 2, 3, 1, 2, 3], k: 1, expected: 1 },
    { arr: [1, 1, 1, 1, 1], k: 1, expected: 5 }
];

testCases.forEach(({ arr, k, expected }, index) => {
    const result = longestSubarrayKDistinct(arr, k);
    const passed = result === expected;
    console.log(`Test #${index + 1}: (arr=[${arr}], k=${k}) -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

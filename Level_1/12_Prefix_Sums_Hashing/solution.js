
/**
 * Q12: Subarray Sum Equals K.
 * Logic: Use a prefix sum and a hash map to find sum matches in O(N).
 */
function subarraySum(nums, k) {
    let count = 0;
    let sum = 0;
    let map = new Map();
    map.set(0, 1); // Base case: a sum of 0 has been seen once

    for (let n of nums) {
        sum += n;
        if (map.has(sum - k)) {
            count += map.get(sum - k);
        }
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
}


// --- Test Suite ---
const testCases = [
    { nums: [1, 1, 1], k: 2, expected: 2 },
    { nums: [1, 2, 3], k: 3, expected: 2 }, // [1,2], [3]
    { nums: [1, -1, 0], k: 0, expected: 3 } // [1,-1], [0], [1,-1,0]
];

testCases.forEach(({ nums, k, expected }, index) => {
    const result = subarraySum(nums, k);
    const passed = result === expected;
    console.log(`Test #${index + 1}: (nums=[${nums}], k=${k}) -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

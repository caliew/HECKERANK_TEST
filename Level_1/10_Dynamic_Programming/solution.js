
/**
 * Q10: Dynamic Programming (Coin Change).
 * Logic: dp[i] stores the number of ways to make sum i.
 */
function countWays(coins, sum) {
    // ways[i] = number of combinations to make amount i
    const ways = new Array(sum + 1).fill(0);
    ways[0] = 1; // Base case: one way to make sum 0 (use no coins)

    for (const coin of coins) {
        // For each coin, update all amounts that can include it
        for (let amount = coin; amount <= sum; amount++) {
            // To make 'amount', add all combinations that make 
            // 'amount - coin', then tack on this coin
            ways[amount] += ways[amount - coin];
        }
    }
    return ways[sum];
}

// --- Test Suite ---
const testCases = [
    { coins: [1, 2], sum: 4, expected: 3 },
    { coins: [1, 2, 5], sum: 5, expected: 4 }, // [1*5], [1*3, 2], [1, 2*2], [5]
    { coins: [2], sum: 3, expected: 0 }
];

testCases.forEach(({ coins, sum, expected }, index) => {
    const result = countWays(coins, sum);
    const passed = result === expected;
    console.log(`Test #${index + 1}: (coins=[${coins}], sum=${sum}) -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});


/**
 * Q10: Dynamic Programming (Coin Change).
 * Logic: dp[i] stores the number of ways to make sum i.
 */
function countWays(coins, sum) {
    let dp = new Array(sum + 1).fill(0);
    dp[0] = 1;

    for (let coin of coins) {
        for (let i = coin; i <= sum; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[sum];
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

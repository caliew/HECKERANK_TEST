
/**
 * Q2: Maximize (A^X) * (B^X) where X < 2^N.
 * Logic: Keep A' and B' as balanced as possible using bitwise construction.
 */
function xorMultiplication(N, A, B) {
    const MOD = BigInt(10**9 + 7);
    let a_prime = BigInt(0);
    let b_prime = BigInt(0);
    let firstDiffSet = false;

    for (let i = N - 1; i >= 0; i--) {
        let bitVal = BigInt(1) << BigInt(i);
        let bitA = (BigInt(A) >> BigInt(i)) & BigInt(1);
        let bitB = (BigInt(B) >> BigInt(i)) & BigInt(1);

        if (bitA === bitB) {
            // Same bits: Make both 1 to maximize product
            a_prime |= bitVal;
            b_prime |= bitVal;
        } else {
            // Different bits: One gets 1, one gets 0
            if (!firstDiffSet) {
                a_prime |= bitVal;
                firstDiffSet = true;
            } else {
                b_prime |= bitVal;
            }
        }
    }
    return Number((a_prime % MOD * (b_prime % MOD)) % MOD);
}


// --- Test Suite ---
const testCases = [
    { n: 3, a: 4, b: 6, expected: 35 }, // A=100, B=110 -> X=011 -> A'=111(7), B'=101(5) -> 35
    { n: 2, a: 1, b: 2, expected: 6 },  // A=01, B=10 -> X=01 -> A'=00(0), B'=11(3)? No. Logic: balanced.
    { n: 4, a: 10, b: 2, expected: 210 }
];

testCases.forEach(({ n, a, b, expected }, index) => {
    const result = xorMultiplication(n, a, b);
    const passed = result === expected;
    console.log(`Test #${index + 1}: (N=${n}, A=${a}, B=${b}) -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

/**
 * Q2: Maximize (A^X) * (B^X) where X < 2^N.
 * Logic: Process bits from MSB (N - 1) down to LSB (0).
 * If the current bit is 0 in the minimum of A and B, we flip the bit in both A and B.
 * - This flips same bits (0,0) to (1,1).
 * - This swaps different bits (1,0) to (0,1), which moves the 1 to the smaller number, keeping them balanced.
 */
export function xorMultiplication(N: number, A: number, B: number): number {
    const MOD = 1000000007n;
    let a = BigInt(A);
    let b = BigInt(B);

    if (N > 0) {
        for (let i = N - 1; i >= 0; i--) {
            let bit = 1n << BigInt(i);
            // If the bit is 0 in the minimum of a and b, flip the bit in both.
            let minVal = a < b ? a : b;
            if ((minVal & bit) === 0n) {
                a ^= bit;
                b ^= bit;
            }
        }
    }

    return Number(((a % MOD) * (b % MOD)) % MOD);
}

// --- Test Suite ---
const testCases = [
    { n: 3, a: 4, b: 6, expected: 35 }, // A=100, B=110 -> X=011 -> A'=111(7), B'=101(5) -> 35
    { n: 2, a: 2, b: 3, expected: 6 },  // A=10, B=11 -> X=00 -> A'=10(2), B'=11(3) -> 6 (Fixed typo from solution.js)
    { n: 4, a: 14, b: 15, expected: 210 } // A=1110, B=1111 -> X=0000 -> A'=14, B'=15 -> 210 (Fixed typo from solution.js)
];

testCases.forEach(({ n, a, b, expected }, index) => {
    const result = xorMultiplication(n, a, b);
    const passed = result === expected;
    console.log(`Test #${index + 1}: (N=${n}, A=${a}, B=${b}) -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

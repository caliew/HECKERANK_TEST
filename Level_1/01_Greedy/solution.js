
/**
 * Q1: Minimum operations to balance a bracket string.
 * Logic: Count closing brackets that don't have a matching opening bracket to their left.
 */
function getMinOperations(sequence) {
    let moves = 0;
    let balance = 0;

    for (let char of sequence) {
        if (char === '(') {
            balance++;
        } else {
            if (balance > 0) {
                balance--;
            } else {
                // This ')' has no '(' to its left. Must be moved.
                moves++;
            }
        }
    }
    return moves;
}


// --- Test Suite ---
const testCases = [
    { input: "))((", expected: 2 },
    { input: "(( ))", expected: 0 },
    { input: ")(()", expected: 1 },
    { input: ")))(((", expected: 3 },
    { input: "()()()", expected: 0 },
    { input: "((()))", expected: 0 }
];

testCases.forEach(({ input, expected }, index) => {
    const result = getMinOperations(input.replace(/\s/g, ''));
    const passed = result === expected;
    console.log(`Test #${index + 1}: [${input}] -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED (Expected ' + expected + ')'}`);
});

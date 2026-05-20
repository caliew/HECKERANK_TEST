
/**
 * Q1: Minimum operations to balance a bracket string.
 * Logic: Count closing brackets that don't have a matching opening bracket to their left.
 */
const testCases = [
    { input: "))((", expected: 2 },
    { input: "(( ))", expected: 0 },
    { input: ")(()", expected: 1 },
    { input: ")))(((", expected: 3 },
    { input: "()()()", expected: 0 },
    { input: "((()))", expected: 0 }
];

function getMinOperations(sequence: string): number {
    let move: number = 0;
    let bracket: number = 0;
    for (let char of sequence) {
        if (char === '(') {
            bracket++;
        } else {
            if (bracket > 0) {
                bracket--;
            } else {
                move++;
            }
        }
    }
    return move;

}

testCases.forEach(({ input, expected }, index) => {
    const result = getMinOperations(input.replace(/\s/g, ''));
    const passed = result === expected;
    console.log(`Test #${index + 1}: [${input}] -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED (Expected ' + expected + ')'}`);
});
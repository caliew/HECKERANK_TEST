
/**
 * Q9: Binary Search on Answer.
 * Logic: Guess the "max time" and check if K workers can handle it.
 */
function minMaximumTime(tasks, k) {
    let low = Math.max(...tasks);
    let high = tasks.reduce((a, b) => a + b, 0);
    let ans = high;

    function canAssign(maxTime) {
        let workersNeeded = 1;
        let currentTime = 0;
        for (let t of tasks) {
            if (currentTime + t <= maxTime) {
                currentTime += t;
            } else {
                workersNeeded++;
                currentTime = t;
            }
        }
        return workersNeeded <= k;
    }

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (canAssign(mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}


// --- Test Suite ---
const testCases = [
    { tasks: [1, 2, 3, 4, 5], k: 3, expected: 6 },
    { tasks: [10, 20, 30, 40], k: 2, expected: 60 },
    { tasks: [5, 5, 5, 5], k: 2, expected: 10 }
];

testCases.forEach(({ tasks, k, expected }, index) => {
    const result = minMaximumTime(tasks, k);
    const passed = result === expected;
    console.log(`Test #${index + 1}: (tasks=[${tasks}], k=${k}) -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

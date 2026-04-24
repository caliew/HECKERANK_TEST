
/**
 * Q16: Topological Sort.
 */
function findOrder(numCourses, prerequisites) {
    let adj = Array.from({length: numCourses}, () => []);
    let inDegree = new Array(numCourses).fill(0);
    
    for (let [course, pre] of prerequisites) {
        adj[pre].push(course);
        inDegree[course]++;
    }
    
    let queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    let order = [];
    while (queue.length > 0) {
        let curr = queue.shift();
        order.push(curr);
        for (let next of adj[curr]) {
            inDegree[next]--;
            if (inDegree[next] === 0) queue.push(next);
        }
    }
    
    return order.length === numCourses ? order : [];
}


// --- Test Suite ---
const testCases = [
    { n: 2, pre: [[1, 0]], expected: [0, 1] },
    { n: 4, pre: [[1,0],[2,0],[3,1],[3,2]], expected: [0,1,2,3] }, // Multiple valid, [0,2,1,3] also ok
    { n: 2, pre: [[1,0],[0,1]], expected: [] } // Cycle
];

testCases.forEach(({ n, pre, expected }, index) => {
    const result = findOrder(n, pre);
    const passed = expected.length === 0 ? result.length === 0 : result.length === n;
    console.log(`Test #${index + 1}: (N=${n}) -> Result: [${result}] | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

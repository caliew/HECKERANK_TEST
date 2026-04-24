
/**
 * Q14: Shortest Path (Dijkstra).
 * (Simplified without a real Heap for demonstration).
 */
function networkDelayTime(times, n, k) {
    let dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;

    for (let i = 0; i < n; i++) {
        for (let [u, v, w] of times) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    let res = Math.max(...dist.slice(1));
    return res === Infinity ? -1 : res;
}


// --- Test Suite ---
const testCases = [
    { times: [[2,1,1],[2,3,1],[3,4,1]], n: 4, k: 2, expected: 2 },
    { times: [[1,2,1]], n: 2, k: 1, expected: 1 },
    { times: [[1,2,1]], n: 2, k: 2, expected: -1 }
];

testCases.forEach(({ times, n, k, expected }, index) => {
    const result = networkDelayTime(times, n, k);
    const passed = result === expected;
    console.log(`Test #${index + 1}: (N=${n}, K=${k}) -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

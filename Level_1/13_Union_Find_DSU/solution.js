
/**
 * Q13: Friend Circles using Union-Find.
 */
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.count = n;
    }
    find(i) {
        if (this.parent[i] === i) return i;
        return this.parent[i] = this.find(this.parent[i]); // Path compression
    }
    union(i, j) {
        let rootI = this.find(i);
        let rootJ = this.find(j);
        if (rootI !== rootJ) {
            this.parent[rootI] = rootJ;
            this.count--;
        }
    }
}

function findFriendCircles(M) {
    let n = M.length;
    let uf = new UnionFind(n);
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (M[i][j] === 1) uf.union(i, j);
        }
    }
    return uf.count;
}


// --- Test Suite ---
const testCases = [
    { matrix: [[1,1,0],[1,1,0],[0,0,1]], expected: 2 },
    { matrix: [[1,0,0],[0,1,0],[0,0,1]], expected: 3 },
    { matrix: [[1,1,1],[1,1,1],[1,1,1]], expected: 1 }
];

testCases.forEach(({ matrix, expected }, index) => {
    const result = findFriendCircles(matrix);
    const passed = result === expected;
    console.log(`Test #${index + 1}: Friend Circles -> Result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
});

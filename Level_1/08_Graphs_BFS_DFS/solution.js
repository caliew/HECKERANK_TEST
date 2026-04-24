
/**
 * Q8: Number of Islands.
 * Logic: DFS to visit and "sink" all connected land pieces.
 */
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    let count = 0;

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === '0') {
            return;
        }
        grid[r][c] = '0'; // Mark as visited (sink it)
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}


// --- Test Suite ---
const grid1 = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
];

const grid2 = [
    ['1', '1', '1'],
    ['0', '1', '0'],
    ['1', '1', '1']
];

console.log("Test #1: Standard Grid -> Result:", numIslands(grid1), "| Expected: 3");
console.log("Test #2: Single Island -> Result:", numIslands(grid2), "| Expected: 1");

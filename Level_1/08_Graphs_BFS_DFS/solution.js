/**
 * Q8: Number of Islands.
 * Approach 1: Depth-First Search (DFS)
 * Logic: Recursively visit and "sink" (turn '1' to '0') all connected land pieces.
 */
function numIslandsDFS(grid) {
    if (!grid || grid.length === 0) return 0;
    
    // Create a deep copy of the grid to avoid mutating the original input
    const gridCopy = grid.map(row => [...row]);
    let count = 0;

    function dfs(r, c) {
        // 1. BOUNDARY CHECK: If we go out of bounds, or if the cell is water ('0'), STOP!
        if (r < 0 || c < 0 || r >= gridCopy.length || c >= gridCopy[0].length || gridCopy[r][c] === '0') {
            return;
        }
        // 2. SINK THE LAND: Change it to '0' so we don't visit it again
        gridCopy[r][c] = '0';
        // 3. EXPLORE ALL 4 DIRECTIONS: Go up, down, left, right
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < gridCopy.length; r++) {
        for (let c = 0; c < gridCopy[0].length; c++) {
            if (gridCopy[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}

/**
 * Approach 2: Breadth-First Search (BFS)
 * Logic: Iteratively visit and "sink" all connected land pieces using a Queue.
 */
function numIslandsBFS(grid) {
    if (!grid || grid.length === 0) return 0;

    // Create a deep copy of the grid to avoid mutating the original input
    const gridCopy = grid.map(row => [...row]);
    let count = 0;
    const directions = [
        [1, 0],  // Down
        [-1, 0], // Up
        [0, 1],  // Right
        [0, -1]  // Left
    ];

    for (let r = 0; r < gridCopy.length; r++) {
        for (let c = 0; c < gridCopy[0].length; c++) {
            if (gridCopy[r][c] === '1') {
                count++;
                
                // Start BFS from the land cell
                const queue = [[r, c]];
                gridCopy[r][c] = '0'; // Sink immediately when adding to queue
                
                while (queue.length > 0) {
                    const [currR, currC] = queue.shift();
                    
                    for (const [dr, dc] of directions) {
                        const newR = currR + dr;
                        const newC = currC + dc;
                        
                        // If neighbor is valid land, queue it and sink it
                        if (
                            newR >= 0 && 
                            newC >= 0 && 
                            newR < gridCopy.length && 
                            newC < gridCopy[0].length && 
                            gridCopy[newR][newC] === '1'
                        ) {
                            gridCopy[newR][newC] = '0';
                            queue.push([newR, newC]);
                        }
                    }
                }
            }
        }
    }
    return count;
}

// Keep the standard numIslands function as default to point to DFS
function numIslands(grid) {
    return numIslandsDFS(grid);
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

console.log("--- Testing DFS Approach ---");
console.log("Test #1: Standard Grid -> Result:", numIslandsDFS(grid1), "| Expected: 3");
console.log("Test #2: Single Island -> Result:", numIslandsDFS(grid2), "| Expected: 1");

console.log("\n--- Testing BFS Approach ---");
console.log("Test #1: Standard Grid -> Result:", numIslandsBFS(grid1), "| Expected: 3");
console.log("Test #2: Single Island -> Result:", numIslandsBFS(grid2), "| Expected: 1");

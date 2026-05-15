/**
 * L2_07: Mars Rover
 * 
 * Part 1: Navigation
 * Part 2: Multiple Rovers & Collision Detection
 * Bonus: Pathfinding (BFS)
 */

const DIRECTIONS = ['N', 'E', 'S', 'W'];
const MOVES = {
    'N': [0, 1],
    'E': [1, 0],
    'S': [0, -1],
    'W': [-1, 0]
};

class Rover {
    constructor(x, y, dir, plateauX, plateauY) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.plateauX = plateauX;
        this.plateauY = plateauY;
    }

    turnLeft() {
        let idx = DIRECTIONS.indexOf(this.dir);
        this.dir = DIRECTIONS[(idx + 3) % 4];
    }

    turnRight() {
        let idx = DIRECTIONS.indexOf(this.dir);
        this.dir = DIRECTIONS[(idx + 1) % 4];
    }

    // Returns [newX, newY] without updating state
    getPotentialMove() {
        const [dx, dy] = MOVES[this.dir];
        return [this.x + dx, this.y + dy];
    }

    applyMove(newX, newY) {
        this.x = newX;
        this.y = newY;
    }

    isOutOfBounds(x, y) {
        return x < 0 || x >= this.plateauX || y < 0 || y >= this.plateauY;
    }

    toString() {
        return `${this.x},${this.y},${this.dir}`;
    }
}

/**
 * Executes commands for a single rover
 */
function runPart1(plateauSize, initialPos, commands) {
    const [pX, pY] = plateauSize.split(',').map(Number);
    const [startX, startY, startDir] = initialPos.split(',');
    const rover = new Rover(Number(startX), Number(startY), startDir, pX, pY);

    for (let cmd of commands) {
        if (cmd === 'L') rover.turnLeft();
        else if (cmd === 'R') rover.turnRight();
        else if (cmd === 'M') {
            const [nx, ny] = rover.getPotentialMove();
            if (!rover.isOutOfBounds(nx, ny)) {
                rover.applyMove(nx, ny);
            }
        }
    }
    return rover.toString();
}

/**
 * Executes sequential commands for multiple rovers with collision detection
 */
function runPart2(plateauSize, initialPositions, commandStrings) {
    const [pX, pY] = plateauSize.split(',').map(Number);
    const rovers = [];
    
    // Parse positions
    for (let posStr of initialPositions) {
        const [x, y, dir] = posStr.split(',');
        rovers.push(new Rover(Number(x), Number(y), dir, pX, pY));
    }

    for (let i = 0; i < rovers.length; i++) {
        const rover = rovers[i];
        const commands = commandStrings[i];

        for (let cmd of commands) {
            if (cmd === 'L') rover.turnLeft();
            else if (cmd === 'R') rover.turnRight();
            else if (cmd === 'M') {
                const [nx, ny] = rover.getPotentialMove();
                
                // Check bounds
                if (rover.isOutOfBounds(nx, ny)) continue;

                // Check collision with OTHER rovers
                let collision = false;
                for (let j = 0; j < rovers.length; j++) {
                    if (i === j) continue;
                    if (rovers[j].x === nx && rovers[j].y === ny) {
                        collision = true;
                        break;
                    }
                }

                if (!collision) {
                    rover.applyMove(nx, ny);
                }
            }
        }
    }

    return rovers.map(r => r.toString());
}

/**
 * Bonus: Shortest path to target using BFS
 */
function findShortestPath(plateauSize, startPos, rockPos) {
    const [pX, pY] = plateauSize.split(',').map(Number);
    const [startX, startY, startDir] = startPos.split(',');
    const [targetX, targetY] = rockPos.split(',').map(Number);

    const queue = [[Number(startX), Number(startY), startDir, ""]];
    const visited = new Set();
    visited.add(`${startX},${startY},${startDir}`);

    while (queue.length > 0) {
        const [x, y, dir, path] = queue.shift();

        if (x === targetX && y === targetY) {
            return path;
        }

        // Potential actions: L, R, M
        // 1. Turn Left
        let leftDir = DIRECTIONS[(DIRECTIONS.indexOf(dir) + 3) % 4];
        if (!visited.has(`${x},${y},${leftDir}`)) {
            visited.add(`${x},${y},${leftDir}`);
            queue.push([x, y, leftDir, path + "L"]);
        }

        // 2. Turn Right
        let rightDir = DIRECTIONS[(DIRECTIONS.indexOf(dir) + 1) % 4];
        if (!visited.has(`${x},${y},${rightDir}`)) {
            visited.add(`${x},${y},${rightDir}`);
            queue.push([x, y, rightDir, path + "R"]);
        }

        // 3. Move
        const [dx, dy] = MOVES[dir];
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < pX && ny >= 0 && ny < pY) {
            if (!visited.has(`${nx},${ny},${dir}`)) {
                visited.add(`${nx},${ny},${dir}`);
                queue.push([nx, ny, dir, path + "M"]);
            }
        }
    }

    return "NO PATH";
}

// --- Test Suite ---

function assert(actual, expected, message) {
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`${pass ? "✅" : "❌"} ${message}`);
    if (!pass) console.log(`   Expected: ${JSON.stringify(expected)}\n   Actual:   ${JSON.stringify(actual)}`);
}

console.log("🚀 Running Mars Rover Tests...\n");

// Part 1
console.log("--- Part 1: Navigation ---");
assert(runPart1("3,3", "0,0,E", "MMLMM"), "2,2,N", "Free movement");
assert(runPart1("3,3", "0,0,E", "MMMLMMM"), "2,2,N", "Hitting the edge");

// Part 2
console.log("\n--- Part 2: Sequential & Collision ---");
assert(runPart2("3,3", ["0,0,E", "2,2,W"], ["MMLM", "MMLMM"]), ["2,1,N", "0,0,S"], "Part 2: Free movement");
assert(runPart2("3,3", ["0,0,N", "2,2,W"], ["MM", "MMLMM"]), ["0,2,N", "1,0,S"], "Part 2: Avoiding a crash");

// Bonus
console.log("\n--- Bonus: Pathfinding ---");
const path = findShortestPath("3,3", "0,0,E", "2,2");
// Verify the path actually reaches the target
const finalPos = runPart1("3,3", "0,0,E", path);
assert(finalPos.startsWith("2,2"), true, `Shortest path found: ${path} (reaches 2,2)`);

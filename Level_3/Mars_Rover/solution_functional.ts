/**
 * L2_07: Mars Rover (Functional TypeScript Version)
 * 
 * This version uses pure functions and immutable state instead of classes.
 */

type Direction = 'N' | 'E' | 'S' | 'W';
type Command = 'L' | 'R' | 'M';

interface Position {
    readonly x: number;
    readonly y: number;
    readonly dir: Direction;
}

interface Plateau {
    readonly width: number;
    readonly height: number;
}

const DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];
const MOVES: Record<Direction, [number, number]> = {
    'N': [0, 1],
    'E': [1, 0],
    'S': [0, -1],
    'W': [-1, 0]
};

// Pure function to rotate direction
const rotate = (dir: Direction, step: number): Direction => {
    const idx = DIRECTIONS.indexOf(dir);
    return DIRECTIONS[(idx + step + 4) % 4];
};

// Pure function to calculate movement without side effects
const moveForward = (pos: Position, plateau: Plateau, obstacles: {x: number, y: number}[] = []): Position => {
    const [dx, dy] = MOVES[pos.dir];
    const nx = pos.x + dx;
    const ny = pos.y + dy;

    // Check bounds
    if (nx < 0 || nx >= plateau.width || ny < 0 || ny >= plateau.height) {
        return pos; // Ignore move if out of bounds
    }

    // Check collisions
    if (obstacles.some(o => o.x === nx && o.y === ny)) {
        return pos; // Ignore move if collision
    }

    return { ...pos, x: nx, y: ny };
};

// Higher-order function to apply a command
const applyCommand = (pos: Position, cmd: Command, plateau: Plateau, obstacles: {x: number, y: number}[] = []): Position => {
    switch (cmd) {
        case 'L': return { ...pos, dir: rotate(pos.dir, -1) };
        case 'R': return { ...pos, dir: rotate(pos.dir, 1) };
        case 'M': return moveForward(pos, plateau, obstacles);
        default: return pos;
    }
};

/**
 * Part 1: Navigation
 */
const runPart1 = (plateauSize: string, initialPos: string, commands: string): string => {
    const [w, h] = plateauSize.split(',').map(Number);
    const [x, y, d] = initialPos.split(',');
    const plateau = { width: w, height: h };
    
    let state: Position = { x: Number(x), y: Number(y), dir: d as Direction };

    for (const cmd of commands) {
        state = applyCommand(state, cmd as Command, plateau);
    }

    return `${state.x},${state.y},${state.dir}`;
};

/**
 * Part 2: Sequential & Collision Detection
 */
const runPart2 = (plateauSize: string, initialPositions: string[], commandStrings: string[]): string[] => {
    const [w, h] = plateauSize.split(',').map(Number);
    const plateau = { width: w, height: h };
    
    let currentRoverStates: Position[] = initialPositions.map(pos => {
        const [x, y, d] = pos.split(',');
        return { x: Number(x), y: Number(y), dir: d as Direction };
    });

    for (let i = 0; i < currentRoverStates.length; i++) {
        const commands = commandStrings[i];
        
        for (const cmd of commands) {
            // Other rovers are considered obstacles
            const obstacles = currentRoverStates.filter((_, idx) => idx !== i);
            currentRoverStates[i] = applyCommand(currentRoverStates[i], cmd as Command, plateau, obstacles);
        }
    }

    return currentRoverStates.map(s => `${s.x},${s.y},${s.dir}`);
};

/**
 * Bonus: BFS Pathfinding
 */
const findShortestPath = (plateauSize: string, startPos: string, rockPos: string): string => {
    const [w, h] = plateauSize.split(',').map(Number);
    const [startX, startY, startDir] = startPos.split(',');
    const [targetX, targetY] = rockPos.split(',').map(Number);
    const plateau = { width: w, height: h };

    const queue: [Position, string][] = [[{ x: Number(startX), y: Number(startY), dir: startDir as Direction }, ""]];
    const visited = new Set<string>();
    visited.add(`${startX},${startY},${startDir}`);

    while (queue.length > 0) {
        const [state, path] = queue.shift()!;

        if (state.x === targetX && state.y === targetY) return path;

        // Try L, R, M
        (['L', 'R', 'M'] as Command[]).forEach(cmd => {
            const nextState = applyCommand(state, cmd, plateau);
            const key = `${nextState.x},${nextState.y},${nextState.dir}`;
            if (!visited.has(key)) {
                visited.add(key);
                queue.push([nextState, path + cmd]);
            }
        });
    }

    return "NO PATH";
};

// --- Test Suite ---
const assert = (actual: any, expected: any, message: string) => {
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`${pass ? "✅" : "❌"} ${message}`);
};

console.log("🚀 Running Functional Mars Rover Tests...\n");

assert(runPart1("3,3", "0,0,E", "MMLMM"), "2,2,N", "Part 1: Basic Movement");
assert(runPart2("3,3", ["0,0,E", "2,2,W"], ["MMLM", "MMLMM"]), ["2,1,N", "0,0,S"], "Part 2: Sequential rovers");
const path = findShortestPath("3,3", "0,0,E", "2,2");
assert(runPart1("3,3", "0,0,E", path).startsWith("2,2"), true, `Bonus: Path ${path} reaches target`);

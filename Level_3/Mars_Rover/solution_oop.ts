/**
 * L2_07: Mars Rover (TypeScript Version)
 */

type Direction = 'N' | 'E' | 'S' | 'W';
type Command = 'L' | 'R' | 'M';

interface Position {
    x: number;
    y: number;
    dir: Direction;
}

const DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];
const MOVES: Record<Direction, [number, number]> = {
    'N': [0, 1],
    'E': [1, 0],
    'S': [0, -1],
    'W': [-1, 0]
};

class Rover {
    public x: number;
    public y: number;
    public dir: Direction;
    private plateauX: number;
    private plateauY: number;

    constructor(x: number, y: number, dir: Direction, plateauX: number, plateauY: number) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.plateauX = plateauX;
        this.plateauY = plateauY;
    }

    turnLeft(): void {
        const idx = DIRECTIONS.indexOf(this.dir);
        this.dir = DIRECTIONS[(idx + 3) % 4];
    }

    turnRight(): void {
        const idx = DIRECTIONS.indexOf(this.dir);
        this.dir = DIRECTIONS[(idx + 1) % 4];
    }

    getPotentialMove(): [number, number] {
        const [dx, dy] = MOVES[this.dir];
        return [this.x + dx, this.y + dy];
    }

    applyMove(newX: number, newY: number): void {
        this.x = newX;
        this.y = newY;
    }

    isOutOfBounds(x: number, y: number): boolean {
        return x < 0 || x >= this.plateauX || y < 0 || y >= this.plateauY;
    }

    toString(): string {
        return `${this.x},${this.y},${this.dir}`;
    }
}

/**
 * Part 1: Navigation
 */
function runPart1(plateauSize: string, initialPos: string, commands: string): string {
    const [pX, pY] = plateauSize.split(',').map(Number);
    const [startX, startY, startDir] = initialPos.split(',');
    const rover = new Rover(Number(startX), Number(startY), startDir as Direction, pX, pY);

    for (const cmd of commands) {
        const c = cmd as Command;
        if (c === 'L') rover.turnLeft();
        else if (c === 'R') rover.turnRight();
        else if (c === 'M') {
            const [nx, ny] = rover.getPotentialMove();
            if (!rover.isOutOfBounds(nx, ny)) {
                rover.applyMove(nx, ny);
            }
        }
    }
    return rover.toString();
}

/**
 * Part 2: Sequential & Collision Detection
 */
function runPart2(plateauSize: string, initialPositions: string[], commandStrings: string[]): string[] {
    const [pX, pY] = plateauSize.split(',').map(Number);
    const rovers: Rover[] = [];

    for (const posStr of initialPositions) {
        const [x, y, dir] = posStr.split(',');
        rovers.push(new Rover(Number(x), Number(y), dir as Direction, pX, pY));
    }

    for (let i = 0; i < rovers.length; i++) {
        const rover = rovers[i];
        const commands = commandStrings[i];

        for (const cmd of commands) {
            const c = cmd as Command;
            if (c === 'L') rover.turnLeft();
            else if (c === 'R') rover.turnRight();
            else if (c === 'M') {
                const [nx, ny] = rover.getPotentialMove();
                if (rover.isOutOfBounds(nx, ny)) continue;

                const collision = rovers.some((other, idx) => i !== idx && other.x === nx && other.y === ny);

                if (!collision) {
                    rover.applyMove(nx, ny);
                }
            }
        }
    }

    return rovers.map(r => r.toString());
}

/**
 * Bonus: BFS Pathfinding
 */
type RoverState = { x: number, y: number, direction: Direction, path: string };
function findShortestPath(plateauSize: string, startPos: string, rockPos: string): string {
    const [pX, pY] = plateauSize.split(',').map(Number);
    const [startX, startY, startDir] = startPos.split(',');
    const [targetX, targetY] = rockPos.split(',').map(Number);

    const queue: RoverState[] = [{ x: Number(startX), y: Number(startY), direction: startDir as Direction, path: "" }];
    const visited = new Set<string>();
    visited.add(`${startX},${startY},${startDir}`);

    while (queue.length > 0) {
        const currentState = queue.shift()!;
        // 1. Did we win?
        if (currentState.x === targetX && currentState.y === targetY) {
            return currentState.path;
        }
        // 2. Generate all 3 possible next moves using a helper function (defined below)
        const possibleMoves = generateNextMoves(currentState, pX, pY);
        // 3. Process the moves
        for (const nextMove of possibleMoves) {
            const memoryString = `${nextMove.x},${nextMove.y},${nextMove.direction}`;

            // If we haven't seen this exact state before, save it and add it to the queue
            if (!visited.has(memoryString)) {
                visited.add(memoryString);
                queue.push(nextMove);
            }
        }
    }

    return "NO PATH";
}
// --- HELPER FUNCTION ---
// This hides all the messy math so your main loop stays clean!
function generateNextMoves(state: RoverState, maxX: number, maxY: number): RoverState[] {
    const moves: RoverState[] = [];

    // Option 1: Turn Left
    const leftDir = DIRECTIONS[(DIRECTIONS.indexOf(state.direction) + 3) % 4];
    moves.push({ ...state, direction: leftDir, path: state.path + "L" });
    // Option 2: Turn Right
    const rightDir = DIRECTIONS[(DIRECTIONS.indexOf(state.direction) + 1) % 4];
    moves.push({ ...state, direction: rightDir, path: state.path + "R" });
    // Option 3: Move Forward (Only add if it doesn't fall off the edge)
    const [dx, dy] = MOVES[state.direction];
    const newX = state.x + dx;
    const newY = state.y + dy;

    if (newX >= 0 && newX <= maxX && newY >= 0 && newY <= maxY) {
        moves.push({ x: newX, y: newY, direction: state.direction, path: state.path + "M" });
    }
    return moves;
}

// --- Test Suite ---
function assert(actual: any, expected: any, message: string): void {
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`${pass ? "✅" : "❌"} ${message}`);
    if (!pass) console.log(`   Expected: ${JSON.stringify(expected)}\n   Actual:   ${JSON.stringify(actual)}`);
}

console.log("🚀 Running Mars Rover Tests (TypeScript Edition)...\n");

assert(runPart1("3,3", "0,0,E", "MMLMM"), "2,2,N", "Part 1: Free movement");
assert(runPart2("3,3", ["0,0,E", "2,2,W"], ["MMLM", "MMLMM"]), ["2,1,N", "0,0,S"], "Part 2: Free movement");
const path = findShortestPath("3,3", "0,0,E", "2,2");
assert(runPart1("3,3", "0,0,E", path).startsWith("2,2"), true, `Bonus: Path ${path} reaches target`);


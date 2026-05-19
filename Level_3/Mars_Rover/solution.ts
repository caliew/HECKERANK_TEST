type Direction = "N" | "S" | "E" | "W"
type CommandType = "L" | "R" | "M"

type plateauSize = [
    number,
    number
]
type position = {
    x: number;
    y: number;
    direction: Direction;
}

const DIRECTION: Direction[] = ["N", "E", "S", "W"];
const MOVES: Record<Direction, [number, number]> = {
    "N": [0, 1],
    "E": [1, 0],
    "S": [0, -1],
    "W": [-1, 0]
}

class Rover {
    public position: position;
    private plateauSize: plateauSize;

    constructor(initialPosition: position, plateau: plateauSize) {
        this.position = initialPosition;
        this.plateauSize = plateau;
    }
    turnRight() {
        const idx = DIRECTION.indexOf(this.position.direction);
        this.position.direction = DIRECTION[(idx + 1) % 4];
    }
    turnLeft() {
        const idx = DIRECTION.indexOf(this.position.direction);
        this.position.direction = DIRECTION[(idx + 3) % 4];
    }
    move(rovers?: Rover[]) {
        const [dx, dy] = MOVES[this.position.direction];
        const newX = this.position.x + dx;
        const newY = this.position.y + dy;
        if (newX >= 0 && newX <= this.plateauSize[0] && newY >= 0 && newY <= this.plateauSize[1]) {
            if (rovers) {
                const collision = rovers.some(other => other.position.x === newX && other.position.y === newY);
                if (collision) {
                    return;
                }
            }
            this.position.x = newX;
            this.position.y = newY;
        }
    }
    toString() {
        return `${this.position.x},${this.position.y},${this.position.direction}`;
    }
}


function moveRover(plateau: string, initialPosition: string, commands: string) {
    const [pX, pY] = plateau.split(",").map(Number);
    const [x, y, direction] = initialPosition.split(",");
    const initialPos: position = {
        x: Number(x),
        y: Number(y),
        direction: direction as Direction
    };
    const plateauSize: plateauSize = [pX, pY];
    const rover = new Rover(initialPos, plateauSize);
    for (const cmd of commands) {
        const command: CommandType = cmd as CommandType;
        if (command === "L") rover.turnLeft();
        if (command === "R") rover.turnRight();
        if (command === "M") rover.move();
    }
    return rover.toString();

}
function moveMultipleRovers(plateau: string, initialPositions: string[], commands: string[]) {
    const [pX, pY] = plateau.split(",").map(Number);
    const initialPos: position[] = initialPositions.map(pos => {
        const [x, y, direction] = pos.split(",");
        return {
            x: Number(x),
            y: Number(y),
            direction: direction as Direction
        };
    });
    const plateauSize: plateauSize = [pX, pY];
    const rovers: Rover[] = initialPos.map(pos => new Rover(pos, plateauSize));
    const maxStep = Math.max(...commands.map(x => x.length));
    for (let step = 0; step < maxStep; step++) {
        for (let i = 0; i < rovers.length; i++) {
            const rover = rovers[i];
            const cmd = commands[i][step] as CommandType;
            if (cmd === "L") rover.turnLeft();
            if (cmd === "R") rover.turnRight();
            if (cmd === "M") rover.move(rovers.filter(x => x !== rover));
        }
    }
    return rovers.map(rover => rover.toString());
}

/**
 * Bonus: BFS Pathfinding
 */
type RoverState = { x: number, y: number, direction: Direction, path: string };
function findShortestPath(plateauSize: string, startPos: string, rockPos: string): string {
    // ... (setup variables exactly as before) ...
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
    const leftDir = DIRECTION[(DIRECTION.indexOf(state.direction) + 3) % 4];
    moves.push({ ...state, direction: leftDir, path: state.path + "L" });
    // Option 2: Turn Right
    const rightDir = DIRECTION[(DIRECTION.indexOf(state.direction) + 1) % 4];
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

function assert(actual: any, predict: any, remark: string) {
    const match = JSON.stringify(actual) === JSON.stringify(predict);
    if (!match) {
        console.log(`❌ ${remark}`);
        console.log(`   Expected: ${JSON.stringify(predict)}`);
        console.log(`   Actual:   ${JSON.stringify(actual)}`);
    } else {
        console.log(`✅ ${remark}`);
    }
}

assert(moveRover("3,3", "0,0,E", "MMLMM"), "2,2,N", "Part 1: Free movement");
assert(moveMultipleRovers("3,3", ["0,0,E", "2,2,W"], ["MMLM", "MMLMM"]), ["2,1,N", "0,0,S"], "Part 2: Free movement");
assert(moveMultipleRovers("5,5", ["0,0,E", "4,0,W"], ["MMM", "MMM"]), ["1,0,E", "2,2,N"], "Part 3: Collision detection");

export { };
assert(findShortestPath("3,3", "0,0,E", "2,2"), "MMLMM", "Bonus: Pathfinding");


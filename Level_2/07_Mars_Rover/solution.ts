type Direction = 'N' | 'E' | 'S' | 'W';
type Commands = 'L' | 'R' | 'M';

const DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];
const MOVE: Record<Direction, [number, number]> = {
    'N': [0, 1],
    'E': [1, 0],
    'S': [0, -1],
    'W': [-1, 0]
};

class Rover {
    public x: number;
    public y: number;
    public dir: string;
    public plateauX: number;
    public plateauY: number;

    constructor(x: number, y: number, dir: Direction, plateauX: number, plateauY: number) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.plateauX = plateauX;
        this.plateauY = plateauY;
    }

    turnRight(): void {
        const idx = DIRECTIONS.indexOf(this.dir as Direction);
        this.dir = DIRECTIONS[(idx + 1) % 4];
    }

    turnLeft(): void {
        const idx = DIRECTIONS.indexOf(this.dir as Direction);
        this.dir = DIRECTIONS[(idx - 1 + 4) % 4];
    }

    move(): void {
        const [dx, dy] = MOVE[this.dir as Direction];
        const nx = this.x + dx;
        const ny = this.y + dy;

        if (nx < 0 || nx > this.plateauX || ny < 0 || ny > this.plateauY) {
            return;
        }

        this.x = nx;
        this.y = ny;
    }

    toString(): string {
        return `${this.x},${this.y},${this.dir}`;
    }

}

function runPart1(plateauSize: string, initialPosition: string, commands: string): string {
    const [w, h] = plateauSize.split(",").map(Number);
    const [x, y, d] = initialPosition.split(",");
    const plateau = { width: w, height: h };
    let ObjRover = new Rover(Number(x), Number(y), d as Direction, w, h);

    for (const cmd of commands) {
        if (cmd === "L") {
            ObjRover.turnLeft();
        } else if (cmd === "R") {
            ObjRover.turnRight();
        } else if (cmd === "M") {
            ObjRover.move();
        }
    }
    return ObjRover.toString();
}


// --- Test Suite ---
function assert(actual: any, expected: any, message: string): void {
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`${pass ? "✅" : "❌"} ${message}`);
    if (!pass) console.log(`   Expected: ${JSON.stringify(expected)}\n   Actual:   ${JSON.stringify(actual)}`);
}

assert(runPart1("3,3", "0,0,E", "MMLMM"), "2,2,N", "Part 1: Free movement");

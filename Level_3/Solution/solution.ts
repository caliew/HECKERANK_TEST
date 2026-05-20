type Direction = "N" | "E" | "S" | "W";
type Command = "R" | "L" | "M";
type RoverState = { x: number, y: number, direction: Direction }

const DIRECTIONS: Direction[] = ["N", "E", "S", "W"];
const MOVES: Record<Direction, [number, number]> = {
    "N": [0, 1],
    "E": [1, 0],
    "S": [0, -1],
    "W": [-1, 0],
}

class Rover {
    public roverState: RoverState;
    private plateauSizeX: number;
    private plateauSizeY: number;
    constructor(roverState: RoverState, plateauSizeX: number, plateauSizeY: number) {
        this.roverState = roverState;
        this.plateauSizeX = plateauSizeX;
        this.plateauSizeY = plateauSizeY;
    }
    turnLeft() {
        const index = DIRECTIONS.indexOf(this.roverState.direction);
        this.roverState.direction = DIRECTIONS[(index + 3) % DIRECTIONS.length];
    }
    turnRight() {
        const index = DIRECTIONS.indexOf(this.roverState.direction);
        this.roverState.direction = DIRECTIONS[(index + 1) % DIRECTIONS.length];
    }
    move(rovers?: Rover[]) {
        const [dx, dy] = MOVES[this.roverState.direction];
        const newX = this.roverState.x + dx;
        const newY = this.roverState.y + dy;
        const isCollideWithOthers = rovers?.some(r => r.roverState.x === newX && r.roverState.y === newY)
        if (isCollideWithOthers) {
            console.log("COLLISION DETECTED", this.roverState.x, this.roverState.y, this.roverState.direction, rovers?.find(r => r.roverState.x === newX && r.roverState.y === newY)?.toString())
            return;
        }
        if (newX > 0 && newX < this.plateauSizeX && newY > 0 && newY < this.plateauSizeY) {
            this.roverState.x = this.roverState.x + dx;
            this.roverState.y = this.roverState.y + dy;
        }
    }
    toString() {
        return `${this.roverState.x},${this.roverState.y},${this.roverState.direction}`;
    }
}

function moveRover(initialPosition: string, commands: string, plateauSize: string): string {
    const [pX, pY] = plateauSize.split(",").map(Number);
    const [x, y, direction] = initialPosition.split(",");
    const roverState = { x: Number(x), y: Number(y), direction: direction as Direction };
    const rover = new Rover(roverState, pX, pY);
    for (const command of commands) {
        const cmd = command as Command;
        if (cmd === 'L') rover.turnLeft()
        if (cmd === 'R') rover.turnRight()
        if (cmd === 'M') rover.move()
    }
    return rover.toString();
}
function moveRovers(initialPositions: string[], commands: string[], plateauSize: string): string[] {
    const [pX, pY] = plateauSize.split(",").map(Number);
    const rovers = initialPositions.map(initialPosition => {
        const [x, y, direction] = initialPosition.split(",");
        const roverState = { x: Number(x), y: Number(y), direction: direction as Direction };
        return new Rover(roverState, pX, pY);
    })
    const maxStep = Math.max(...commands.map(x => x.length));
    for (let step = 0; step < maxStep; step++) {
        for (let i = 0; i < rovers.length; i++) {
            if (commands[i].length <= step) continue;
            const cmd = commands[i][step] as Command;
            if (cmd === 'L') rovers[i].turnLeft();
            if (cmd === 'R') rovers[i].turnRight();
            if (cmd === 'M') rovers[i].move(rovers.filter(x => x !== rovers[i]));
        }
    }
    return rovers.map(r => r.toString());
}

function assert(actual: any, predict: any, remark: string) {
    const match = JSON.stringify(actual) === JSON.stringify(predict);
    if (match) {
        console.log("PASS", remark);
    } else {
        console.log("FAIL ", remark)
    }
    console.log(`   ACTUAL : ${JSON.stringify(actual)}`)
    console.log(`   PREDICT: ${JSON.stringify(predict)}`)
}

assert(moveRover("1,1,N", "MLRMMR", "5,5"), "1,4,E", "SINGLE ROVER")
assert(moveRovers(["1,1,N", "2,2,W"], ["MLRMMR", "MMR"], "5,5"), ["1,4,E", "4,2,S"], "MULTIPLE ROVERS")


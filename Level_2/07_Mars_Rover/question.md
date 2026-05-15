# Mars Rover

## Problem Statement

NASA has deployed the Curiosity Mars Rover on a 2D grid, representing a curiously rectangular plateau on the surface of Mars. It is exploring the plateau to find interesting data to send back to Earth. The rover can turn left or right, and move forward - and must avoid falling off the edge of the plateau.

## Part 1: Navigating the Plateau

Your task is to allow NASA to control the rover using a simple string of commands (‘**L**’, ‘**R**’ and ‘**M**’), from an initial starting position, and determine its final position on the plateau. Its position is described by a pair of co-ordinates (**x**, **y**) and the direction the rover is facing (’**N**’, ’**S**’, ‘**E**’ or ‘**W**’.)

### Requirements

- The size of the plateau is specified as **x,y** grid spaces, e.g. **7,5**
- The initial position of the rover is specified with a zero-indexed coordinate from the **bottom left corner** of the grid and a direction, e.g. **0,0,N**
- The movement commands are specified as a simple string, e.g. **LMMRMLM**
- The commands **L** and **R** make the rover spin 90 degrees left or right respectively, without moving from its current spot
- The command **M** means move forward one grid point, and maintain the same heading
- The output should be the final position of the rover, e.g. **0,1,W**
- If a move would take the rover off the edge of the plateau, it should be ignored

### Examples

#### 1. Free movement
**Input**
Plateau size: 3,3
Initial position: 0,0,E
Movement: MMLMM

**Output**
2,2,N

#### 2. Hitting the edge
**Input**
Plateau size: 3,3
Initial position: 0,0,E
Movement: MMMLMMM

**Output**
2,2,N

---

## Part 2: The Other Rover

NASA is now sending the Perseverance rover to investigate this plateau as well. They are being controlled by different operators, so we need to make sure they don't crash into each other.

### Requirements
- The app takes two initial positions and two command strings (one for each rover).
- Each rover completes its **entire** movement sequence before the next one starts.
- If a move would make a rover crash into the other one, it should be ignored.
- Neither rover should fall off the edge of the plateau.

### Examples

#### 1. Free movement
**Input**
Plateau size: 3,3
Initial position: "0,0,E","2,2,W"
Movement: "MMLM","MMLMM"

**Output**
"2,1,N","0,0,S"

#### 2. Avoiding a crash
**Input**
Plateau size: 3,3
Initial position: "0,0,N","2,2,W"
Movement: "MM","MMLMM"

**Output**
"0,2,N","1,0,S"

---

## Bonus: Sample Collection

NASA wants to send a rover to search for an interesting rock and find the **shortest path** to it.

### Requirements
- Only one rover is needed.
- Instead of movement commands, the rover takes the rock's position as input, e.g. **2,2**.
- The output is the shortest command sequence to reach the rock, e.g. **MMLMM**.

### Examples
**Input**
Plateau size: 3,3
Initial position: 0,0,E
Rock: 2,2

**Output**
MMLMM (or MLMRMLM, etc.)

# Mars Rover

## Problem Statement

NASA has deployed the Curiosity Mars Rover on a 2D grid, representing a curiously rectangular plateau on the surface of Mars. It is exploring the plateau to find interesting data to send back to Earth. The rover can turn left or right, and move forward - and must avoid falling off the edge of the plateau.

## Part 1: Navigating the Plateau

Your task is to allow NASA to control the rover using a simple string of commands (‘**L**’, ‘**R**’ and ‘**M**’), from an initial starting position, and determine its final position on the plateau. Its position is described by a pair of co-ordinates (**x**, **y**) and the direction the rover is facing (’**N**’, ’**S**’, ‘**E**’ or ‘**W**’.)

### Requirements

- The size of the plateau is specified as **x,y** grid spaces, e.g., **7,5**. This means the valid x-coordinates are 0 to 6, and y-coordinates are 0 to 4.
- The initial position of the rover is specified with a zero-indexed coordinate from the **bottom left corner** of the grid and a direction, e.g., **0,0,N**.
- The commands **L** and **R** make the rover spin 90 degrees left or right respectively, without moving from its current spot.
- The command **M** means move forward one grid point, and maintain the same heading.
- If a move would take the rover off the edge of the plateau, it should be ignored.

---

## Part 2: The Other Rover

Now NASA is sending the Perseverance rover as well. Each rover has its own starting position and commands. They move sequentially (the first finishes its entire sequence before the second one starts).

### Requirements
- If a move would make a rover crash into the other one (occupy the same grid space), it should be ignored.
- Neither rover should fall off the edge of the plateau.

---

## Bonus: Sample Collection

Instead of taking a list of movement commands, the rover can now operate autonomously to find the nearest rock. Find the **shortest path** to the rock!

### Requirements
- Input: Plateau size, initial position, and rock position (x, y).
- Output: The shortest sequence of commands (e.g., **MMLMM**) to reach the rock.

### Example
**Input:**
Plateau size: 3,3
Initial position: 0,0,E
Rock: 2,2

**Output:**
MMLMM

// Day9
import * as fs from "fs";

const input = "./input.txt";
const test = "./test.txt";
function readFileToLines(input: string) {
  return fs.readFileSync(input, "utf8").split("\r\n");
}
interface move {
  direction: string;
  amount: number;
}
function linesToMoves(lines: string[]) {
  const moves: move[] = [];
  lines.forEach((line) => {
    const parts = line.split(" ");
    moves.push({
      direction: parts[0],
      amount: Number(parts[1]),
    });
  });
  return moves;
}
function checkAndAlignTail(headPos: number[], tailPos: number[]) {
  const xDiff = headPos[0] - tailPos[0];
  const yDiff = headPos[1] - tailPos[1];
  const xDiffAbs = Math.abs(xDiff);
  const yDiffAbs = Math.abs(yDiff);

  if (xDiffAbs > 1) {
    tailPos[0] += xDiff > 0 ? 1 : -1;
    if (yDiffAbs > 0) {
      tailPos[1] += yDiff > 0 ? 1 : -1;
    }
  } else if (yDiffAbs > 1) {
    tailPos[1] += yDiff > 0 ? 1 : -1;
    if (xDiffAbs > 0) {
      tailPos[0] += xDiff > 0 ? 1 : -1;
    }
  }
  return tailPos;
}
function applyMoves(moves: move[], lengthOfSnake: number) {
  const snake: number[][] = [];
  for (let i = 0; i < lengthOfSnake; i++) {
    snake.push([0, 0]);
  }

  let tailtrail: any[] = [];
  tailtrail.push(
    snake[lengthOfSnake - 1][0].toString() +
      "," +
      snake[lengthOfSnake - 1][1].toString()
  );
  moves.forEach((move) => {
    switch (move.direction) {
      case "U":
        for (let i = 0; i < move.amount; i++) {
          snake[0][1] += 1;
          for (let j = 1; j < snake.length; j++) {
            snake[j] = checkAndAlignTail(snake[j - 1], snake[j]);
          }
          tailtrail.push(
            snake[lengthOfSnake - 1][0].toString() +
              "," +
              snake[lengthOfSnake - 1][1].toString()
          );
        }
        break;
      case "R":
        for (let i = 0; i < move.amount; i++) {
          snake[0][0] += 1;
          for (let j = 1; j < snake.length; j++) {
            snake[j] = checkAndAlignTail(snake[j - 1], snake[j]);
          }
          tailtrail.push(
            snake[lengthOfSnake - 1][0].toString() +
              "," +
              snake[lengthOfSnake - 1][1].toString()
          );
        }
        break;
      case "D":
        for (let i = 0; i < move.amount; i++) {
          snake[0][1] -= 1;
          for (let j = 1; j < snake.length; j++) {
            snake[j] = checkAndAlignTail(snake[j - 1], snake[j]);
          }
          tailtrail.push(
            snake[lengthOfSnake - 1][0].toString() +
              "," +
              snake[lengthOfSnake - 1][1].toString()
          );
        }
        break;
      case "L":
        for (let i = 0; i < move.amount; i++) {
          snake[0][0] -= 1;
          for (let j = 1; j < snake.length; j++) {
            snake[j] = checkAndAlignTail(snake[j - 1], snake[j]);
          }
          tailtrail.push(
            snake[lengthOfSnake - 1][0].toString() +
              "," +
              snake[lengthOfSnake - 1][1].toString()
          );
        }
        break;
    }
  });
  return tailtrail;
}
function part1() {
  const lines = readFileToLines(input);
  const moves = linesToMoves(lines);
  const tailTrail = applyMoves(moves, 2);
  const tailLocationSet = new Set<string>(tailTrail);

  return tailLocationSet.size;
}
function part2() {
  const lines = readFileToLines(input);
  const moves = linesToMoves(lines);
  const tailTrail = applyMoves(moves, 10);
  const tailLocationSet = new Set<string>(tailTrail);

  return tailLocationSet.size;
}
//6332
//6385
console.log(part1());
console.log(part2());

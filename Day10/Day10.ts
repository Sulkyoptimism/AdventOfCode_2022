// Day10
import * as fs from "fs";
import { hasNumber, sumArray } from "../Utils/util";

const input = "./input.txt";
const test = "./test.txt";
function readFileToLines(input: string) {
  return fs.readFileSync(input, "utf8").split("\r\n");
}
function readScoresFromInput(
  lines: string[],
  initStep: number,
  checkStep: number
) {
  const scores: number[] = [];
  let regValue = 1;
  let cycleCount = 0;
  lines.forEach((line) => {
    if (hasNumber(line)) {
      for (let i = 0; i < 2; i++) {
        cycleCount += 1;
        checkCycleCount();
      }
      const lineVal = Number(line.match(/-?\d+/g));
      regValue += lineVal;
    } else {
      cycleCount += 1;
      checkCycleCount();
    }
  });
  return scores;

  function checkCycleCount() {
    if (cycleCount % checkStep == initStep) {
      scores.push(cycleCount * regValue);
    }
  }
}
function part1() {
  const lines = readFileToLines(input);
  const scores = readScoresFromInput(lines, 20, 40);
  return sumArray(scores);
}

function display(displayGrid: string[][]) {
  displayGrid.forEach((line) => {
    console.log(line.join(""));
  });
}

function getDisplay() {
  const outDisplay: string[][] = [];
  for (let r = 0; r < 6; r++) {
    let row: string[] = [];
    for (let c = 0; c < 40; c++) {
      row.push(".");
    }
    outDisplay.push(row);
  }
  return outDisplay;
}
function startDisplay(displayGrid: string[][], lines: string[]) {
  let regValue: number = 1;
  let cycleCount: number = 0;
  lines.forEach((line) => {
    if (hasNumber(line)) {
      for (let i = 0; i < 2; i++) {
        renderMove(displayGrid, cycleCount, regValue);
        cycleCount += 1;
      }
      const lineVal = Number(line.match(/-?\d+/g));
      regValue += lineVal;
    } else {
      renderMove(displayGrid, cycleCount, regValue);
      cycleCount += 1;
    }
  });
  display(displayGrid);

  function renderMove(
    displayGrid: string[][],
    cycleCount: number,
    regValue: number
  ) {
    displayGrid[Math.floor(cycleCount / 40)][cycleCount % 40] = equalsIsh(
      cycleCount % 40,
      regValue,
      1
    )
      ? "#"
      : ".";
  }

  function equalsIsh(x: number, y: number, tolerance: number) {
    if (x === y) {
      return true;
    }
    for (let i = 0; i < tolerance * 2 + 1; i++) {
      if (x === y - tolerance + i) {
        return true;
      }
    }
    return false;
  }
}
function part2() {
  const lines = readFileToLines(input);
  const displayGrid = getDisplay();
  startDisplay(displayGrid, lines);
  return "As Above, try squinting";
}

console.log(part1());
console.log(part2());

// Day4
import * as fs from "fs";

const input = "./input.txt";
const test = "./test.txt";
function readFileToLines(input: string) {
  return fs.readFileSync(input, "utf8").split("\r\n");
}
interface pairOfRanges {
  rangeA: number[];
  rangeB: number[];
}
function linesToRanges(lines: string[]) {
  const rangesList: pairOfRanges[] = [];
  lines.forEach((line) => {
    const rangePair: pairOfRanges = {
      rangeA: [],
      rangeB: [],
    };
    let bool = true;
    line.split(",").forEach((range) => {
      range.split("-").forEach((num) => {
        if (bool) {
          rangePair.rangeA.push(Number(num));
        } else {
          rangePair.rangeB.push(Number(num));
        }
      });
      bool = false;
    });
    rangesList.push(rangePair);
  });
  return rangesList;
}
function compareRangeForCompleteOverlap(pairOfRanges: pairOfRanges) {
  if (
    pairOfRanges.rangeA[0] >= pairOfRanges.rangeB[0] &&
    pairOfRanges.rangeA[1] <= pairOfRanges.rangeB[1]
  ) {
    return 1;
  } else if (
    pairOfRanges.rangeA[0] <= pairOfRanges.rangeB[0] &&
    pairOfRanges.rangeA[1] >= pairOfRanges.rangeB[1]
  ) {
    return 1;
  } else {
    return 0;
  }
}
function part1() {
  const lines = readFileToLines(input);
  const rangesList = linesToRanges(lines);
  let count = 0;
  rangesList.forEach((range) => {
    count += compareRangeForCompleteOverlap(range);
  });
  return count;
}
function compareRangeForPartialOverlap(pairOfRanges: pairOfRanges) {
  if (
    pairOfRanges.rangeA[0] >= pairOfRanges.rangeB[0] &&
    pairOfRanges.rangeA[0] <= pairOfRanges.rangeB[1]
  ) {
    return 1;
  } else if (
    pairOfRanges.rangeA[1] >= pairOfRanges.rangeB[0] &&
    pairOfRanges.rangeA[1] <= pairOfRanges.rangeB[1]
  ) {
    return 1;
  } else if (
    pairOfRanges.rangeB[0] >= pairOfRanges.rangeA[0] &&
    pairOfRanges.rangeB[0] <= pairOfRanges.rangeA[1]
  ) {
    return 1;
  } else if (
    pairOfRanges.rangeB[1] >= pairOfRanges.rangeA[0] &&
    pairOfRanges.rangeB[1] <= pairOfRanges.rangeA[1]
  ) {
    return 1;
  } else {
    return 0;
  }
}
function part2() {
  const lines = readFileToLines(input);
  const rangesList = linesToRanges(lines);
  let count = 0;
  rangesList.forEach((range) => {
    count += compareRangeForPartialOverlap(range);
  });
  return count;
}

console.log(part1());
console.log(part2());

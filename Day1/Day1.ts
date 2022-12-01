import * as fs from "fs";

function readFileToLines(input: string) {
  return fs.readFileSync(input, "utf8").split("\n");
}
interface elf {
  values: number[];
  sum: number;
}
function sum(number: number[]) {
  return number.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);
}
function linesToElves(lines: string[]) {
  const elves: elf[] = [];
  let elf: elf = {
    values: [],
    sum: 0,
  };
  lines.forEach((line) => {
    const num = Number(line);
    if (num === 0) {
      elf.sum = sum(elf.values);
      elves.push(elf);
      elf = {
        values: [],
        sum: 0,
      };
    } else {
      elf.values.push(num);
    }
  });
  elf.sum = sum(elf.values);
  elves.push(elf);
  return elves;
}
function findMaxCalorieElf(elves: elf[]) {
  let maxElf: elf = {
    values: [],
    sum: 0,
  };
  elves.forEach((elf: elf) => {
    if (elf.sum > maxElf.sum) {
      maxElf = elf;
    }
  });
  return maxElf;
}
function findTop3CalorieElf(elves: elf[]) {
  let maxSums: number[] = [0, 0, 0];
  elves.forEach((elf: elf) => {
    let insertIndex = -1;
    for (let index = 0; index < maxSums.length; index++) {
      if (elf.sum > maxSums[index]) {
        insertIndex = index;
      }
    }
    let temp = elf.sum;
    while (insertIndex >= 0) {
      let tempLocal = maxSums[insertIndex];
      maxSums[insertIndex] = temp;
      temp = tempLocal;
      insertIndex -= 1;
    }
  });
  return maxSums;
}

const input = "./input.txt";
const test = "./test.txt";

function part1() {
  const lines = readFileToLines(input);
  const elves = linesToElves(lines);
  const heavyElf = findMaxCalorieElf(elves);
  return heavyElf.sum;
}
function part2() {
  const lines = readFileToLines(input);
  const elves = linesToElves(lines);
  const heavyElf = findTop3CalorieElf(elves);
  return sum(heavyElf);
}
console.log(part1());
console.log(part2());

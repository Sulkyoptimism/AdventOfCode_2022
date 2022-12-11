// Day11
import * as fs from "fs";
import {
  debugConsole,
  getNumberFromString,
  hasNumber,
  productArray,
  sumArray,
} from "../Utils/util";

const input = "./input.txt";
const test = "./test.txt";
const debug = true;
function readFileToMonkeys(input: string) {
  return fs.readFileSync(input, "utf8").split("\r\n\r\n");
}
interface monkey {
  id: number;
  inspectionsCount: number;
  startingItems: number[];
  operation: Function;
  opVar: number;
  testFunc: Function;
  testOutput: number[];
  testVar: number;
}
function monkeyLinesToMonkeys(lines: string[]) {
  const monkeys: monkey[] = [];

  lines.forEach((monkeyBlock) => {
    monkeys.push(getMonkeyFromLine(monkeyBlock));
  });
  return monkeys;

  function getMonkeyFromLine(line: string) {
    let currentMonkey: monkey = {
      id: 0,
      inspectionsCount: 0,
      startingItems: [],
      operation: () => {},
      opVar: 0,
      testFunc: test,
      testOutput: [],
      testVar: 0,
    };
    line.split("\r\n").forEach((line) => {
      if (line.includes("Monkey") && !line.includes("throw")) {
        currentMonkey.id = getNumberFromString(line);
      } else if (line.includes("Starting")) {
        let temp = line
          .replace("Starting items:", "")
          .replace(/,/g, "")
          .trim()
          .split(" ")
          .map((x) => Number(x));
        currentMonkey.startingItems = temp;
      } else if (line.includes("Operation")) {
        let operation: Function = () => {};
        if (line.includes("*")) {
          const num = getNumberFromString(line.trim());
          currentMonkey.opVar = num;
          operation = num === 0 ? opSqr : opMul;
        } else if (line.includes("+")) {
          const num = getNumberFromString(line.trim());
          currentMonkey.opVar = num;
          operation = opPlus;
        } else if (line.includes("-")) {
          const num = getNumberFromString(line.trim());
          currentMonkey.opVar = num;
          operation = opMinus;
        }
        currentMonkey.operation = operation;
      } else if (line.includes("Test")) {
        currentMonkey.testVar = getNumberFromString(line.trim());
      } else if (line.includes("true")) {
        currentMonkey.testOutput[1] = getNumberFromString(line);
      } else if (line.includes("false")) {
        currentMonkey.testOutput[0] = getNumberFromString(line);
      }
    });
    return currentMonkey;
  }

  function test(input: number, div: number) {
    return input % div === 0;
  }

  function opSqr(old: number): number {
    return old * old;
  }
  function opMul(old: number, num: number): number {
    return old * (Number.isNaN(num) ? old : num);
  }

  function opPlus(old: number, num: number): number {
    return old + (Number.isNaN(num) ? old : num);
  }

  function opMinus(old: number, num: number): number {
    return old - (Number.isNaN(num) ? old : num);
  }
}
function monkeyBusiness(
  monkeys: monkey[],
  limit: number,
  reduce: boolean,
  modulus: number
) {
  while (limit > 0) {
    monkeyStep();
    limit -= 1;
  }

  return monkeys;

  function monkeyStep() {
    monkeys.forEach((monkey: monkey) => {
      monkey.startingItems.forEach((item) => {
        let currWorry = monkey.operation(item, monkey.opVar);
        if (modulus != 0) {
          currWorry = currWorry % modulus;
        }
        monkey.inspectionsCount += 1;
        if (reduce) {
          currWorry = Math.floor(currWorry / 3);
        }
        const toMonkeyIndex =
          monkey.testOutput[Number(monkey.testFunc(currWorry, monkey.testVar))];
        monkeys[toMonkeyIndex].startingItems.push(currWorry);
        monkey.startingItems = monkey.startingItems.slice(1);
      });
    });
  }
}

function findAndMulHighInspections(res: monkey[], numberOfMonkeys: number) {
  let highInspMonkeys = res.map((monk) => monk.inspectionsCount);
  highInspMonkeys = highInspMonkeys.sort((a, b) => a - b);
  return highInspMonkeys.reverse().slice(0, 2);
}

function part1() {
  const lines = readFileToMonkeys(input);
  const monkeys = monkeyLinesToMonkeys(lines);
  const res = monkeyBusiness(monkeys, 20, true, 0);
  const overallMonkeyBusiness = findAndMulHighInspections(res, 2);
  return productArray(overallMonkeyBusiness);
}
function part2() {
  const lines = readFileToMonkeys(input);
  const monkeys = monkeyLinesToMonkeys(lines);
  const modulus = monkeys.map((m) => m.testVar).reduce((a, b) => a * b, 1);
  const res = monkeyBusiness(monkeys, 10000, false, modulus);
  console.log(res);
  const overallMonkeyBusiness = findAndMulHighInspections(res, 2);
  console.log(overallMonkeyBusiness);
  return productArray(overallMonkeyBusiness);
}

console.log(part1());
console.log(part2());

// Day3
import * as fs from "fs";
import { sumArray } from "../Utils/util";

const input = "./input.txt";
const test = "./test.txt";
function readFileToLines(input: string) {
  return fs.readFileSync(input, "utf8").split("\r\n");
}
function getPriorityOfChar(input: string) {
  const isUpper = input === input.toUpperCase();
  return input.charCodeAt(0) - (isUpper ? 38 : 96);
}
function splitIntoBags(lines: string[]) {
  const compartmentsA: string[] = [];
  const compartmentsB: string[] = [];
  lines.forEach((line) => {
    compartmentsA.push(line.slice(0, line.length / 2));
    compartmentsB.push(line.slice(line.length / 2, line.length));
  });
  return [compartmentsA, compartmentsB];
}
function compareBags(bagA: string, bagB: string) {
  let errorChar = "";
  [...bagA].forEach((char) => {
    if (bagB.includes(char)) {
      errorChar = char;
    }
  });
  return errorChar;
}
function part1() {
  const [bagsA, bagsB] = splitIntoBags(readFileToLines(input));
  const errors: number[] = [];
  bagsA.forEach((bagA, index) => {
    const bagB = bagsB[index];
    // console.log([bagA, bagB]);
    const errorChar = compareBags(bagA, bagB);
    // console.log(errorChar);
    const score = getPriorityOfChar(errorChar);
    errors.push(score);
  });
  // console.log(errors);
  return sumArray(errors);
}
function calculateCommonCharBetween3Lines(lines: string[], num: number) {
  const keyChars: number[] = [];
  for (let index = 0; index < lines.length; index += num) {
    const lineList: string[] = [];
    for (let iindex = index; iindex < index + num; iindex++) {
        lineList.push(lines[iindex]);    
    }
    [...new Set([...lineList[0]])].forEach((char)=> {
        const target = num;
        let count = 1;
        lineList.slice(1).forEach((lineToCompare) =>{
            if(lineToCompare.includes(char)){
                count += 1;
            }
        })
        if(target == count) {
            keyChars.push(getPriorityOfChar(char));
        }
    })
  }
  return keyChars;
}
function part2() {
  const lines = readFileToLines(input);
  const errors: number[] = calculateCommonCharBetween3Lines(lines, 3);
  return sumArray(errors);
}
console.log(part1());
console.log(part2());

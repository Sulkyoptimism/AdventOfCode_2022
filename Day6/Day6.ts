// Day6 
import * as fs from "fs";

const input = "./input.txt";
const test = "./test.txt";
function readFileToLine(input: string) {
  return fs.readFileSync(input, "utf8");
}
function findConsecutiveDifferences(line: string, gapSize: number) {
    const chars = [...line];
    for (let i = 0; i < chars.length - gapSize; i++) {
        const selection = chars.slice(i, i + gapSize);
        const selectCheck = new Set(chars.slice(i,i + gapSize));
        if (selection.length === selectCheck.size) {
            return i + gapSize;
        }
    }
    return -1;
}
function part1() {
    const line = readFileToLine(input);
    const index = findConsecutiveDifferences(line, 4);
    return index;
}
function part2() {
    const line = readFileToLine(input);
    const index = findConsecutiveDifferences(line, 14);
    return index;}

console.log(part1());
console.log(part2());
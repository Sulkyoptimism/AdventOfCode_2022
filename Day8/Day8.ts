// Day8 
import * as fs from "fs";
import { sumArray } from "../Utils/util";

const input = "./input.txt";
const test = "./test.txt";
function readFileToLines(input: string) {
  return fs.readFileSync(input, "utf8").split("\r\n");
}

function getNumberMatrix(lines: string[]){
    return lines.map((line) => [...line].map((str) => Number(str)));
}

function checkTrees(numMatrix: number[][]){
    let outCount = 0;
    for (let row = 1; row < numMatrix.length - 1; row++) {
        for (let cell = 1; cell < numMatrix[row].length - 1; cell++) {
            let countUp = false;
            const height = numMatrix[row][cell];
            const currentRowMax = Math.max(...numMatrix[row].slice(0, cell));
            const remainingRowMax = Math.max(...numMatrix[row].slice(cell+1));
            const currentColMax = Math.max(...numMatrix.map((val, i) => {return i < row ? val[cell] : 0}));
            const remainingColMax = Math.max(...numMatrix.map((val, i) => {return i > row ? val[cell] : 0}));
            if (height > currentRowMax){
                countUp = true;
            } else if (height > remainingRowMax) {
                countUp=true;
            } else if (height > currentColMax) {
                countUp=true;
            } else if (height > remainingColMax) {
                countUp=true;
            }
            outCount += Number(countUp);
        }        
    }
    outCount += (numMatrix.length * 2) + ((numMatrix[0].length -2) *2);
    return outCount;
}
function checkTrees2(numMatrix: number[][]){
    let outScore = 0;
    for (let row = 1; row < numMatrix.length - 1; row++) {
        for (let cell = 1; cell < numMatrix[row].length - 1; cell++) {
            const height = numMatrix[row][cell];
            const currentRow = numMatrix[row].slice(0, cell);
            const remainingRow = numMatrix[row].slice(cell+1);
            const currentCol = numMatrix.slice(0, row).map((val, i) => {return val[cell]});
            const remainingCol = numMatrix.slice(row+1).map((val, i) => {return val[cell]});
            const rows = [currentRow.reverse(), remainingRow, currentCol.reverse(), remainingCol];
            const scores: number[] = [];
            rows.forEach((row) => {
                let blocked = false;
                let index = 0;
                for (index = 0; index < row.length; index++) {
                    if (row[index] >= height){
                        blocked = true;
                        index += 1;
                        break;
                    }
                }
                scores.push(index);
            });
            let scoreTotal = 1;
            scores.forEach((score) => {
                scoreTotal *= score;
            })
            if(outScore < scoreTotal){
                outScore = scoreTotal;
            }
        }        
    }
    return outScore;
}
function part1(){
    const lines = readFileToLines(input);
    const numMatrix = getNumberMatrix(lines);
    const count = checkTrees(numMatrix);
    return count;
}
function part2(){
    const lines = readFileToLines(input);
    const numMatrix = getNumberMatrix(lines);
    const count = checkTrees2(numMatrix);
    return count;
}
console.log(part1());
console.log(part2());
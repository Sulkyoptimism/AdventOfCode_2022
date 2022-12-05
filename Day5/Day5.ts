// Day5 
import * as fs from "fs";
import {Stack} from '../Utils/stack';
import { getOrdefaultStack } from "../Utils/util";

const input = "./input.txt";
const test = "./test.txt";
function readFileToPartsThenLines(input: string) {
    const parts = fs.readFileSync(input, "utf8").split("\r\n\r\n");
    const stacks = parts[0].split('\r\n');
    const instructions = parts[1].split('\r\n');
    return [stacks, instructions];
}
function extractCode(line:string) {
    const charArr = [...line];
    const out: string[] = []
    for (let index = 1; index < charArr.length; index += 4) {
        out.push(charArr[index]);
    }
    return out;
}
function getStacksFromLines(lines: string[], width: number) {
    const stacks: Stack<string>[] = [];
    for (let index = 0; index < width; index++) {
        stacks.push(new Stack<string>);
    }
    lines
        .reverse()
        .slice(1)
        .forEach((line) => {
            const charsInLine = extractCode(line);
            charsInLine.forEach((char, index) => {
                if ( char != ' ') {
                    stacks[index].push(char);
                }
            })
        })
    return stacks;
}
function getCodesFromInstructions(instructions: string[]) {
    const instructionCodeList: any[]=[];
    instructions.forEach((line) => {
        const nums = (line.match(/[0-9]+/g) || []).map(num => parseInt(num));
        instructionCodeList.push(nums);
    })
    return instructionCodeList;
}
function moveBoxesIndividually(stacks: Stack<string>[], instructionCodes: any[]) {
    instructionCodes.forEach((codes) => {
        for (let i = 0; i < codes[0]; i++) {
            let char: string | undefined = stacks[codes[1] - 1].pop();
            char = char === undefined ? '' : char;
            stacks[codes[2] - 1].push(char);
        }
    })
    return stacks;
}
function part1() {
    const [linesOfBoxes, instructions] = readFileToPartsThenLines(input);
    const depth = linesOfBoxes.length - 1;
    const width = Number(linesOfBoxes[depth].charAt(linesOfBoxes[depth].length-2));
    const stacks = getStacksFromLines(linesOfBoxes, width);
    const instructCodes = getCodesFromInstructions(instructions);
    const finalStacks = moveBoxesIndividually(stacks, instructCodes);
    const finalMsg = finalStacks.map(((stack) => stack.peek()));
    return finalMsg.join('');
}

function moveBoxesGroup(stacks: Stack<string>[], instructionCodes: any[]) {
    instructionCodes.forEach((codes) => {
        const boxes: string[] = [];
        for (let i = 0; i < codes[0]; i++) {
            let box: string | undefined = stacks[codes[1] - 1].pop();
            box = box === undefined ? '' : box;
            boxes.push(box);
        }
        stacks[codes[2] - 1].pushAllReversed(boxes);

    })
    return stacks;
}

function part2() {
    const [linesOfBoxes, instructions] = readFileToPartsThenLines(input);
    const depth = linesOfBoxes.length - 1;
    const width = Number(linesOfBoxes[depth].charAt(linesOfBoxes[depth].length-2));
    const stacks = getStacksFromLines(linesOfBoxes, width);
    const instructCodes = getCodesFromInstructions(instructions);
    const finalStacks = moveBoxesGroup(stacks, instructCodes);
    const finalMsg = finalStacks.map(((stack) => stack.peek()));
    return finalMsg.join('');
}

console.log(part1());
console.log(part2());



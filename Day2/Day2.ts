// Day2
import * as fs from "fs";

const input = "./input.txt";
const test = "./test.txt";
function readFileToLines(input: string) {
  return fs.readFileSync(input, "utf8").split("\r\n");
}
function getVal(input: string) {
  switch (input) {
    case "A":
    case "X":
      return 1;
    case "B":
    case "Y":
      return 2;
    case "C":
    case "Z":
      return 3;
    default:
      return 0;
  }
}
function getName(input: string) {
    switch (input) {
      case "A":
      case "X":
        return 'Rock';
      case "B":
      case "Y":
        return 'Paper';
      case "C":
      case "Z":
        return 'Scissors';
      default:
        return 'none';
    }
  }
/* 
rock 1 - paper 2 = -1 loss
paper 2 - scissors 3 = -1 loss
scissors 3 - rock 1 = 2 loss

rock 1 - scissors 3 = -2 win
paper 2 - rock 1 = 1 win
scissors 3 - paper 2 = 1 win 
*/
function calculateHand(mine: number, theirs: number) {
  const diff = mine - theirs;
  if (diff === 0) {
    return 3 + mine;
  }
  const odd = (Math.abs(diff) % 2) != 0;
  const pos = diff > 0;
  const win = (odd && pos) || (!odd && !pos);
  return (Number(win) * 6) + mine;
}

function getHandFrom(opp: number, outcome: string) {
    let out = 99;
    if (outcome === "X") {
        out = ((opp + 2) % 3);
    } else if (outcome === "Y") {
        out = opp;
    } else if (outcome === "Z") {
        out = Math.abs((opp + 1) % 3);
    }
    return out === 0 ? 3 : out;
}

function part1() {
  const lines: any[] = readFileToLines(test);
  console.log(lines);
  const scores: number[] = [];
  lines.forEach((hand) => {
    const score = calculateHand(getVal(hand[2]), getVal(hand[0]));
    console.log(score + ' with ' + getName(hand[2]));
    scores.push(score);
  });
  return scores.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);
}

function part2() {
    const lines: any[] = readFileToLines(input);
    const scores: number[] = [];
    lines.forEach((hand) => {
        console.log(getName(hand[0]) + hand[2]);
        const score = calculateHand(getHandFrom(getVal(hand[0]), hand[2]), getVal(hand[0]));
        console.log(getHandFrom(getVal(hand[0]), hand[2]));
        console.log("score " + score);
        scores.push(score);
      });
      return scores.reduce((accumulator, current) => {
        return accumulator + current;
      }, 0);
}

console.log(part1());
console.log(part2());

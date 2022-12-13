// Day12
import * as fs from "fs";
import { Queue } from "../Utils/Queue";
const input = "./input.txt";
const test = "./test.txt";
const debug = true;
function readFileToLines(input: string) {
  return fs.readFileSync(input, "utf8").split("\r\n");
}
function alphaToNum(input: string) {
  return input.charCodeAt(0) - 97;
}
class Node {
  pos: number[];
  elevation: number;
  paths: number[][];
  constructor(pos: number[], ele: number) {
    this.pos = pos;
    this.elevation = ele;
    this.paths = [];
  }
  generatePaths(map: Node[][]) {
    const [currX, currY] = this.pos;
    const potentialPaths = [
      [currX, currY + 1],
      [currX, currY - 1],
      [currX - 1, currY],
      [currX + 1, currY],
    ];
    potentialPaths.forEach((ppath) => {
      if (
        ppath[0] >= 0 &&
        ppath[0] < map.length &&
        ppath[1] >= 0 &&
        ppath[1] < map[0].length
      ) {
        if (map[ppath[0]][ppath[1]].elevation <= this.elevation + 1) {
          this.paths.push(ppath);
        }
      }
    });
  }
}
function getShortestPath(
  heightMap: Node[][],
  startPos: number[],
  endPos: number[]
): [boolean, any] {
  let front = new Queue();
  front.push(startPos);
  let prevPath: any = {};
  prevPath[startPos.toString()] = null;

  while (front.getItems().length > 0) {
    let currPos: number[] = front.getNext();

    if (currPos === endPos) {
      break;
    }

    heightMap[currPos[0]][currPos[1]].paths.forEach((path) => {
      if (prevPath[path.toString()] === undefined) {
        front.push(path);
        const index = path.toString();
        prevPath[index] = currPos;
      }
    });
  }

  let currPos = endPos;
  let path: number[][] = [];
  try {
    while (currPos != startPos) {
      path.push(currPos);
      currPos = prevPath[currPos.toString()];
    }
  } catch (error) {
    return [false, prevPath];
  }

  return [true, path.length];
}
function makeNodeMapPlusMeta(lines: string[]): [Node[][], number[], number[]] {
  let map: Node[][] = [];
  let startPos: number[] = [];
  let endPos: number[] = [];
  lines.forEach((line, x) => {
    let nodeRow: Node[] = [];
    [...line].forEach((cell, y) => {
      let elevation = alphaToNum(cell);
      if (cell === "S") {
        startPos = [x, y];
        elevation = 0;
      } else if (cell === "E") {
        endPos = [x, y];
        elevation = 25;
      }
      nodeRow.push(new Node([x, y], elevation));
    });
    map.push(nodeRow);
  });
  map.forEach((row) => {
    row.forEach((cell) => {
      cell.generatePaths(map);
    });
  });
  return [map, startPos, endPos];
}
function part1() {
  const [map, startPos, endPos] = makeNodeMapPlusMeta(readFileToLines(input));
  const ret = getShortestPath(map, startPos, endPos);
  return ret[1];
}
function part2() {
  const [map, startPos, endPos] = makeNodeMapPlusMeta(readFileToLines(input));
  const bads = new Set<string>();
  const goods: number[] = [];
  map.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (!bads.has([x, y].toString())) {
        if (cell.elevation === 0) {
          const [found, res] = getShortestPath(map, [x, y], endPos);
          if (found) {
            goods.push(Number(res));
          } else {
            for (const [key, value] of Object.entries(res)) {
                bads.add(key);
              }
          }
        }
      }
    });
  });

  return Math.min(...goods);
}
console.log(part1());
console.log(part2());

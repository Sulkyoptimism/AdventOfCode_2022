// Day7
import * as fs from "fs";
import { sumArray } from "../Utils/util";

const input = "./input.txt";
const test = "./test.txt";
function readFileToLines(input: string) {
  return fs.readFileSync(input, "utf8").split("\r\n");
}
interface directory {
  name: string;
  parent: directory | null;
  subDirs: directory[];
  size: number;
  files: any[];
}
function buildTree(lines: string[]) {
  let rootDir: directory = {
    name: "/",
    parent: null,
    subDirs: [],
    size: 0,
    files: [],
  };
  let currentDir = rootDir;
  lines.forEach((line) => {
        if(!line.includes('/')){
            if (line.includes('dir ')) {
                //add to current
                currentDir.subDirs.push({
                    name: line.replace('dir ', ''),
                    parent: currentDir,
                    subDirs: [],
                    size: 0,
                    files: [],
                })
            } else if(/\d/.test(line)) {
                //add to current
                const res = line.match(/\d+/);
                if( res !== null) {
                    currentDir.files.push(res[0]);
                    currentDir.size += Number(res[0]);
                }
            } else if(line.includes('$ cd') && !line.includes('..')) {
                //move down
                const name = line.replace('$ cd ', '');
                currentDir.subDirs.forEach((subDir) => {
                    if(subDir.name === name) {
                        currentDir = subDir;
                    }
                })
            } else if(line.includes('$ cd') && line.includes('..')) {
                //move up
                if(currentDir.parent !== null) {
                    if(currentDir.parent.name !== '/'){
                        currentDir.parent.size+=currentDir.size;    
                    }
                    currentDir = currentDir.parent;
                }
            }
        }
  });
  rootDir.size = sumArray(rootDir.subDirs.map((dir) => dir.size)) + rootDir.size;
  return rootDir;
}


function findDirsWithSizeLower(dirs: directory, lowerThan: number, dirList: number[]) {
    if(dirs.size < lowerThan) {
        dirList.push(dirs.size);
    }
    if ( dirs.subDirs.length !== 0) {
        dirs.subDirs.forEach((dir) => {
            findDirsWithSizeLower(dir, lowerThan, dirList);
        })
    }
    return dirList;
}

function findDirWithSizeHigherCloset(dirs: directory, lowerThan: number, lowestDiffPos: number) {
    if((dirs.size - lowerThan > 0) && (dirs.size - lowerThan < lowestDiffPos)) {
        lowestDiffPos = dirs.size - lowerThan;
    }
    if ( dirs.subDirs.length !== 0) {
        dirs.subDirs.forEach((dir) => {
            const low = findDirWithSizeHigherCloset(dir, lowerThan, lowestDiffPos);
            if (low < lowestDiffPos) {
                lowestDiffPos = low;
            }
        })
    }
    return lowestDiffPos;
}

function part1() {
  const lines = readFileToLines(input);
  const tree = buildTree(lines);
  const sizeList: number[] = [];
  findDirsWithSizeLower(tree, 100000, sizeList);
  return sumArray(sizeList);
}
function part2() {
    const lines = readFileToLines(input);
    const tree = buildTree(lines);
    let num = Number.MAX_VALUE;
    const maxSize = 70000000;
    const spaceFree = maxSize - tree.size;
    const spaceRequired = 30000000;
    const spaceNeededNow = spaceRequired - spaceFree;
    num = findDirWithSizeHigherCloset(tree, spaceNeededNow, num);
    return spaceNeededNow + num;
}

console.log(part1());
console.log(part2());

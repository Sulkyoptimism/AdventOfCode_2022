import { Stack } from "./stack";

export function sumArray(arr: number[]) {
    return arr.reduce((accumulator, current) => {
        return accumulator + current;
      }, 0);
}
export function productArray(arr: number[]) {
  return arr.reduce( (a, b) => a * b, 1 )
}
export function getOrdefaultStack(stack: Stack<string>, def: string) {
  if(stack.peek() === null || stack.peek() === undefined) {
    return def;
  } else {
    return stack.peek();
  }
}

export function hasNumber(myString: string) {
  return /\d/.test(myString);
}

export function getNumberFromString(myString: string){
  return Number(myString.match(/-?\d+/g));
}

export function debugConsole(string: any, allowed:boolean){
  if(allowed){
    console.log(string);
  }
}
export function sumArray(arr: number[]) {
    return arr.reduce((accumulator, current) => {
        return accumulator + current;
      }, 0);
}
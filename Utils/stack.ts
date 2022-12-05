export class Stack<T> {
    private array: T[] = [];
  
    pop(): T | undefined {
      if (this.isEmpty()) throw new Error();
  
      return this.array.pop();
    }
  
    push(data: T): void {
      this.array.push(data);
    }

    pushAll(data: T[]): void {
        data.forEach(el => {
            this.array.push(el);
        });
    }
    pushAllReversed(data: T[]): void {
        data.reverse().forEach(el => {
            this.array.push(el);
        });
    }
  
    peek(): T {
      if (this.isEmpty()) throw new Error();
  
      return this.array[this.array.length - 1];
    }
  
    isEmpty(): boolean {
      return this.array.length === 0;
    }
  }
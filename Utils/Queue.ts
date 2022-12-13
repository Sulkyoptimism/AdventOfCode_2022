export class Queue {
  items: any[] =[];

  constructor(...params: any[]) {
  }

  push(item: any) {
    this.items.push(item);
  }
  getNext() {
    return this.items.shift();
  }
  getItems(){
    return [...this.items];
  }
}

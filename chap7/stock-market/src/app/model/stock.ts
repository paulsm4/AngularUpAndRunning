export class Stock {
  favorite: boolean;
  notablePeople : Person[];

  constructor(
    public name: string,
    public code: string,
    public price: number,
    public previousPrice: number) {
      this.favorite = false;
      this.notablePeople = [];
  }

  isPositiveChange(): boolean {
    console.log('Stock::isPositiveChange:', this);
    return this.price >= this.previousPrice;
  }
}

export class Person {
  name: string;
  title: string;
}

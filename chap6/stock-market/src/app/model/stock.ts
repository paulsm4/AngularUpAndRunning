export class Stock {
  /* tslint:disable */
  favorite: boolean = false;
  /* tslint:enable */

  constructor(public name: string,
              public code: string,
              public price: number,
              public previousPrice: number,
              public exchange: string ) {}

  isPositiveChange(): boolean {
    console.log('Stock::isPositiveChange:', this);
    return this.price >= this.previousPrice;
  }
}

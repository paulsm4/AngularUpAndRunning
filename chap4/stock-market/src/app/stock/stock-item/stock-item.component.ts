import { Component, OnInit } from '@angular/core';

import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  // templateUrl: './stock-item.component.html',
  template: `
  <div class="stock-container"
  *ngFor="let stock of stocks; index as i; trackBy: trackStockByCode">
    <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
    <div class="price"
        [class]="stock.isPositiveChange() ? 'positive' : 'negative'">
        $ {{stock.price}}</div>
    <button (click)="toggleFavorite($event, i)"
        [disabled]="stock.favorite">Add to Favorite</button>
  </div>
  `,
  // styleUrls: ['./stock-item.component.css' ]
  styles: [`
  stock-container {
    border: 1px solid black;
    border-radius: 5px;
    display: inline-block;
    padding: 10px;
  }

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }
  `]
})
export class StockItemComponent implements OnInit {

  public stocks: Array<Stock>;

  constructor() { }

  ngOnInit() {
    this.stocks =[
      new Stock('Test Stock Company', 'TSC', 85, 80),
      new Stock('Second Stock Company', 'SSC', 10, 20),
      new Stock('Last Stock Company', 'LSC', 876, 765)];
  }

  toggleFavorite(event, index) {
    console.log('We are toggling the favorite state of this stock', index, event);
    this.stocks[index].favorite = !this.stocks[index].favorite;
  }

  trackStockByCode(index, stock) {
    return stock.code;
  }
}

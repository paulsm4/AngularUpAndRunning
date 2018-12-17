import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css' ]
})

// export class StockItemComponent implements OnInit {
export class StockItemComponent {
  @Input() public stock: Stock;
  @Output() private toggleFavorite: EventEmitter<Stock>;

  constructor() {
    this.toggleFavorite = new EventEmitter<Stock>();
   }

  /* ngOnInit() {
    this.stocks =[
      new Stock('Test Stock Company', 'TSC', 85, 80),
      new Stock('Second Stock Company', 'SSC', 10, 20),
      new Stock('Last Stock Company', 'LSC', 876, 765)];
  } */

/*   toggleFavorite(event) {
    console.log('We are toggling the favorite state of this stock', event);
    this.stock.favorite = !this.stock.favorite;
  }
 */
  onToggleFavorite(event) {
    this.toggleFavorite.emit(this.stock);
  }
}

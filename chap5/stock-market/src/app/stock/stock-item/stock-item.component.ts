import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent {

  @Input() public stock: Stock;
  @Output() toggleFavorite: EventEmitter<Stock>;

  constructor() {
    this.toggleFavorite = new EventEmitter<Stock>();
   }

  onToggleFavorite(event) {
    console.log('StockItemComponent.onToggleFavorite()', stock, ' was triggered');
    this.toggleFavorite.emit(this.stock);
  }
}

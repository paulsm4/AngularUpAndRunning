import { Component, OnInit } from '@angular/core';
import { Stock} from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {

  public name: string;
  public code: string;
  public price: number;
  public previousPrice: number;
  public positiveChange: boolean;
  public favorite: boolean;

  public stock: Stock;

  constructor() { }

  ngOnInit() {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  }

  toggleFavorite(event) {
    console.log('We are toggling the favorite state of this stock', event);
    this.stock.favorite = !this.stock.favorite;
  }
}

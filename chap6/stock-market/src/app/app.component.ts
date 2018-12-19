import { Component, OnInit } from '@angular/core';
import { Stock } from './model/stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stock Market App';

  public stock: Stock;

  ngOnInit(): void {
    console.log('app.ntOnInit()', this);
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  }

  onToggleFavorite(stock: Stock) {
    console.log('app.onToggleFavorite()', stock, ' was triggered');
    this.stock.favorite = !this.stock.favorite;
  }
}

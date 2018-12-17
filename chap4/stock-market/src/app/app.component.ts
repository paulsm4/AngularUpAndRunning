import { Component, OnInit } from '@angular/core';
import { Stock } from './model/stock';

// import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.Native
})
export class AppComponent implements OnInit {
  title = 'Stock Market App';

  public stock: Stock;

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  }

  onToggleFavorite(event) {
    console.log('We are toggling the favorite state of this stock', event);
    this.stock.favorite = !this.stock.favorite;
  }

}

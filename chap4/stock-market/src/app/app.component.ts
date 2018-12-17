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
  private counter = 1;

  ngOnInit(): void {
    console.log('app::ngOnInit():', this);
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  }

  onToggleFavorite(event) {
    console.log('app::onToggleFavorite():', event);
    this.stock.favorite = !this.stock.favorite;
  }

  changeStockObject() {
    // This *WILL* update the component with ChangeDetectionStrategy.OnPush
    console.log('app::changeStockObject():', this.stock);
    ++this.counter;
    this.stock = new Stock('New TSC-' + this.counter++, 'NTSC-' + this.counter++, 85, 80);
  }

  changeStockPrice() {
    // This *WILL NOT* update the component, because it's the same reference
    console.log('app::changeStockPrice():', this.stock);
    this.stock.price += 10;
  }

}

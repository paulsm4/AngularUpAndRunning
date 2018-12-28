import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks: Stock[];
  constructor(private stockService: StockService) {
    console.log('StockListComponent::constructor');
  }

  ngOnInit() {
    console.log('StockListComponent::ngOnInit()');
    this.stocks = this.stockService.getStocks();
  }

  onToggleFavorite(stock: Stock) {
    console.log('StockListComponent::onToggleFavorite()', stock);
    this.stockService.toggleFavorite(stock);
  }
}

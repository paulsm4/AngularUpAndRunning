import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';

@Injectable()
export class StockService {

  private stocks: Stock[];
  constructor() {
    console.log('StockService::constructor()');
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
      new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
      new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
    ];
   }

  getStocks(): Stock[] {
    console.log('StockService::getStocks()');
    return this.stocks;
  }

  createStock(stock: Stock) {
    console.log('StockService::createStock()', stock);
    const foundStock = this.stocks.find(each => each.code === stock.code);
    if (foundStock) {
      return false;
    }
    this.stocks.push(stock);
    return true;
  }

  toggleFavorite(stock: Stock) {
    console.log('StockService::toggleFavorite()', stock);
    const foundStock = this.stocks.find(each => each.code === stock.code);
    foundStock.favorite = !foundStock.favorite;
  }
}

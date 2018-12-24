import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';

/* // For lower than RxJS6:
import { Observable } from 'rxjs/Observable';
import { _throw as ObservableThrow } from 'rxjs/observable/throw';
import { of as ObservableOf } from 'rxjs/observable/of';
 */
// For RxJS6 and higher:
import { Observable, throwError, of as ObservableOf } from 'rxjs';

@Injectable()
export class StockService {

  private stocks: Stock[];

  constructor() {
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
      new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
      new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
    ];
   }

  getStocks(): Observable<Stock[]> {
    return ObservableOf(this.stocks);
  }

  createStock(stock: Stock) {
    const foundStock = this.stocks.find(
      each => each.code === stock.code
    );
    if (foundStock) {
      return throwError({
        msg: 'Stock with code ' + stock.code + ' already exists'
      });
    }
    this.stocks.push(stock);
    return ObservableOf({
      msg: 'Stock with code ' + stock.code + ' successfully created'
    });
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    const foundStock = this.stocks.find(
      each => each.code === stock.code
    );
    foundStock.favorite = !foundStock.favorite;
    return ObservableOf(foundStock);
  }
}

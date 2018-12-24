import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>('/api/stock');
  }

  createStock(stock: Stock): Observable<any> {
    return this.http.post('/api/stock', stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>('/api/stock' + stock.code, {
      favorite: !stock.favorite
    });
   }
}

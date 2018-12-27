import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock';
import { AppSettings } from '../AppSettings';

@Injectable()
export class StockService {

   constructor(private http: HttpClient) {
    console.log('StockService::constructor()', this.http);
  }

  getStocks(): Observable<Stock[]> {
    console.log('StockService::getStocks()');
    return this.http.get<Stock[]>(AppSettings.STOCK_API);
  }

  createStock(stock: Stock): Observable<any> {
    console.log('StockService::createStock()', stock);
    return this.http.post(AppSettings.STOCK_API, stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    console.log('StockService::toggleFavorite()', stock);
    return this.http.patch<Stock>(AppSettings.STOCK_API + stock.code,
      {
        favorite: !stock.favorite
      });
  }

  makeFailingCall() {
    return this.http.get(AppSettings.FAIL_API);
  }

}

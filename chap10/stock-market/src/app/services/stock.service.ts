import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Stock } from '../model/stock';

@Injectable()
export class StockService {

  constructor(private http: HttpClient) {
    console.log('StockService::constructor()');
  }

  getStocks(): Observable<Stock[]> {
    console.log('StockService::getStocks()');
    return this.http.get<Stock[]>('/api/stock');
  }

  createStock(stock: Stock): Observable<any> {
    console.log('StockService::createStock()', stock);
    return this.http.post('/api/stock', stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    console.log('StockService::toggleFavorite()', stock);
    return this.http.patch<Stock>('/api/stock/' + stock.code,
      {
        favorite: !stock.favorite
      });
  }
}

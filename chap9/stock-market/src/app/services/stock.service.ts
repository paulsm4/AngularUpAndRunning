import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Stock } from '../model/stock';

@Injectable()
export class StockService {

  constructor(private http: HttpClient) {
    console.log('StockService::constructor()', this.http);
  }

  getStocks(): Observable<Stock[]> {
    console.log('StockService::getStocks()');
    return this.http.get<Stock[]>('/api/stock', {
      // Two options for setting HTTP headers: 1) new HttpHeaders object*, or JS object
      headers: new HttpHeaders()
        .set('Authorization', 'MyAuthorizationHeaderValue')
        .set('X-EXAMPLE-HEADER', 'TestExampleHeaderValue'),
      // Two options for setting query parameters: 1) new HttpParams object, or JS object*
      params: {
        q: 'test',
        test: 'value'
      }
    });
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

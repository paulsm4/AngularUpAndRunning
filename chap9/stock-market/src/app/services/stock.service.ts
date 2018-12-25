import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http/src/response';

import { Observable } from 'rxjs';

import { Stock } from '../model/stock';

import {AppSettings} from '../AppSettings';

@Injectable()
export class StockService {

   constructor(private http: HttpClient) {
    console.log('StockService::constructor()', this.http);
  }

  getStocks(): Observable<Stock[]> {
    console.log('StockService::getStocks()');
    return this.http.get<Stock[]>(AppSettings.STOCK_API, {
      // Two options for setting HTTP headers: 1) new HttpHeaders object*, or JS object
      headers: new HttpHeaders()
        .set('Authorization', 'MyAuthorizationHeaderValue')
        .set('X-EXAMPLE-HEADER', 'TestExampleHeaderValue'),
      // Two options for setting query parameters: 1) new HttpParams object, or JS object*
      params: {
        q: 'test',
        test: 'value'
      },
      observe: 'body'
    });
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

  getStocksAsResponse(): Observable<HttpResponse<Stock[]>> {
    console.log('StockService::getStocksAsResponse()');
    return this.http.get<Stock[]>(AppSettings.STOCK_API, {
      observe: 'response'
    });
  }

  getStocksAsEvents(): Observable<HttpEvent<any>> {
    console.log('StockService::getStocksAsEvents()');
    return this.http.get(AppSettings.STOCK_API, {
      observe: 'events'
    });
  }

  getStocksAsString(): Observable<string> {
    console.log('StockService::getStocksAsString()');
    return this.http.get(AppSettings.STOCK_API, {
      responseType: 'text'
    });
  }

  getStocksAsBlob(): Observable<Blob> {
    console.log('StockService::getStocksAsBlob()');
    return this.http.get(AppSettings.STOCK_API, {
      responseType: 'blob'
    });
  }

}

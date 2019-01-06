import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http/src/response';
import { Observable } from 'rxjs';

import { Stock } from '../model/stock';
import { UserStoreService } from './user-store.service';

@Injectable()
export class StockService {

  constructor(private http: HttpClient,
              private userStore: UserStoreService) {
    console.log('StockService::constructor()');
              }

  getStocks(): Observable<Stock[]> {
    console.log('StockService::getStocks()');
    return this.http.get<Stock[]>('/api/stock');
  }

  getStock(code: string): Observable<Stock> {
    console.log('StockService::getStock()', code);
    return this.http.get<Stock>('/api/stock/' + code);
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

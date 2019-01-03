import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock';
import { StockService } from '../services/stock.service';

@Injectable()
export class StockLoadResolverService implements Resolve<Stock> {

  constructor(private stockService: StockService) {
    console.log('StockLoadResolverService::constructor');
  }

   resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
      Stock | Observable<Stock> | Promise<Stock> {
    console.log('StockLoadResolverService::resolve', route, state);
    const stockCode = route.paramMap.get('code');
    return this.stockService.getStock(stockCode);
  }

}

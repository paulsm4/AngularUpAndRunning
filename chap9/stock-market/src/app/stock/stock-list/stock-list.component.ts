import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;
  constructor(private stockService: StockService) {
    console.log('StockListComponent::constructor()', this.stockService);
   }

  ngOnInit() {
    console.log('StockListComponent::ngOnInit()');
    this.stocks$ = this.stockService.getStocks();

    this.stockService.getStocksAsResponse()
      .subscribe((response) => {
      console.log('OBSERVE "response" RESPONSE is ', response);
    });

    this.stockService.getStocksAsEvents()
      .subscribe((response) => {
      console.log('OBSERVE "events" RESPONSE is ', response);
    });

    this.stockService.getStocksAsString()
      .subscribe((response) => {
      console.log('Response Type "text" RESPONSE is ', response);
    });

    this.stockService.getStocksAsBlob()
      .subscribe((response) => {
      console.log('Response Type "blob" RESPONSE is ', response);
    });
  }
}

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
    console.log('StockListComponent::ngOnInit()', this.stocks$);
    this.stocks$ = this.stockService.getStocks();
  }
}

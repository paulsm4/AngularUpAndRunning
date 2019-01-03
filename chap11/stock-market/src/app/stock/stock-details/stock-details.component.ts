import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  public stock: Stock;

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute) {
    console.log('StockDetailsComponent::constructor')                ;
  }

  ngOnInit() {
    console.log('StockDetailsComponent::ngOnInit()')                ;
    // VERSION 1: Before Resolver pre-load
    // const stockCode = this.route.snapshot.paramMap.get('code');
    // this.stockService.getStock(stockCode).subscribe(stock => this.stock = stock);

    // VERSION 2: Subscribes to StockDetailsComponent (path '/stock/:code')
    this.route.data.subscribe((data: {stock: Stock}) => {
      console.log('StockDetailsComponent::ngOnInit()@subscription available', data);
      this.stock = data.stock;
    });


  }

}

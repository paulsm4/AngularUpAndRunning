import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockService } from '../../services/stock.service';
import { AuthService } from '../../services/auth.service';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;

  constructor(
    private stockService: StockService,
    private authService: AuthService
  ) {
    console.log('StockListComponent::constructor()');
  }

  ngOnInit() {
    console.log('StockListComponent::ngOnInit()');
    this.fetchStocks();
  }

  fetchStocks() {
    console.log('StockListComponent::fetchStocks()');
    this.stocks$ = this.stockService.getStocks();
  }

  setAuthToken() {
    console.log('StockListComponent::setAuthToken()', this.authService.authToken);
    this.authService.authToken = 'TESTING';
  }

  resetAuthToken() {
    console.log('StockListComponent::resetAuthToken()', this.authService.authToken);
    this.authService.authToken = null;
  }

  makeFailingCall() {
    console.log('StockListComponent::makeFailingCall()', this.authService.authToken);
    this.stockService.makeFailingCall().subscribe(
      (res) => console.log('StockListComponent: Successfully made failing call', res),
      (err) => console.error('StockListComponent: Error making failing call', err));
  }
}

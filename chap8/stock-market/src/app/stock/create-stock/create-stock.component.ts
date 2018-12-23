import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']// ,
  // providers: [MessageService]
})
export class CreateStockComponent {

  public stock: Stock;
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  constructor(
    private stockService: StockService,
    public messageService: MessageService) {
    this.stock =  new Stock('', '', 0, 0, 'NASDAQ');
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm) {
    if (stockForm.valid) {
      const created = this.stockService.createStock(this.stock);
      if (created) {
        this.messageService.message = 'Successfully created stock with stock code: ' + this.stock.code;
        this.stock =  new Stock('', '', 0, 0, 'NASDAQ');
        console.log('createStock@created:', stockForm, this.messageService.message);
      } else {
        this.messageService.message = 'Stock with stock code: ' + this.stock.code + ' already exists';
        console.log('createStock@already exists:', stockForm, this.messageService.message);
      }
    } else {
      console.error('Stock form is in an invalid state');
    }
  }
}

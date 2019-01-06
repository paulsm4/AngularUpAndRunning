import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StockItemComponent } from './stock-item/stock-item.component';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
  declarations: [
    StockDetailsComponent,
    StockItemComponent,
    StockListComponent,
    CreateStockComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StockRoutingModule
  ]
})
export class StockModule {}

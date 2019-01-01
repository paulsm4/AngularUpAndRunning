import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { StockAppInterceptor } from './services/stock-app.interceptor';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockService } from './services/stock.service';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/user-store.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateStockComponent,
    StockItemComponent,
    StockListComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    StockService,
    UserService,
    UserStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StockAppInterceptor,
      multi: true,
    }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }

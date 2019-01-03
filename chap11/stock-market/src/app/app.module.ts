import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { CreateStockDeactivateGuard } from './guards/create-stock-deactivate.guard';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { StockAppInterceptor } from './services/stock-app.interceptor';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockLoadResolverService } from './resolver/stock-load-resolver.service';
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
    StockDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    CreateStockDeactivateGuard,
    StockLoadResolverService,
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

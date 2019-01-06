import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes.module';
import { AuthGuardService } from './services/auth.guard.service';
import { CreateStockDeactivateGuardService } from './services/create-stock-deactivate.guard.service';
import { StockAppInterceptor } from './services/stock-app.interceptor';
import { StockLoadResolverService } from './resolver/stock-load-resolver.service';
import { StockService } from './services/stock.service';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/user-store.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutesModule,
  ],
  providers: [
    StockService,
    UserService,
    UserStoreService,
    AuthGuardService,
    CreateStockDeactivateGuardService,
    StockLoadResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StockAppInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

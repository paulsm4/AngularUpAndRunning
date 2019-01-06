import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { AuthGuardService } from '../services/auth.guard.service';
import { CreateStockDeactivateGuardService } from '../services/create-stock-deactivate.guard.service';
import { StockLoadResolverService } from '../services/stock-load-resolver.service';

const routes: Routes = [
  { path: 'list', component: StockListComponent,
    canActivate: [AuthGuardService] },
  { path: 'create', component: CreateStockComponent,
    canActivate: [AuthGuardService], canDeactivate: [CreateStockDeactivateGuardService] },
  { path: ':code', component: StockDetailsComponent,
    canActivate: [AuthGuardService], resolve: { stock: StockLoadResolverService } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }

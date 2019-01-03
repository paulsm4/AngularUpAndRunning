import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;
  private page = 1;
  constructor(
    private stockService: StockService,
    private userStore: UserStoreService,
    private router: Router,
    private route: ActivatedRoute) {
      console.log('StockListComponent::constructor');
  }

  ngOnInit() {
    console.log('StockListComponent::ngOnInit() Page No. : ',
        this.route.snapshot.queryParamMap.get('page'));
    this.route.queryParams.subscribe((params) => {
      console.log('Page : ', params.page);
      this.stocks$ = this.stockService.getStocks();
    });
  }

  nextPage() {
    console.log('StockListComponent::nextPage()', this.page);
    this.router.navigate([], {
      queryParams: {
        page: ++this.page
      }
    });
  }
}

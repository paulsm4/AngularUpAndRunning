import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListComponent } from './stock-list.component';
import { StockService } from '../../services/stock.service';
import { StockItemComponent } from '../../stock/stock-item/stock-item.component';
import { Stock } from '../../model/stock';

// Example 1: Use the "live" service, with "live" data
describe('StockListComponent With Real Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockListComponent, StockItemComponent ],
      providers: [ StockService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load stocks from real service on init', () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(3);
  });
});

// Example 2: Get a reference to the live service, mock out the "getStocks()" query
describe('StockListComponent With Mock Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let stockService: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockListComponent, StockItemComponent ],
      providers: [ StockService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    // Use the injector in the test fixture to get a handle to the stock service
    stockService = fixture.debugElement.injector.get(StockService);
    /* tslint:disable prefer-const */
    let spy = spyOn(stockService, 'getStocks')
        .and.returnValue([new Stock('Mock Stock', 'MS', 800, 900, 'NYSE')])
    fixture.detectChanges();
  });

  it('should load stocks from mocked service on init', () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(1);
    expect(component.stocks[0].code).toEqual('MS');
  });
});

// Example 3: use fake service and hard-coded fake data
describe('StockListComponent With Fake Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    // Declare the fake: same API as the "real" stockService
    let stockServiceFake = {
      getStocks: () => {
        return [new Stock('Fake Stock', 'FS', 800, 900, 'NYSE')];
      }
    };
    TestBed.configureTestingModule({
      declarations: [ StockListComponent, StockItemComponent ],
      // Inject the fake StockService
      providers: [ {
        provide: StockService,
        useValue: stockServiceFake
      } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load stocks from fake service on init', () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(1);
    expect(component.stocks[0].code).toEqual('FS');
  });
});

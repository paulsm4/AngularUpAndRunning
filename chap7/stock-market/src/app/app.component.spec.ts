import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { Stock } from './model/stock';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {

  describe('Simple, No Angular Unit Test', () => {
    it('should have stock instantiated on ngInit', () => {
      const appComponent = new AppComponent();
      expect(appComponent.stock).toBeUndefined();
      appComponent.ngOnInit();
      expect(appComponent.stock).toEqual(
        new Stock('Test Stock Company', 'TSC', 85, 80));
    });

    it('should have toggle stock favorite', () => {
      const appComponent = new AppComponent();
      appComponent.ngOnInit();
      expect(appComponent.stock.favorite).toBeFalsy();
      appComponent.onToggleFavorite(new Stock('Test', 'TEST', 54, 55));
      expect(appComponent.stock.favorite).toBeTruthy();
      appComponent.onToggleFavorite(new Stock('Test', 'TEST', 54, 55));
      expect(appComponent.stock.favorite).toBeFalsy();
    });
  });

  describe('Angular-Aware test', () => {

    let fixture, component;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ ReactiveFormsModule ],
        declarations: [
          AppComponent,
          StockItemComponent,
          CreateStockComponent
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load stock with default values', () => {
      const titleEl = fixture.debugElement.query(By.css('h1'));
      // Trim to avoid HTML whitespaces
      expect(titleEl.nativeElement.textContent.trim()).toEqual('Stock Market App');

      // Check for default stock values in template
      const nameEl = fixture.debugElement.query(By.css('.name'));
      expect(nameEl.nativeElement.textContent).toEqual('Test Stock Company (TSC)');
      const priceEl = fixture.debugElement.query(By.css('.price.positive'));
      expect(priceEl.nativeElement.textContent).toEqual('$ 85');
      const addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
      expect(addToFavoriteBtnEl).toBeDefined();
    });

    it('should toggle stock favorite correctly', () => {
      expect(component.stock.favorite).toBeFalsy();
      let addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
      expect(addToFavoriteBtnEl).toBeDefined();
      addToFavoriteBtnEl.triggerEventHandler('click', null);

      let s = (addToFavoriteBtnEl.nativeElement.textContent).trim();
      console.log('addToFavoriteBtnEl:', addToFavoriteBtnEl, s);
      expect(s).toEqual('Click to select Favorite');

      fixture.detectChanges();
      expect(component.stock.favorite).toBeTruthy();
      addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
      s = (addToFavoriteBtnEl.nativeElement.textContent).trim();
      console.log('addToFavoriteBtnEl:', addToFavoriteBtnEl, s);
      expect(s).toEqual('Click to unselect Favorite');
      // expect(addToFavoriteBtnEl).toBeNull();
    });
  });

});

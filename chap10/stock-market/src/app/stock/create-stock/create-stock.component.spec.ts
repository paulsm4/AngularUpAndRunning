import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CreateStockComponent } from './create-stock.component';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';

describe('CreateStockComponent', () => {
  let component: CreateStockComponent;
  let fixture: ComponentFixture<CreateStockComponent>;

  // Asynchronous setup for each test
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockComponent ],
      providers: [ StockService ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  // Synchronous setup for each test (do both)
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // This test will execute asynchronously
  // NOTE: alternative is to use "fakeAsync"
  it('should create stock through service', async(() => {
    expect(component).toBeTruthy();
    component.stock = new Stock(
      'My New Test Stock', 'MNTS', 100, 120, 'NYSE');

    // Execute asynchronously
    component.createStock({valid: true});

    fixture.whenStable().then(() => {
      const expectedMsg = 'Successfully created stock with stock code: MNTS';
      // Don't do any of this until fixture Promise completes
      fixture.detectChanges();
      expect(component.message)
          // .toEqual('Stock with code MNTS successfully created');  // WRONG MESSAGE!!!
          .toEqual(expectedMsg);
      const messageDe: DebugElement = fixture.debugElement;
      expect(messageDe).toBeTruthy();
      const paragraphDe = messageDe.query(By.css('.message'));
      console.log('CreateStockComponent test: messageDe', messageDe, 'paragraphDe', paragraphDe);
      expect(paragraphDe).toBeTruthy();
      const p: HTMLElement = paragraphDe.nativeElement;
      expect(p).toBeTruthy();
      console.log('CreateStockComponent test: messageDe', messageDe, 'paragraphDe', paragraphDe, 'p', p);
      expect(p.textContent).toBe(expectedMsg);
    });
  }));
});

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockComponent ],
      providers: [ StockService ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create stock through service', async(() => {
    expect(component).toBeTruthy();
    component.stock = new Stock(
      'My New Test Stock', 'MNTS', 100, 120, 'NYSE');

    component.createStock({valid: true});

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.message)
          // .toEqual('Stock with code MNTS successfully created');  // WRONG MESSAGE!!!
          .toEqual('Successfully created stock with stock code: MNTS');
      const messageDe: DebugElement = fixture.debugElement;
      expect(messageDe).toBeTruthy();
      const paragraphDe = messageDe.query(By.css('.message'));
      console.log('CreateStockComponent test: messageDe', messageDe, 'paragraphDe', paragraphDe);
      // expect(paragraphDe).toBeTruthy();
      // const p: HTMLElement = paragraphDe.nativeElement;
      // expect(p).toBeTruthy();
      // console.log('CreateStockComponent test: messageDe', messageDe, 'paragraphDe', paragraphDe, 'p', p);
      // expect(p.textContent).toBe('Stock with code MNTS successfully created');
    });
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateStockComponent } from './create-stock.component';

describe('CreateStockComponent', () => {
  let component: CreateStockComponent;
  let fixture: ComponentFixture<CreateStockComponent>;

  beforeEach(async(() => {
    console.log('create-stock.component.spec@beforeEach(async):', this);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ CreateStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    console.log('create-stock.component.spec@beforeEach():', this);
    fixture = TestBed.createComponent(CreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('create-stock.component.spec@it::should be truthy...', component);
    expect(component).toBeTruthy();
  });
});

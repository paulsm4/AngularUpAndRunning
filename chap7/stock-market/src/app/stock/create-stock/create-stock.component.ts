import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Stock } from 'src/app/model/stock';

/* Note:
   "counter" is external to "@Component" decorator and "CreateStockComponent" export */
let counter = 1;

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  /*  Manually creating FormGroup:
  public stockForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    code: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)])
  });
   */

  /*  Substitute FormBuilder for FormControl */
  private stock;
  public stockForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
    this.stock = new Stock('Test ' + counter++, 'TST', 20, 10);
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get name() { return this.stockForm.get('name'); }
  get price() { return this.stockForm.get('price'); }
  get code() { return this.stockForm.get('code'); }

  loadStockFromServer() {
    console.log('CreateStockComponent.loadStockFromServer', this.stock);
    this.stock = new Stock('Test2 ' + counter++, 'TST2', 20, 10);
    const stockFormModel = Object.assign({}, this.stock);
    delete stockFormModel.previousPrice;
    delete stockFormModel.favorite;
    this.stockForm.setValue(stockFormModel);
  }
  patchStockForm() {
    console.log('CreateStockComponent.patchStockForm', this.stock);
    this.stock = new Stock('Test3 ' + counter++, 'TST3', 20, 10);
    this.stockForm.patchValue(this.stock);
  }
  resetForm() {
    console.log('CreateStockComponent.resetForm', this.stock);
    this.stockForm.reset();
  }

  onSubmit() {
    console.log('CreateStockComponent.onSubmit(): Saving stock', this.stockForm.value);
    this.stock = Object.assign({}, this.stockForm.value);
  }
}

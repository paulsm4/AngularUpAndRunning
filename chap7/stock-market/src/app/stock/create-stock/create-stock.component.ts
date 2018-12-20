import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, FormBuilder} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Stock } from '../../model/stock';

let counter = 1;

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  private stock: Stock;
  public stockForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      notablePeople: this.fb.array([])
    });
  }

  get code() { return this.stockForm.get('code'); }
  get name() { return this.stockForm.get('name'); }
  /* Note:
     Need to explictly declare/cast as "FormArray", else other methods
     using array methods .push() or .removeAt(), etc. won't compile */
  get notablePeople(): FormArray {
     return this.stockForm.get('notablePeople') as FormArray;
  }
  get price() { return this.stockForm.get('price'); }

  addNotablePerson() {
    this.notablePeople.push(this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required]
    }));
  }

  removeNotablePerson(index: number) {
    this.notablePeople.removeAt(index);
  }

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

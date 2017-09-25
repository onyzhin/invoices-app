import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../product.interface';

@Component({
  selector: 'app-products-select',
  templateUrl: './products-select.component.html',
  styleUrls: ['./products-select.component.css']
})
export class ProductsAddComponent implements OnInit {
  @Input() products;
  @Input() items;
  @Output() change = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  selectProducts(product) {
    product.selected = !product.selected;
    product.quantity = 1;
    if (!product.selected) {
      this.items = this.items.filter(item => item !== product);
    }
    else {
      this.items.push(product);
    }
    this.change.emit(this.items);
  }

  addProduct() {

  }

}

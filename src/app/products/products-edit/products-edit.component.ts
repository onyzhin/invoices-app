import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from '../product.interface';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  @Input() product;
  @Output() change = new EventEmitter();
  editableProduct: IProduct;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.editableProduct = {...this.product};
  }

  saveProduct() {
    this.productsService.updateProduct(this.editableProduct, this.editableProduct.id).subscribe(
      (product) => {
        this.change.emit(product);
      });
  }

}

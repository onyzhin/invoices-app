import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service';
import { IProduct } from './product.interface';
import { ModalService } from '../shared/modal/modal.service';
import { ProductsEditComponent } from './products-edit/products-edit.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];

  constructor(private productsService: ProductsService,
              private modalService: ModalService) {
    this.products = [];
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }

  editProduct(product, id) {
    const modalRef = this.modalService.open(ProductsEditComponent);
    modalRef.componentInstance.product = product;

    modalRef.componentInstance.change.subscribe(
      (editedProduct) => {
        this.products[id] = editedProduct;
        modalRef.close();
      });
  }

  removeProduct(id) {
    this.productsService.deleteProduct(id).subscribe(
      (invoice) => {
        this.products = this.products.filter(({id}) => id !== invoice.id);
      },
      error => console.error(error)
    );
  }
}

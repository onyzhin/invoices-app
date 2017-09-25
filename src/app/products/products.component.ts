import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service';
import { IProduct } from './product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];

  constructor(private productsService: ProductsService) {
    this.products = [];
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
    })
  }

  editProduct(id) {

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

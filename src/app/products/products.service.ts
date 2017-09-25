import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  getProducts(): Observable<any> {
    let url = 'api/products';
    return this.http
      .get(url)
      .map((res: Response) => res.json())
  }

  deleteProduct(id): Observable<any> {
    const url = `api/products/${id}`;
    return this.http
      .delete(url)
      .map((res: Response) => res.json());
  }

  updateProduct(product, id): Observable<any> {
    const url = `api/products/${id}`;
    const body = JSON.stringify(product);
    return this.http
      .put(url, body, this.options)
      .map((res: Response) => res.json());
  }

}

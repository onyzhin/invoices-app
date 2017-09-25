import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomersService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  getCustomers(): Observable<any> {
    let url = 'api/customers';
    return this.http
      .get(url)
      .map((res: Response) => res.json())
  }

  getCustomer(id): Observable<any> {
    const url = `api/customers/${id}`;
    return this.http
      .get(url)
      .map((res: Response) => res.json())
  }
}

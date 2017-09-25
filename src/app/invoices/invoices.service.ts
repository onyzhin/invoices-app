import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class InvoicesService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  getInvoices(): Observable<any> {
    const url = 'api/invoices';
    return this.http
      .get(url)
      .map((res: Response) => res.json());
  }

  getInvoice(id): Observable<any> {
    const url = `api/invoices/${id}`;
    return this.http
      .get(url)
      .map((res: Response) => res.json());
  }

  addInvoice(invoice): Observable<any> {
    const url = 'api/invoices';
    const body = JSON.stringify(invoice);
    return this.http
      .post(url, body, this.options)
      .map((res: Response) => res.json());
  }

  updateInvoice(invoice, id): Observable<any> {
    const url = `api/invoices/${id}`;
    const body = JSON.stringify(invoice);
    return this.http
      .put(url, body, this.options)
      .map((res: Response) => res.json());
  }

  deleteInvoice(id): Observable<any> {
    const url = `api/invoices/${id}`;
    return this.http
      .delete(url)
      .map((res: Response) => res.json());
  }

  getInvoiceItems(id): Observable<any> {
    const url = `api/invoices/${id}/items`;
    return this.http
      .get(url)
      .map((res: Response) => res.json());
  }

  addInvoiceItems(invoices,id): Observable<any> {
    const url = `api/invoices/${id}/items`;
    const body = JSON.stringify(invoices);
    return this.http
      .post(url, body, this.options)
      .map((res: Response) => res.json());
  }

  deleteInvoiceItem(invoice_id, id): Observable<any> {
    const url = `api/invoices/${invoice_id}/items/${id}`;
    return this.http
      .delete(url)
      .map((res: Response) => res.json());
  }

}

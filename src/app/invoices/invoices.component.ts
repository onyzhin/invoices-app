import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from './invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoices: any;

  constructor(public router: Router,
              private invoicesService: InvoicesService) {
    this.invoices = [];
  }

  ngOnInit() {
    this.invoicesService.getInvoices().subscribe(
      (invoices) => {
        this.invoices = invoices;
      });
  }

  removeInvoice(id) {
    this.invoicesService.deleteInvoice(id).subscribe(
      (invoice) => {
        this.invoices = this.invoices.filter(({id}) => id !== invoice.id);
      },
      error => console.error(error)
    );
  }

  createInvoice() {
    this.router.navigate(['invoices/create'])
  }

  editInvoice(id) {
    this.router.navigate(['invoices/', id])
  }

}


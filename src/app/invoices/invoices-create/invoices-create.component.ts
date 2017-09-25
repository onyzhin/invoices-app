import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import "rxjs/add/operator/debounceTime";

import { CustomersService } from '../../customers/customers.service';
import { ProductsService } from '../../products/products.service';
import { ICustomer } from '../../customers/customer.interface';
import { IProduct } from '../../products/product.interface';
import { ProductsAddComponent } from '../../products/products-select/products-select.component';
import { ModalService } from '../../shared/modal/modal.service';
import { InvoicesService } from '../invoices.service';

export interface IInvoice {
  id?: number | string;
  customer_id: number,
  discount: number,
  total: number,
  items: Array<any>
}

@Component({
  selector: 'app-invoices-create',
  templateUrl: './invoices-create.component.html',
  styleUrls: ['./invoices-create.component.css']
})
export class InvoicesCreateComponent implements OnInit {
  customers: ICustomer[];
  products: IProduct[];
  invoice: IInvoice;
  invoiceForm: FormGroup;
  isUpdating: boolean;
  isEditable: boolean;

  constructor(private customersService: CustomersService,
              private productsService: ProductsService,
              private invoiceService: InvoicesService,
              private modalService: ModalService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
    this.customers = [];
    this.isUpdating = false;

    this.invoice = {
      id: null,
      discount: 0,
      customer_id: null,
      total: 0,
      items: []
    }
  }

  ngOnInit() {
    this.getCustomers();
    this.getProducts();
    this.fetchInvoice();
    this.initForm();
  }

  fetchInvoice() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditable = true;
        this.invoiceService.getInvoice(id)
          .subscribe((invoice) => {
            this.invoice = {...invoice, items: []};
            this.invoiceService.getInvoiceItems(invoice.id)
              .subscribe((items) => {
                items.forEach((item) => {
                  let product = this.products.find((product) => product.id == item.id);
                  this.invoice.items.push({...product, quantity: item.quantity})
                });
                this.formAddControls();
              });
          });
      }
    });
  }

  initForm() {
    this.invoiceForm = this.formBuilder.group({
      customer: ['', <any>Validators.required],
    });
    this.invoiceForm.valueChanges
      .debounceTime(1000)
      .subscribe(
        () => this.saveInvoice()
      );
  }

  getCustomers() {
    this.customersService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      })
  }

  getProducts() {
    this.productsService.getProducts().subscribe(
      (products) => {
        this.products = products;
      })
  }

  showProducts() {
    const modalRef = this.modalService.open(ProductsAddComponent).componentInstance;
    modalRef.products = this.products;
    modalRef.items = this.invoice.items;

    modalRef.change.subscribe(
      (products) => {
        this.invoice.items = products;
        this.formAddControls();
      });
  }

  formAddControls() {
    this.invoice.items.forEach(
      (item) => {
        const ctrlName = 'quantity' + item.id;
        this.invoiceForm.addControl(ctrlName, new FormControl({
          validator: Validators.compose([<any>Validators.required])
        }));
      }
    )
  }

  removeItem(product, index) {
    product.selected = !product.selected;
    this.invoice.items = this.invoice.items.filter(item => item !== product);
    this.saveInvoice();
  }

  slideOnFinish(data) {
    this.invoice.discount = data.from;
    this.saveInvoice();
  }

  get totalInvoice() {
    let total = this.invoice.items.reduce(
      (total, item) => {
        let quantity = Number(item.quantity) || 1;
        return total + quantity * item.price
      }, 0);
    return total * (100 - this.invoice.discount ) / 100;
  }

  saveInvoice() {
    if (this.invoiceForm.valid && this.invoice.items.length) {
      let invoice = {
        customer_id: this.invoice.customer_id,
        discount: this.invoice.discount,
        total: this.totalInvoice,
        items: this.invoice.items.map(
          (product: IProduct) => {
            return {
              product_id: product.id,
              quantity: product.quantity,
            };
          }),
      };

      if (this.invoice.id) {
        this.invoiceService.updateInvoice(invoice, this.invoice.id).subscribe(
          (res) => {
            this.successInvoiceAdd(res.id);
          },
          error => console.error(error)
        );
      } else {
        this.invoiceService.addInvoice(invoice).subscribe(
          (res) => {
            this.successInvoiceAdd(res.id);
            invoice.items.forEach((item) => {
              this.invoiceService.addInvoiceItems(item, res.id).subscribe((res) => {
                console.log(res);
              })
            })
          },
          error => console.error(error)
        );
      }
    }
  }

  successInvoiceAdd(id) {
    this.invoice.id = id;
    this.isUpdating = true;
    setTimeout(() => this.isUpdating = false, 1000);
  }

}


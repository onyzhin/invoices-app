import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { ICustomer } from './customer.interface';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: ICustomer[];

  constructor(private customersService: CustomersService) {
    this.customers = [];
  }

  ngOnInit() {
    this.customersService.getCustomers().subscribe((customers)=> {
      this.customers = customers;
      console.log(customers);
    })
  }

}

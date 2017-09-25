import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicesCreateComponent } from './invoices/invoices-create/invoices-create.component';

export const routes: Routes = [
  {path: '', redirectTo: '/invoices', pathMatch: 'full'},
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'invoices',
    component: InvoicesComponent
  },
  {
    path: 'invoices/create',
    component: InvoicesCreateComponent
  },
  {
    path: 'invoices/:id',
    component: InvoicesCreateComponent
  },
];

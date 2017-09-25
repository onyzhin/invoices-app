import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { routes } from './routes';
import { ProductsService } from './products/products.service';
import { CustomersComponent } from './customers/customers.component';
import { CustomersService } from './customers/customers.service';
import { InvoicesComponent } from './invoices/invoices.component';
import { ModalService } from './shared/modal/modal.service';
import { ProductsAddComponent } from './products/products-select/products-select.component';
import { InvoicesCreateComponent } from './invoices/invoices-create/invoices-create.component';
import { InvoicesService } from './invoices/invoices.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    InvoicesComponent,
    ProductsAddComponent,
    InvoicesCreateComponent,
    NavbarComponent,
    ProductsEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    HttpModule,
    NgbModule.forRoot(),
    IonRangeSliderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductsService,
    CustomersService,
    InvoicesService,
    ModalService,
  ],
  entryComponents: [
    ProductsAddComponent,
    ProductsEditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AdditionalInfoComponent } from './customer-register/additional-info/additional-info.component';
import { BasicInfoComponent } from './customer-register/basic-info/basic-info.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerOrderComponent } from './customer-order/customer-order.component';


@NgModule({
  declarations: [
    CustomerLoginComponent,
    CustomerRegisterComponent,
    BasicInfoComponent,
    AdditionalInfoComponent,
    CustomerProfileComponent,
    CustomerEditComponent,
    CustomerOrdersComponent,
    CustomerOrderComponent
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }

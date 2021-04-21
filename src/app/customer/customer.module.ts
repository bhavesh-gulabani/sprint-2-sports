import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { AdditionalInfoComponent } from './customer-register/additional-info/additional-info.component';
import { BasicInfoComponent } from './customer-register/basic-info/basic-info.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomerRoutingModule } from './customer-routing.module';


@NgModule({
  declarations: [
    CustomerLoginComponent,
    CustomerRegisterComponent,
    BasicInfoComponent,
    AdditionalInfoComponent
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }

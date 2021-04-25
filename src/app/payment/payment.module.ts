import { NgModule } from '@angular/core';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { SharedModule } from '../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { ViewPaymentComponent } from './view-payment/view-payment.component';



@NgModule({
  declarations: [AddPaymentComponent, ViewPaymentComponent],
  imports: [
    SharedModule,
    PaymentRoutingModule
    
  ]
})
export class PaymentModule { }

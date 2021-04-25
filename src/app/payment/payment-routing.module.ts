import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../service/auth-guard';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';

const routes: Routes = [
   
    {path: 'payments/add', component: AddPaymentComponent, canActivate: [AuthGuard]},
    {path: 'payments/:id', component: ViewPaymentComponent, canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }

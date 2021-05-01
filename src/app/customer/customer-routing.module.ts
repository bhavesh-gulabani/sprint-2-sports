import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCartComponent } from '../cart/view-cart/view-cart.component';
import { AuthGuard } from '../service/auth-guard';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AdditionalInfoComponent } from './customer-register/additional-info/additional-info.component';
import { BasicInfoComponent } from './customer-register/basic-info/basic-info.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';

const routes: Routes = [
    {path: 'customers/login', component: CustomerLoginComponent},
    {
      path: 'customers/register', 
      component: CustomerRegisterComponent,
      children: [
        {path: '', redirectTo: 'basic-info', pathMatch: 'full'},
        {path: 'basic-info', component: BasicInfoComponent},
        {path: 'additional-info', component: AdditionalInfoComponent},
      ]
    },
    {path: 'customers/profile/:id', component: CustomerProfileComponent, canActivate: [AuthGuard]},
    {path: 'customers/edit/:id', component: CustomerEditComponent, canActivate: [AuthGuard]},
    {path: 'customers/:customerId/orders/:orderId', component: CustomerOrderComponent, canActivate: [AuthGuard]},
    {path: 'customers/:id/orders', component: CustomerOrdersComponent, canActivate: [AuthGuard]},
    {path: 'customers/:id/cart', component: ViewCartComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

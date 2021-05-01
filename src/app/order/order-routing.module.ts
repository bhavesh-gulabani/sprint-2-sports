import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../service/auth-guard';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
   
    {path: 'orders/:id', component: ViewOrderComponent, canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

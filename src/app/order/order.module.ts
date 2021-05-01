import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOrderComponent } from './view-order/view-order.component';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [ViewOrderComponent],
  imports: [
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }

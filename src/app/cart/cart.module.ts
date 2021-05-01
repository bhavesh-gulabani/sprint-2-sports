import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';



@NgModule({
  declarations: [ViewCartComponent],
  imports: [
    SharedModule,
    CartRoutingModule
  ]
})
export class CartModule { }

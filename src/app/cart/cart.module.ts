import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ViewCartComponent],
  imports: [
    SharedModule
  ]
})
export class CartModule { }

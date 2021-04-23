import { NgModule } from '@angular/core';


import { ProductRoutingModule } from './product-routing.module';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { ProductAddComponent } from './product-admin/product-add/product-add.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [ProductAdminComponent, ProductAddComponent],
  imports: [
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }

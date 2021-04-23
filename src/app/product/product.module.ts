import { NgModule } from '@angular/core';


import { ProductRoutingModule } from './product-routing.module';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { ProductAddComponent } from './product-admin/product-add/product-add.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDeleteComponent } from './product-admin/product-delete/product-delete.component';
import { ProductUpdateComponent } from './product-admin/product-update/product-update.component';
import { ProductViewComponent } from './product-admin/product-view/product-view.component';




@NgModule({
  declarations: [ProductAdminComponent, ProductAddComponent, ProductDeleteComponent, ProductUpdateComponent, ProductViewComponent],
  imports: [
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }

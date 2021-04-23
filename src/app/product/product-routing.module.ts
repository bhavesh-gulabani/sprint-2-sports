import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-admin/product-add/product-add.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { ProductDeleteComponent } from './product-admin/product-delete/product-delete.component';
import { ProductUpdateComponent } from './product-admin/product-update/product-update.component';
import { ProductViewComponent } from './product-admin/product-view/product-view.component';


const routes: Routes = [
{path: 'product-admin', component : ProductAdminComponent,
  children:[
  {path: 'product-add', component : ProductAddComponent},
  {path : 'product-delete', component: ProductDeleteComponent},
  {path : 'product-update', component : ProductUpdateComponent},
  {path : 'product-view', component : ProductViewComponent}]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}

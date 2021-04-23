import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-admin/product-add/product-add.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';


const routes: Routes = [
{path: 'product-admin', component : ProductAdminComponent},

{ path: 'product-add', component : ProductAddComponent}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}

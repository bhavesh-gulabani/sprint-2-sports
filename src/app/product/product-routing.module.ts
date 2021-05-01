import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCartComponent } from '../cart/view-cart/view-cart.component';
import { AuthGuard } from '../service/auth-guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListCategoryComponent } from './product-list-category/product-list-category.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
    {path: 'products', component: ProductListComponent},
    {path: 'products/categories/:category', component: ProductListCategoryComponent},
    {path: 'products/:id', component: ProductDetailComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

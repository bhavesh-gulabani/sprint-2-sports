import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomerDetailComponent } from './customer-management/customer-detail/customer-detail.component';
import { CustomerListComponent } from './customer-management/customer-list/customer-list.component';
import { ProductAddComponent } from './product-management/product-add/product-add.component';
import { ProductDeleteComponent } from './product-management/product-delete/product-delete.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductUpdateComponent } from './product-management/product-update/product-update.component';
import { ProductViewComponent } from './product-management/product-view/product-view.component';


const routes: Routes = [
  {
    path: 'admin/login', component: AdminLoginComponent
  },
  {
    path: 'admin/dashboard', component: AdminDashboardComponent
  },
  {
    path: 'admin/customers', component: CustomerListComponent
  },
  {
    path: 'admin/customers/:id', component: CustomerDetailComponent
  },
  {path: 'admin/products', component : ProductManagementComponent,
    children:[
    {path: 'product-add', component : ProductAddComponent},
    {path : 'product-delete', component: ProductDeleteComponent},
    {path : 'update/:id', component : ProductUpdateComponent},
    {path : 'product-view', component : ProductViewComponent},
]}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

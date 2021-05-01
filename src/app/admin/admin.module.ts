import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerListComponent } from './customer-management/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-management/customer-detail/customer-detail.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductAddComponent } from './product-management/product-add/product-add.component';
import { ProductDeleteComponent } from './product-management/product-delete/product-delete.component';
import { ProductUpdateComponent } from './product-management/product-update/product-update.component';
import { ProductViewComponent } from './product-management/product-view/product-view.component';



@NgModule({
  declarations: [
    AdminLoginComponent, 
    AdminDashboardComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    ProductManagementComponent,
    ProductAddComponent,
    ProductDeleteComponent,
    ProductUpdateComponent,
    ProductViewComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    
  ]
})
export class AdminModule { }

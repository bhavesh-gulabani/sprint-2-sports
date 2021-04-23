import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerListComponent } from './customer-management/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-management/customer-detail/customer-detail.component';



@NgModule({
  declarations: [
    AdminLoginComponent, 
    AdminDashboardComponent,
    CustomerListComponent,
    CustomerDetailComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    
  ]
})
export class AdminModule { }

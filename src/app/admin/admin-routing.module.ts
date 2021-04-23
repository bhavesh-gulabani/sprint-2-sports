import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomerDetailComponent } from './customer-management/customer-detail/customer-detail.component';
import { CustomerListComponent } from './customer-management/customer-list/customer-list.component';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

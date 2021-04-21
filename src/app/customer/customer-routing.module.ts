import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { AdditionalInfoComponent } from './customer-register/additional-info/additional-info.component';
import { BasicInfoComponent } from './customer-register/basic-info/basic-info.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';

const routes: Routes = [
    {
      path: 'login', 
      component: CustomerLoginComponent, 
    },
    {
      path: 'register', 
      component: CustomerRegisterComponent,
      children: [
        {
          path: '',
          redirectTo: 'basic-info',
          pathMatch: 'full'
        },
        {
          path: 'basic-info',
          component: BasicInfoComponent
        },
        {
          path: 'additional-info',
          component: AdditionalInfoComponent
        },
      ]
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

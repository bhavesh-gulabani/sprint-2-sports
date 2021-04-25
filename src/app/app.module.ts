import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { AuthInterceptor } from './service/auth-interceptor.service';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent    
  ],
  imports: [
    BrowserModule,
    CustomerModule,
    AdminModule,
    CartModule,
    ProductModule,
    OrderModule,
    PaymentModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

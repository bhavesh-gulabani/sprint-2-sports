import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order-service';
import { Order } from '../Order';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  order: Order;
  customer: Customer;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit() {
    this.initializeOrder(); 
    
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getOrder(id);
    }

    this.getCustomer();
  }
  
  getCustomer(): void {
    // Get user email
    let email = sessionStorage.getItem('email');

    // Get user details from email
      this.customerService.getCustomerByEmail(email).subscribe({
      next: customer => this.customer = customer,
      error: err => this.errorMessage = err
    });
  }

  getOrder(id: number): void {
    this.orderService.getOrder(id).subscribe({
      next: order => {this.order = order; console.log(this.order)},
      error: err => this.errorMessage = err
    });
  }

  confirmOrder() {
    this.orderService.confirmOrder(this.order.id).subscribe({
      next: order => {this.order = order; console.log(this.order); this.router.navigate(['/payments', 'add'], {state: {data: this.order}})},
      error: err => this.errorMessage = err
    });
  }

  initializeOrder() {
    this.order = {
      id: 0,
      amount: 0,
      billingDate: null,
      customer: null,
      payment: null,
      cart: null
    }
  }

}

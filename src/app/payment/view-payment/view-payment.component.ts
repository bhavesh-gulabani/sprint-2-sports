import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { PaymentService } from 'src/app/service/payment-service';
import { Payment } from '../payment';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {
  payment: Payment;
  customer: Customer
  errorMessage: string;

  constructor(private paymentService: PaymentService, private customerService: CustomerService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializePayment();

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getPayment(id);
    }

    this.getCustomer();
  }

  getPayment(id: number) {
    this.paymentService.getPayment(id).subscribe({
      next: payment => {this.payment = payment;},
      error: err => this.errorMessage = err
    });
  }

  getCustomer(): void {
    let email = sessionStorage.getItem('email');

    this.customerService.getCustomerByEmail(email).subscribe({
      next: customer => {this.customer = customer;},
      error: err => this.errorMessage = err
    });
  }

  continue() {
    // As payment is done, clear the customer's cart
    this.customer.cart = null;
    
    // Set orders to null to avoid cyclic reference
    this.customer.orders = null;

    // Update the customer in the backend
    this.customerService.updateCustomer(this.customer).subscribe({
      next: customer => {this.router.navigate(['/welcome']);},
      error: err => this.errorMessage = err
    });  
  }

  initializePayment() {
    this.payment = {
      id: null,
      status: null,
      type: null,
      order: null,
      card: {
        id: null,
        name: null,
        cvv: null,
        expiry: null,
        number: null
      }
    }
  }

}

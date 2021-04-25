import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order-service';
import { PaymentService } from 'src/app/service/payment-service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import Swal from 'sweetalert2';
import { Card, Payment } from '../payment';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  errorMessage: string;
  customer: Customer;

  paymentForm: FormGroup;
  payment: Payment;
  card: Card;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private router: Router, private paymentService: PaymentService, private orderService: OrderService, private customerService: CustomerService) { }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      type: ['', Validators.required],
      status: ['Not paid'],
      name: ['', Validators.required],
      number: ['', Validators.required],
      expiry: [''],
      cvv: ['', Validators.required]
      
    });

    this.initializePayment();

    this.getCustomer();

  }

  getCustomer(): void {

      // Get user email
      let email = sessionStorage.getItem('email');

      // Get user details from email
       this.customerService.getCustomerByEmail(email).subscribe({
        next: customer => {this.customer = customer;},
        error: err => this.errorMessage = err
      });
    
  }

  getPaymentType() {
    return this.paymentForm.get('type').value;
  }

  populatePayment(): void {

    this.payment = {...this.payment, ...this.paymentForm.value};
    this.payment.card = {...this.paymentForm.value}

    if (this.getPaymentType() === 'Cash')
      this.payment.card = null;

    console.log(this.payment)
  }

  save() {
    this.populatePayment();

    this.paymentService.addPayment(this.payment).subscribe({
      next: payment => {
        console.log(payment);
        this.payment = payment;
        alert('Payment added!');
        this.completePayment();
        alert('Payment completed!');
      },
      error: err => this.errorMessage = err
    });
  }

  // This method completes the transaction and upon its completion 
  // the stock of products is adjusted in the system and 
  // customer --> order --> payment linking is done
  completePayment() {
    const orderId = history.state.data.id;
    const customerId = this.customer.id;
    const paymentId = this.payment.id;

    this.orderService.completeOrder(orderId, customerId, paymentId).subscribe({
      next: data => {console.log(data); this.customer.cart = null; this.router.navigate(['/payments', this.payment.id])},
      error: err => this.errorMessage = err
    });






  }

  initializePayment() {
    this.card = {
      id: null,
      name: null,
      cvv: null,
      expiry: null,
      number: null
    }

    this.payment = {
      id: null,
      status: null,
      type: null,
      order: null,
      card: this.card
    }
  }

}

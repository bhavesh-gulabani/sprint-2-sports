import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order-service';
import { PaymentService } from 'src/app/service/payment-service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { NumberValidators } from 'src/app/shared/number.validator';
import { Card, Payment } from '../payment';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;
  customer: Customer;

  paymentForm: FormGroup;
  payment: Payment;
  card: Card;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private router: Router, private paymentService: PaymentService, private orderService: OrderService, private customerService: CustomerService) { 
    // Defines all of the validation messages for the form.
    this.validationMessages = {
      name: {
        required: `Please enter card name.`
      },
      number: {
        required: `Please enter card number.`,
        correctNumber: `Please enter a valid number.`,
        cardNumber: `Please enter a 16 digit number.`
      },
      expiry: {
        required: `Please enter card expiry date.`
      },
      cvv: {
        required: `Please enter card cvv.`,
        correctNumber: `Please enter a valid number.`,
        cvv: `Please enter a 3 digit cvv.`
      }
    }

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

   }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      type: ['Cash'],
      status: ['Not paid'],
      name: ['', [Validators.required]],
      number: ['', [Validators.required, NumberValidators.correctNumber(), NumberValidators.cardNumber()]],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', [Validators.required, NumberValidators.correctNumber(), NumberValidators.cvv()]]
      
    });

    this.initializePayment();

    this.getCustomer();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.paymentForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(200)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.paymentForm);
    });
  }

  getCustomer(): void {
    let email = sessionStorage.getItem('email');
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

    // Handling expiry date
    const year = 2000 + this.paymentForm.value.year;
    const month = this.paymentForm.value.month < 10 ? '0' + this.paymentForm.value.month : this.paymentForm.value.month;
    const day = 31;

    let expiry: string = year + '-' + month + '-' + day;
    this.payment.card.expiry = expiry;

    // console.log(expiry)

    if (this.getPaymentType() === 'Cash')
      this.payment.card = null;
  }

  save() {
    this.populatePayment();

    this.paymentService.addPayment(this.payment).subscribe({
      next: payment => {
        this.payment = payment;
        this.completePayment();
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
      next: data => {this.customer.cart = null; this.router.navigate(['/payments', this.payment.id])},
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

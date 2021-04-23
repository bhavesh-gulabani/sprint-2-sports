import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerEditForm: FormGroup;
  errorMessage: string;
  customer: Customer;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeCustomer();

    this.customerEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contactNo: [''],
      dateOfBirth: [''],
      street: [''],
      doorNo: [''],
      area: [''],
      city: [''],
      state: [''],
      pincode: ['']
    });

    // Read the customer id from the route parameter
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCustomer(id);
    }
  }

  getCustomer(id: number): void {
    this.customerService.getCustomer(id).subscribe({
      next: customer => this.displayCustomer(customer),
      error: err => this.errorMessage = err
    });
  }

  displayCustomer(customer: Customer): void {
    if (this.customerEditForm) {
      this.customerEditForm.reset();
    }

    this.customer = customer

    // Update the data on the form
    this.customerEditForm.patchValue({
      name: this.customer.name,
      email: this.customer.email,
      password: this.customer.password,
      contactNo: this.customer.contactNo,
      dateOfBirth: this.customer.dateOfBirth,
      street: this.customer.address.street,
      doorNo: this.customer.address.doorNo,
      area: this.customer.address.area,
      city: this.customer.address.city,
      state: this.customer.address.state,
      pincode: this.customer.address.pincode
    });
  }


  save() {

    const customer: Customer = { ...this.customer, ...this.customerEditForm.value };
    customer.address = { ...this.customerEditForm.value }
    
    console.log('Before subscibing: ', customer);

    // Set email in session storage in case email has been edited
    sessionStorage.setItem('email', customer.email);

    this.customerService.updateCustomer(customer)
      .subscribe({
        next: (customer) => {this.customer = customer; this.onSaveComplete();},
        error: err => this.errorMessage = err
      });

  }

  onSaveComplete() {
    // Reset the form to clear the flags
    this.customerEditForm.reset();
    // alert('Successfully updated!')
    Swal.fire({
      title: 'Success', 
      text: 'Account successfully updated', 
      icon: 'success',
      width: '25rem'
      });
    // console.log('Before navigating...', this.customer);

    this.router.navigate(['/customers', 'profile', this.customer.id]);
    // this.router.navigate(['/welcome']);
  }

  
  initializeCustomer(): void {
    this.customer = {
      id: 0,
      email: null,
      password: null,
      role: null,
      name: null,
      contactNo: null,
      dateOfBirth: null,
      imageUrl: null,
      address: {
        street: null,
        doorNo: null,
        area: null,
        city: null,
        state: null,
        pincode: null
      },
      orders: null,
      status: null,
      cart: null
    } 
  }

}

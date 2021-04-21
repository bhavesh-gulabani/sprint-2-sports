import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/order/Order';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from '../../customer';


@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {

  errorMessage: string;

  additionalInfoForm: FormGroup;
  customer: Customer;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.additionalInfoForm = this.fb.group({
      dateOfBirth: [''],
      street: [''],
      doorNo: [''],
      area: [''],
      city: [''],
      state: [''],
      pincode: [''],
      imageUrl: ['']
    });

    this.initializeCustomer();

  }

  populateCustomer(): void {

    this.customer = {...history.state.data};
    this.customer = {...this.customer, ...this.additionalInfoForm.value};
    this.customer.address = {...this.additionalInfoForm.value}

    this.customer.status = 'Valid';
    
    // Hardcoding the default image url for now
    this.customer.imageUrl = '../../../../assets/images/person-placeholder.png';

    console.log(this.customer)
  }

  save() {
    this.populateCustomer();
    this.customerService.addCustomer(this.customer).subscribe({
      next: customer => {
        console.log(customer);
        alert('Account successfully created');
      },
      error: err => this.errorMessage = err
    });

    this.router.navigate(['/login']);
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
      status: null
    } 
  }
}

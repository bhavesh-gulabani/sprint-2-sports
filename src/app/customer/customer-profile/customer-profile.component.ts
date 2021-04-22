import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customer: Customer;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit() {
    this.initializeCustomer();
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      // console.log('In profile... Before getting');
      this.getCustomer(id);
    }
  }

  getCustomer(id: number): void {
    this.customerService.getCustomer(id).subscribe({
      next: customer => this.customer = customer,
      error: err => this.errorMessage = err
    })
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

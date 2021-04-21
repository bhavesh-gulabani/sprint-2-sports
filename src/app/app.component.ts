import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from './customer/customer';
import { AuthService } from './service/auth.service';
import { CustomerService } from './service/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'online-sports-shoppe';
  isLoggedIn: boolean = false;
  errorMessage: string;
  imageUrl: string;
  customerLoggedIn: Customer;

  constructor(private authService: AuthService, private customerService: CustomerService, private router: Router) { }

  ngOnInit() {

    this.initializeCustomer();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getLoggedInCustomer();
  }

  getLoggedInCustomer(): void {

    if (this.isLoggedIn) {
      // Get user email
      let email = sessionStorage.getItem('email');

      // Get user details from email
       this.customerService.getCustomerByEmail(email).subscribe({
        next: customer => {this.customerLoggedIn = customer; this.imageUrl = this.customerLoggedIn.imageUrl},
        error: err => this.errorMessage = err
      });
    }
    
  }

  toggleOptions() {
    let hoverDiv = document.getElementsByClassName('hover-container');
    hoverDiv[0].classList.toggle('hide')
  }

  logout() {
    console.log('In logout...')
    this.authService.logout();
    this.isLoggedIn = false;
    this.toggleOptions();
    
    // Display alert message
    alert('Successfully logged out');

    this.router.navigate(['/welcome']);
  }

  initializeCustomer(): void {
    this.customerLoggedIn = {
      id: 0,
      email: null,
      password: null,
      role: null,
      name: null,
      contactNo: null,
      dateOfBirth: null,
      imageUrl: null,
      address: null,
      orders: null,
      status: null

    } 
  }

}

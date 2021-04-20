import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from './customer/customer';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'online-sports-shoppe';
  isLoggedIn: boolean = false;
  customerLoggedIn: Customer;

  constructor() {  }

  ngOnInit() {
    this.initializeCustomer();
    
  }
  
  logout() {
    this.isLoggedIn = false;
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
      orders: null
    } 
  }
}

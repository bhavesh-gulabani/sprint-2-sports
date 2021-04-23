import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/cart/cart';
import { CartModule } from 'src/app/cart/cart.module';
import { Customer } from 'src/app/customer/customer';
import { CustomerProfileComponent } from 'src/app/customer/customer-profile/customer-profile.component';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product-service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Product[];
  errorMessage: string;

  customerLoggedIn: Customer;
  cart: Cart;

  constructor(private productService: ProductService, private customerService: CustomerService) { 

  }

  ngOnInit() {
    const currentUrl: string = window.location.href;
    if (currentUrl.split('/')[-1])


    this.productService.getProducts().subscribe({
      next: products => {this.products = products; console.log(this.products)},
      error: err => this.errorMessage = err
    });

    // Get logged in customer 
    this.getCustomer();
  }

  addToCart(product: Product) {

    // Update the cart of this customer
    this.cart = this.customerLoggedIn.cart;
    if (this.cart === null) {
      this.initializeCart();
    }

    this.cart.items.set(product, 1);

    this.customerLoggedIn.cart = this.cart;

    // Update the customer details in database
    this.customerService.updateCustomer(this.customerLoggedIn).subscribe({
      next: customer => {this.customerLoggedIn = customer; console.log(customer);},
      error: err => console.log(err)
    })
  }

  getCustomer(): Customer {
    // Get user email
    let email = sessionStorage.getItem('email');

    // Get user details from email
     this.customerService.getCustomerByEmail(email).subscribe({
      next: customer => {this.customerLoggedIn = customer; return this.customerLoggedIn;},
      error: err => this.errorMessage = err
    });

    // return this.customerLoggedIn;
    return null;
    
  }


  initializeCart() {
    this.cart = {
      id: 0,
      items: new Map<Product, number>(),
      totalAmount: 0
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Cart } from 'src/app/cart/cart';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product-service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list-category',
  templateUrl: './product-list-category.component.html',
  styleUrls: ['./product-list-category.component.css']
})
export class ProductListCategoryComponent implements OnInit {
  
  products: Product[];
  allProducts: Product[];
  errorMessage: string;

  customerLoggedIn: Customer;
  cart: Cart;
  cartItems: Map<Product, number> = new Map();

  constructor(private productService: ProductService, private customerService: CustomerService, private router: Router) { }  

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl: string = window.location.href;
        // Browse by category
        if (currentUrl.includes('Badminton') || currentUrl.includes('Cricket') || currentUrl.includes('Football') || currentUrl.includes('Tennis')) {
          const category = currentUrl.split('/')[5];
          console.log('Category', category);
          this.productService.getProductsByCategory(category).subscribe({
            next: products => {this.products = products; console.log(this.products)},
            error: err => this.errorMessage = err
          });
        }  
      }
    });

    // Get all products for populating cart
    this.productService.getProducts().subscribe({
      next: products => {this.allProducts = products; console.log(this.products)},
      error: err => this.errorMessage = err
    });

    // Get logged in customer 
    this.getCustomer();
  }

  findProductById(id: number): Product {
    let product = null;
    this.allProducts.forEach(prod => {
      if (prod.id === id) {
        product = prod;
      }
    });
    return product;
  }

  // Method to add items to the customer cart
  addToCart(product: Product) {

    // Get the currrent cart of the customer
    this.cart = this.customerLoggedIn.cart;

    // Initialize cart if it does not exist
    if (this.cart === null) {
      this.initializeCart();
    }
    
    // If items already exist in the cart, update the same cart
    if (Object.keys(this.cart.items).length !== 0) {

      // Populate the Map<Product, Integer> with items already in the customer's cart
      Object.keys(this.cart.items).forEach(key => {
        let productId = Number(key.substring(12, 15));
        if (isNaN(productId)) {
          productId = Number(key.substring(19, 22));
        }

        let productFound: Product = this.findProductById(productId);
        this.cartItems.set(productFound, this.cart.items[key]);
     
      });
    } 
    
    // Add the selected product to the cart
    this.cartItems.set(product, 1);

    // Convert the Map<Product, number> to object{string: number} to match the data format for server
    const convertedCartItems = {};
    this.cartItems.forEach((val: number, key: Product) => {
      let stringifiedKey = `product: {'id' : '${key.id}'}`
      convertedCartItems[stringifiedKey] = val;
    });

    // Set the items attribute of the cart
    this.cart.items = convertedCartItems;

    // Set the customer cart 
    this.customerLoggedIn.cart = this.cart;

    // Send PUT request to update customer details in the database
    this.updateCustomer();
  }

  getCustomer(): Customer {
    // Get user email
    let email = sessionStorage.getItem('email');

    // Get user details from email
     this.customerService.getCustomerByEmail(email).subscribe({
      next: customer => {this.customerLoggedIn = customer; return this.customerLoggedIn;},
      error: err => this.errorMessage = err
    });
    return null;
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.customerLoggedIn).subscribe({
      next: customer => {this.customerLoggedIn = customer},
      error: err => console.log(err)
    });
  }


  initializeCart() {
    this.cart = {
      id: 0,
      items: {},
      totalAmount: 0
    }
  }
}
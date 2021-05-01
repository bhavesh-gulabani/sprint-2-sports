import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Cart } from 'src/app/cart/cart';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Product[];
  errorMessage: string;
  searchText: string;

  customerLoggedIn: Customer;
  cart: Cart;
  cartItems: Map<Product, number> = new Map();

  constructor(private productService: ProductService, private customerService: CustomerService, private router: Router) { }

  ngOnInit() { 
    this.searchText = history.state.data

    // Get all products
    this.getProducts()

    // Get logged in customer 
    this.getCustomer();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        // If search text provided, filter the products
        if (this.searchText) {
          this.products = this.products.filter(product => product.name.includes(this.searchText) || product.description.includes(this.searchText) || product.category.includes(this.searchText));
        }
      },
      error: err => this.errorMessage = err
    });
  }


  findProductById(id: number): Product {
    let product = null;
    this.products.forEach(prod => {
      if (prod.id === id) {
        product = prod;
      }
    });
    return product;
  }

  // Method to add items to the customer cart
  addToCart(product: Product) {

    // If customer is not logged in, navigate to login page
    if (!this.customerLoggedIn) {
      this.router.navigate(['/customers', 'login']);
    }

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
        // let productId = isNaN(Number(key.substring(12, 15))) ? Number(key.substring(19, 22)) : Number(key.substring(12, 15));
        let productId = Number(key.substring(19, 22));
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

    // Set orders to null to avoid cyclic reference
    if (this.customerLoggedIn.orders)
      this.customerLoggedIn.orders = null;

    // Send PUT request to update customer details in the database
    this.updateCustomer();
  }

  addConfirmation(){
    Swal.fire({
      title: 'Success', 
      text: 'Product successfully added', 
      icon: 'success',
      showConfirmButton:false,
      width: '25rem'
    });
    setTimeout(() => window.location.reload(), 1000);
  }    
  

  getCustomer(): Customer {
    let email = sessionStorage.getItem('email');
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/cart/cart';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product-service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: Product;
  products: Product[];

  quantity: number;

  customerLoggedIn: Customer;
  cart: Cart;
  cartItems: Map<Product, number> = new Map();

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private customerService: CustomerService) {
      this.quantity = 1;
  }

  ngOnInit(): void {
    this.getProducts();

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }

    // Get logged in customer
    this.getCustomer();
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: product => {this.product = product},
      error: err => this.errorMessage = err
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: products => {this.products = products;},
      error: err => this.errorMessage = err
    });
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
  addToCart() {

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
        let productId = isNaN(Number(key.substring(12, 15))) ? Number(key.substring(19, 22)) : Number(key.substring(12, 15));
        let productFound: Product = this.findProductById(productId);
        this.cartItems.set(productFound, this.cart.items[key]);
      });
    } 
    
    // Add the current product to the cart
    this.cartItems.set(this.product, this.quantity);

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

  
  initializeCart() {
    this.cart = {
      id: 0,
      items: {},
      totalAmount: 0
    }
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
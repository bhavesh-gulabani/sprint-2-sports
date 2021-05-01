import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Cart } from 'src/app/cart/cart';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';
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
  category: string;

  customerLoggedIn: Customer;
  cart: Cart;
  cartItems: Map<Product, number> = new Map();

  constructor(private productService: ProductService, private customerService: CustomerService, private router: Router) { }  

  
  ngOnInit() {
    this.navigateToCategory();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationStart) {
          this.navigateToCategory();
        }  
      });
    

    // Get all products for adding to cart functionality
    this.getAllProducts();

    // Get customer
    this.getCustomer();

  }

  navigateToCategory() {
    const currentUrl: string = window.location.href;
        // Browse by category
        if (currentUrl.includes('Badminton') || currentUrl.includes('Cricket') || currentUrl.includes('Football') || currentUrl.includes('Tennis')) {
          this.category = currentUrl.split('/')[5];
         // console.log('Category', category);
          this.productService.getProductsByCategory(this.category).subscribe({
            next: products => {this.products = products},
            error: err => this.errorMessage = err
          });
      }
  }

  // Get all products for populating cart
  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: products => {this.allProducts = products; this.getCustomer()},
      error: err => this.errorMessage = err
    });
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
      error: err => this.errorMessage = err
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
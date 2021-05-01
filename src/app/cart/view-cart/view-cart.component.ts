import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { Order } from 'src/app/order/Order';
import { Product } from 'src/app/product/product';
import { CartService } from 'src/app/service/cart-service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order-service';
import { ProductService } from 'src/app/service/product-service';
import { Cart } from '../cart';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  cart: Cart;
  errorMessage: string;
  cartItems: Map<Product, number> = new Map();
  products: Product[];
  order: Order;
  customerLoggedIn: Customer;

  constructor(private cartService: CartService,
     private productService: ProductService,
      private route: ActivatedRoute,
      private router: Router,
      private orderService: OrderService,
      private customerService: CustomerService,
      ) { }


  ngOnInit() {

    this.initializeCart();   
    this.initializeOrder(); 
    
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCart(id);
    }
  }

  getCustomerLoggedIn() {
    let email = sessionStorage.getItem('email');
    this.customerService.getCustomerByEmail(email).subscribe({
      next: customer => {this.customerLoggedIn = customer;},
      error: err => this.errorMessage = err
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: products => {this.products = products; this.populateItems(); this.getCustomerLoggedIn()},
      error: err => this.errorMessage = err
    });
  }

  getCart(id: number): void {
    this.cartService.getCart(id).subscribe({
      next: cart => {this.cart = cart; this.getProducts();},
      error: err => this.errorMessage = err
    });
  }

  findProductById(id: number) {
    let product:Product;
    this.products.forEach(prod => {
      if (prod.id === id) {
        product = prod;
      }
    });
    return product;
  }

  populateItems(): void {
    Object.keys(this.cart.items).forEach(key => {
      // let productId = isNaN(Number(key.substring(12, 15))) ? Number(key.substring(19, 22)) : Number(key.substring(12, 15));
      let productId = Number(key.substring(19, 22));
      let productFound: Product = this.findProductById(productId);
      this.cartItems.set(productFound, this.cart.items[key]);
    });
  }

  addOrder(order:Order) {
    this.orderService.addOrder(order, this.customerLoggedIn.id).subscribe({
      next: order => {this.order = order; this.router.navigate(['/orders', this.order.id])},
      error: err => this.errorMessage = err
    });
  }

  placeOrder() {
    this.addOrder(this.order);
  }

  removeItem(product: Product) {
    
    // Reduce the cost
    this.cart.totalAmount -= product.priceAfterDiscount * this.cartItems.get(product);

    // Remove the product
    this.cartItems.delete(product);

    // Convert the Map<Product, number> to object{string: number} to match the data format for server
    const convertedCartItems = {};
    this.cartItems.forEach((val: number, key: Product) => {
      let stringifiedKey = `product: {'id' : '${key.id}'}`
      convertedCartItems[stringifiedKey] = val;
    });

    // Set the items attribute of the cart
    this.cart.items = convertedCartItems;

    // Set the customer's cart to updated cart
    this.customerLoggedIn.cart = this.cart;

    // Set orders null to avoid cyclic reference
    this.customerLoggedIn.orders = null;

    // Send PUT request to update customer details in the database
    this.updateCustomer();

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

  initializeOrder() {
    this.order = {
      id: 0,
      amount: 0,
      billingDate: null,
      payment: null,
      cart: null
    }
  }

}

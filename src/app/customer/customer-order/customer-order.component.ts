import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/cart/cart';
import { Order } from 'src/app/order/Order';
import { Payment } from 'src/app/payment/payment';
import { Product } from 'src/app/product/product';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order-service';
import { PaymentService } from 'src/app/service/payment-service';
import { ProductService } from 'src/app/service/product-service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {

  cart: Cart;
  order: Order;
  payment: Payment;
  cartItems: Map<Product, number> = new Map();
  customer: Customer;
  errorMessage: string;
  products: Product[];

  constructor(private route: ActivatedRoute,
     private orderService: OrderService,
     private productService: ProductService) { }

  ngOnInit() {
    this.initializeCart();   
    this.initializeOrder();

    const param = this.route.snapshot.paramMap.get('orderId');
    if (param) {
      const id = +param;
      this.getOrder(id);
    }
  }

  getOrder(id: number): void {
    this.orderService.getOrder(id).subscribe({
      next: order => {this.order = order; this.cart = order.cart; this.getProducts()},
      error: err => this.errorMessage = err
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: products => {this.products = products; this.populateItems();},
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
      let productId = Number(key.substring(19, 22));
      let productFound: Product = this.findProductById(productId);
      this.cartItems.set(productFound, this.cart.items[key]);
    });
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

  initializeCart() {
    this.cart = {
      id: 0,
      items: {},
      totalAmount: 0
    }
  }

}

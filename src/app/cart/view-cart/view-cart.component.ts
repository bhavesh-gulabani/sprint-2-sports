import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart-service';
import { CustomerService } from 'src/app/service/customer.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  cart: Cart;
  errorMessage: string;

  constructor(private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCart(id);
    }
  }

  getCart(id: number): void {
    this.cartService.getCart(id).subscribe({
      next: cart => this.cart = cart,
      error: err => this.errorMessage = err
    });
  }

}

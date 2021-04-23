import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/order/Order';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  errorMessage: string;
  orders: Order[];
  customerId: number;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.customerId = +param;
    }

    this.customerService.getOrders(this.customerId).subscribe({
      next: orders => {this.orders = orders; console.log(this.orders)},
      error: err => this.errorMessage = err
    });
  }

}

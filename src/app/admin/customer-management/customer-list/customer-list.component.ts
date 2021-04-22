import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../customer/customer';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  errorMessage: string;
  customers: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: customers => {this.customers = customers; console.log(this.customers)},
      error: err => this.errorMessage = err
    });
  }


}

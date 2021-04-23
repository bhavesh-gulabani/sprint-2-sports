import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../customer/customer';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  errorMessage: string;
  customer: Customer;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCustomer(id);
    }

    this.checkStatus();
  }

  getCustomer(id: number): void {
    this.customerService.getCustomer(id).subscribe({
      next: customer => this.customer = customer,
      error: err => this.errorMessage = err
    });
  }

  checkStatus() {
        
    
    

  }



}

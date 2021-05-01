import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/service/product-service';
import { Product } from '../../../product/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  products: Product[];
  errorMessage: string;

  constructor(private productService: ProductService , private router: Router) { 

  }

  ngOnInit() {

    this.productService.getProducts().subscribe({
      next: products => {this.products = products; console.log(this.products)},
      error: err => this.errorMessage = err
    });

  }
}

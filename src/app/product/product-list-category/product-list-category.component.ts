import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-list-category',
  templateUrl: './product-list-category.component.html',
  styleUrls: ['./product-list-category.component.css']
})
export class ProductListCategoryComponent implements OnInit {

  products: Product[];
  errorMessage: string;


  constructor() { }

  ngOnInit() {
  }

}

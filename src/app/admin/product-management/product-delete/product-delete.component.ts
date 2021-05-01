import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';

import { Product } from '../../../product/product';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;

  deleteProductForm: FormGroup;
  product: Product;


  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.deleteProductForm = this.fb.group({
      id  : ['']
      });
    }

    delete() {
      this.productService.deleteProduct(this.deleteProductForm.get('id').value).subscribe({
        next: product => {
          alert('Product successfully deleted');
        },
        error: err => this.errorMessage = err
      });

      this.router.navigate(['/admin', 'products']);
    }
  

 }




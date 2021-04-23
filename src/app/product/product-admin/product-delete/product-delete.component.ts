import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from '../../product';

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
      this.initializeProduct();
    }
    populateProduct(): void {

      this.product = {...history.state.data};
      this.product = {...this.product, ...this.deleteProductForm.value};
      console.log(this.product.id)
    }

    delete() {
      this.populateProduct();
      this.productService.deleteProduct(this.product.id).subscribe({
        next: product => {
          console.log(product);
          alert('Product successfully deleted');
        },
        error: err => this.errorMessage = err
      });

      this.router.navigate(['product-admin']);
    }
  
    initializeProduct(): void {
      this.product = {
      id:0, 
      name:null,
      category:null,
      description:null,
      brand:null, 
      color:null,
      size:null,
      mrp:0,
      discount:   0,
      priceAfterDiscount:0,
      stock:0,
      estimatedDelivery:null,
      imageUrl:null
    }
  }

 }




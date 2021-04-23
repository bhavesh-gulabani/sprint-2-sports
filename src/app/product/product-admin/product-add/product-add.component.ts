import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;

  addProductForm: FormGroup;
  product: Product;
  
  //displayMessage: { [key: string]: string } = {};
  //private validationMessages: { [key: string]: { [key: string]: string } };
  //genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      name : [''],
      category: [''], 
	description: [''],
	brand: [''],
	color: [''],
	size: [''],
	mrp:[''],
	discount:   [''],
	priceAfterDiscount:[''],
	stock:[''],
    estimatedDelivery:[''],
	imageUrl:['']
    });

    this.initializeProduct();

  }
    populateProduct(): void {

      this.product = {...history.state.data};
      this.product = {...this.product, ...this.addProductForm.value};
      
      // Hardcoding the default image url for now
      this.product.imageUrl = '../../../../assets/images/products/adizero.jpg';

      console.log(this.product)
    }

    save() {
      this.populateProduct();
      this.productService.addProduct(this.product).subscribe({
        next: product => {
          console.log(product);
          alert('Product successfully added to the catalog');
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

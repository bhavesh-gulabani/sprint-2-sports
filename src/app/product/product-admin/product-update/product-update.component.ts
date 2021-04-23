import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;

  updateProductForm: FormGroup;
  product: Product;
  
  //displayMessage: { [key: string]: string } = {};
  //private validationMessages: { [key: string]: { [key: string]: string } };
  //genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.updateProductForm = this.fb.group({
      id  : [''],
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
      this.product = {...this.product, ...this.updateProductForm.value};
      
      // Hardcoding the default image url for now
      this.product.imageUrl = '../../../../assets/images/products/adizero.jpg';

      console.log(this.product)
    }

    save() {
      this.populateProduct();
      this.productService.updateProduct(this.product).subscribe({
        next: product => {
          console.log(product);
          alert('Product successfully updated');
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

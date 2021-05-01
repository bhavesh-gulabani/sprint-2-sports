import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/service/product-service';




@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;
  imgCat : string;
  addProductForm: FormGroup;
  product: Product;
  
  displayMessage: { [key: string]: string } = {};
  //private validationMessages: { [key: string]: { [key: string]: string } };
  //genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      name :              ['', Validators.required],
      category:           ['', Validators.required], 
	    description:        ['', Validators.required],
      brand:              ['', Validators.required],
      color:              ['', Validators.required],
	    size:               ['', Validators.required],
	    mrp:                ['', [Validators.required, Validators.min(1)]],
	    discount:           ['', [Validators.required, Validators.min(1)]],
	    priceAfterDiscount: ['', Validators.required],
	    stock:              ['', [Validators.required, Validators.min(1)]],
      estimatedDelivery:  ['', Validators.required],
	    imageName:          ['', Validators.required],
      imageFormat:        ['']
    });
    this.initializeProduct();

  }
    populateProduct(): void {

      this.product = {...history.state.data};
      this.product = {...this.product, ...this.addProductForm.value};
      this.imgCat = this.addProductForm.get('category').value;
      this.imgCat=this.imgCat.toLocaleLowerCase();
      this.product.imageUrl = '../../../../assets/images/products/' + this.imgCat + '/' + 
        this.addProductForm.get('imageName').value  + this.addProductForm.get('imageFormat').value;
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

      this.router.navigate(['/admin', 'products']);
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

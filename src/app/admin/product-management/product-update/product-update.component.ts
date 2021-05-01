import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';

import { Product } from '../../../product/product';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;
  imgCat : string;
  updateProductForm: FormGroup;
  product: Product;
  prodId:string;
  
  //displayMessage: { [key: string]: string } = {};
  //private validationMessages: { [key: string]: { [key: string]: string } };
  //genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router,  private route: ActivatedRoute) {
    this.prodId = this.route.snapshot.paramMap.get('id');
    if (this.prodId) {
      const id = +this.prodId;
      this.getProduct(id);
    } 
   }

  ngOnInit() {  

    this.updateProductForm = this.fb.group({
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

    getProduct(id:number):void{
      this.productService.getProduct(id).subscribe({
        next : product => this.displayProduct(product),
        error : err => this.errorMessage = err 
      });
    }

    displayProduct(product : Product):void{
      if(this.updateProductForm){
        this.updateProductForm.reset();
      }

      this.product = product;

    //  populate data into form
      this.updateProductForm.patchValue({
        id:this.product.id, 
        name:this.product.name,
        category:this.product.category,
        description:this.product.description,
        brand:this.product.brand, 
        color:this.product.color,
        size:this.product.size,
        mrp:this.product.mrp,
        discount: this.product.discount,
        priceAfterDiscount: this.product.priceAfterDiscount,
        stock:this.product.stock,
        estimatedDelivery:this.product.estimatedDelivery,
      })
    }

    

    populateProduct(): void {

      this.product = {...history.state.data};
      this.product = {...this.product, ...this.updateProductForm.value};
      this.imgCat = this.updateProductForm.get('category').value;
      this.imgCat=this.imgCat.toLocaleLowerCase();
      this.product.imageUrl = '../../../../assets/images/products/' + this.imgCat + '/' + 
        this.updateProductForm.get('imageName').value  + this.updateProductForm.get('imageFormat').value;
      console.log(this.product)
    }

    save() {
      const product: Product = { ...this.product, ...this.updateProductForm.value };         
      console.log('Before subscibing: ', product);         
      this.productService.updateProduct(product)
        .subscribe({
          next: (product) => {this.product = product; this.onSaveComplete();},
          error: err => this.errorMessage = err
        });
    }

    delete() {
      console.log('In delete');         
      this.productService.deleteProduct(this.product.id).subscribe({
        
        next: product => {
          alert('Product successfully deleted');
        },
        error: err => this.errorMessage = err
      });

      this.router.navigate(['/admin', 'products']);
    }

    onSaveComplete() {
     
      // alert('Successfully updated!')
      Swal.fire({
        title: 'Success', 
        text: 'Product successfully updated', 
        icon: 'success',
        width: '25rem'
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

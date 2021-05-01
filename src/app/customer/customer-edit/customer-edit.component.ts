import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomerService } from 'src/app/service/customer.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { NumberValidators } from 'src/app/shared/number.validator';
import Swal from 'sweetalert2';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  customerEditForm: FormGroup;
  errorMessage: string;
  customer: Customer;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { 
    // Defines all of the validation messages for the form.
    this.validationMessages = {
      name: {
        required: `Please enter your name`,
        minlength: `The name must be longer than 3 characters.`
      },
      contactNo: {
        phone: `Please enter a 10 digit valid number.` 
      },
      email: {
        required: `Please enter your email address.`,
        email: 'Please enter a valid email address.',
      },
      password: {
        required: `Please enter your password`,
        minlength: `The password must be longer than 6 characters.`
      },
      street: {
        required: `Please enter the street.`
      },
      doorNo: {
        required: `Please enter the door number.`
      },
      area: {
        required: `Please enter the area.`
      },
      city: {
        required: `Please enter the city.`
      },
      state: {
        required: `Please enter the state.`
      },
      pincode: {
        correctNumber: `The pincode must a valid number.`,
        required: `Please enter the pincode.`
      }
    }

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

   }

  ngOnInit() {
    this.initializeCustomer();

    this.customerEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contactNo: ['', NumberValidators.phone()],
      dateOfBirth: [''],
      street: ['', Validators.required],
      doorNo: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, NumberValidators.correctNumber()]],
    });

    // Read the customer id from the route parameter
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCustomer(id);
    }
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.customerEditForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.customerEditForm);
    });
  }

  getCustomer(id: number): void {
    this.customerService.getCustomer(id).subscribe({
      next: customer => this.displayCustomer(customer),
      error: err => this.errorMessage = err
    });
  }

  displayCustomer(customer: Customer): void {
   
    if (this.customerEditForm) {
      this.customerEditForm.reset();
    }

    this.customer = customer

    // Update the data on the form
    this.customerEditForm.patchValue({
      name: this.customer.name,
      email: this.customer.email,
      password: this.customer.password,
      contactNo: this.customer.contactNo,
      dateOfBirth: this.customer.dateOfBirth,
      street: this.customer.address.street,
      doorNo: this.customer.address.doorNo,
      area: this.customer.address.area,
      city: this.customer.address.city,
      state: this.customer.address.state,
      pincode: this.customer.address.pincode
    });
  }


  save() {

    const customer: Customer = { ...this.customer, ...this.customerEditForm.value };
    customer.address = { ...this.customerEditForm.value }
    

    // Set email in session storage in case email has been edited
    sessionStorage.setItem('email', customer.email);

   customer.orders = null;

    this.customerService.updateCustomer(customer)
      .subscribe({
        next: (customer) => {this.customer = customer; this.onSaveComplete();},
        error: err => this.errorMessage = err
      });

  }

  onSaveComplete() {
    // Reset the form to clear the flags
    this.customerEditForm.reset();
    // alert('Successfully updated!')
    // Swal.fire({
    //   title: 'Success', 
    //   text: 'Account successfully updated', 
    //   icon: 'success',
    //   width: '25rem'
    //   });
    this.router.navigate(['/customers', 'profile', this.customer.id]);
  }

  
  initializeCustomer(): void {
    this.customer = {
      id: 0,
      email: null,
      password: null,
      role: null,
      name: null,
      contactNo: null,
      dateOfBirth: null,
      imageUrl: null,
      address: {
        street: null,
        doorNo: null,
        area: null,
        city: null,
        state: null,
        pincode: null
      },
      orders: null,
      status: null,
      cart: null
    } 
  }

}

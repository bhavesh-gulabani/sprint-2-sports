import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Order } from 'src/app/order/Order';
import { CustomerService } from 'src/app/service/customer.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { NumberValidators } from 'src/app/shared/number.validator';
import { Customer } from '../../customer';


@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;

  additionalInfoForm: FormGroup;
  customer: Customer;
  
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.additionalInfoForm = this.fb.group({
      dateOfBirth: [''],
      street: ['', Validators.required],
      doorNo: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, NumberValidators.correctNumber()]],
    });

    this.initializeCustomer();

    // Defines all of the validation messages for the form.
    this.validationMessages = {
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

  populateCustomer(): void {

    this.customer = {...history.state.data};
    this.customer = {...this.customer, ...this.additionalInfoForm.value};
    this.customer.address = {...this.additionalInfoForm.value}

    this.customer.role = 'Customer';

    // Initially customer status is valid
    this.customer.status = 'Valid';
    
    // Hardcoding the default image url
    this.customer.imageUrl = '../../../../assets/images/person-placeholder.png';

  }

  save() {
    this.populateCustomer();
    this.customerService.addCustomer(this.customer).subscribe({
      next: customer => { },
      error: err => this.errorMessage = err
    });

    this.router.navigate(['customers/login']);
  }


  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.additionalInfoForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.additionalInfoForm);
    });
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

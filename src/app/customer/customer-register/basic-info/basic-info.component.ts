import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomerService } from 'src/app/service/customer.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { Customer } from '../../customer';

import { NumberValidators } from '../../../shared/number.validator';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;

  registerForm: FormGroup;
  customer: Customer;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;
  
  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {     
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
      }
    }

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

   }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      contactNo: ['', [NumberValidators.phone()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });

  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.registerForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);
    });
  }

  populateCustomer(): void {
    this.customer = {...this.registerForm.value};
    console.log(this.customer);
  }

  save() {
    this.populateCustomer();
    this.router.navigate(['/customers/register/additional-info'], {state: {data: this.customer}});
  }

}

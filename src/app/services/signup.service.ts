import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SignupService {
  private signupForm: FormGroup = new FormGroup({});
  private pending: boolean = false;
  
  public signupFormSubject = new Subject<FormGroup>();
  public pendingSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient, public snackbar: MatSnackBar) {
    this.initForm();
  }

  emitSignupFormSubject() {
    this.signupFormSubject.next(this.signupForm);
  }

  emitPendingSubject() {
    this.pendingSubject.next(this.pending);
  }

  private initForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl(''),
      passwordConfirmed: new FormControl(''),
    }, {validators: [this.comparePasswordsValidator, this.checkPasswordRequirementsValidator]});
  }

  private comparePasswordsValidator(control: AbstractControl): ValidationErrors | null {
    if (control.get('passwordConfirmed')?.value === '') {
      control.get('passwordConfirmed')?.setErrors({required: true});
      return {required: true}
    } else {
      control.get('passwordConfirmed')?.setErrors(null);

      if (control.get('password')?.value !== control.get('passwordConfirmed')?.value) {
        control.get('passwordConfirmed')?.setErrors({notSame: true});
        return {notSame: true}
      } else {
        control.get('passwordConfirmed')?.setErrors(null);
      }
    }

    return null;
  }

  private checkPasswordRequirementsValidator(control: AbstractControl): ValidationErrors | null {
    const passwordValue = control.get('password')?.value;
    const firstNameValue = control.get('firstName')?.value;
    const lastNameValue = control.get('lastName')?.value;

    if (passwordValue === '' || passwordValue === null) {
      control.get('password')?.setErrors({required: true});
      return {required: true}
    } else {
      control.get('password')?.setErrors(null);

      if (passwordValue.length < 8) {
        control.get('password')?.setErrors({length: true});
        return {length: true}
      } else {
        control.get('password')?.setErrors(null);

        if (!new RegExp('(?=.*[a-z])(?=.*[A-Z])').test(passwordValue)) {
          control.get('password')?.setErrors({patternError: true});
          return {patternError: true}
        } else {
          control.get('password')?.setErrors(null);
          
          if (
            (firstNameValue !== '' &&
              firstNameValue !== null &&
              passwordValue.toLowerCase().includes(firstNameValue.toLowerCase())) ||
            (lastNameValue !== '' &&
              lastNameValue !== null &&
              passwordValue.toLowerCase().includes(lastNameValue.toLowerCase()))
          ) {
            control.get('password')?.setErrors({nameError: true});
            return {nameError: true}
          } else {
            control.get('password')?.setErrors(null);
          }
        }
      }
    }

    return null;
  }

  submitSignup(formRef: FormGroupDirective) {
    return new Promise((resolve, reject) => {
      const formValues = this.signupForm.value;
      const data = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email
      };

      this.pending = true;
      this.emitPendingSubject();

      this.httpClient.post(environment.usersEndpoint, data)
        // .subscribe(
        .toPromise()
        .then(
          (response) => {
            formRef.resetForm();
            this.emitSignupFormSubject();

            this.pending = false;
            this.emitPendingSubject();

            this.snackbar.open(
              'Account created successfully',
              undefined,
              {
                duration: 2000,
                panelClass: 'success-snackbar',
                horizontalPosition: 'center',
                verticalPosition: 'top'
              }
            );

            resolve(response);
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
    });
  }
}
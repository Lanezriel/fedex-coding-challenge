import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { SignupService } from '../services/signup.service';

import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let signupService: SignupService;
  let httpTestingControler: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFormComponent ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
      ],
      providers: [ SignupService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    signupService = TestBed.inject(SignupService);
    httpTestingControler = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingControler.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use SignupService', () => {
    expect(signupService).toBeTruthy();
  });

  it('should have invalid form at start', () => {
    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should disable submit button at start', () => {
    expect(fixture.nativeElement.querySelector('button').disabled).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').disabled).toBeFalsy();
  });

  // FIRST NAME
  it('should not validate firstName if empty', () => {
    component.signupForm.controls.firstName.setValue('');

    expect(component.signupForm.controls.firstName.invalid).toBeTruthy();
  });

  it('should validate firstName if not empty', () => {
    component.signupForm.controls.firstName.setValue('a');

    expect(component.signupForm.controls.firstName.valid).toBeTruthy();
  });

  // LAST NAME
  it('should not validate lastName if empty', () => {
    component.signupForm.controls.lastName.setValue('');

    expect(component.signupForm.controls.lastName.invalid).toBeTruthy();
  });

  it('should validate lastName if not empty', () => {
    component.signupForm.controls.lastName.setValue('a');

    expect(component.signupForm.controls.lastName.valid).toBeTruthy();
  });

  // EMAIL
  it('should not validate email if empty', () => {
    component.signupForm.controls.email.setValue('');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if simple string without "@" and "."', () => {
    component.signupForm.controls.email.setValue('test');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if string like "test@"', () => {
    component.signupForm.controls.email.setValue('test@');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if string like "test@test"', () => {
    component.signupForm.controls.email.setValue('test@test');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if string like "test."', () => {
    component.signupForm.controls.email.setValue('test.');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if string like "test.@"', () => {
    component.signupForm.controls.email.setValue('test.@');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if string like "test.test@"', () => {
    component.signupForm.controls.email.setValue('test@');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if string like "test@test.c"', () => {
    component.signupForm.controls.email.setValue('test@test.c');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if string like "test.test@test.c"', () => {
    component.signupForm.controls.email.setValue('test@');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if string like "test-1@"', () => {
    component.signupForm.controls.email.setValue('test-1@');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should not validate email if string like "test-1@test.c"', () => {
    component.signupForm.controls.email.setValue('test-1@test.c');

    expect(component.signupForm.controls.email.invalid).toBeTruthy();
  });

  it('should validate email if string like "test@test.en"', () => {
    component.signupForm.controls.email.setValue('test@test.en');

    expect(component.signupForm.controls.email.valid).toBeTruthy();
  });

  it('should validate email if string like "test.test@test.en"', () => {
    component.signupForm.controls.email.setValue('test.test@test.en');

    expect(component.signupForm.controls.email.valid).toBeTruthy();
  });

  it('should validate email if string like "test-1@test.en"', () => {
    component.signupForm.controls.email.setValue('test-1@test.en');

    expect(component.signupForm.controls.email.valid).toBeTruthy();
  });

  it('should validate email if string like "test@test.com"', () => {
    component.signupForm.controls.email.setValue('test@test.com');

    expect(component.signupForm.controls.email.valid).toBeTruthy();
  });

  // PASSWORD
  it('should not validate password if empty', () => {
    component.signupForm.controls.password.setValue('');

    expect(component.signupForm.controls.password.invalid).toBeTruthy();
  });

  it('should not validate password if 1 character', () => {
    component.signupForm.controls.password.setValue('a');

    expect(component.signupForm.controls.password.invalid).toBeTruthy();
  });

  it('should not validate password if 4 characters', () => {
    component.signupForm.controls.password.setValue('test');

    expect(component.signupForm.controls.password.invalid).toBeTruthy();
  });

  it('should not validate password if 7 characters', () => {
    component.signupForm.controls.password.setValue('test123');

    expect(component.signupForm.controls.password.invalid).toBeTruthy();
  });

  it('should not validate password if 8 characters but only lower cases', () => {
    component.signupForm.controls.password.setValue('lowercase');

    expect(component.signupForm.controls.password.invalid).toBeTruthy();
  });

  it('should not validate password if 8 characters but only upper cases', () => {
    component.signupForm.controls.password.setValue('UPPERCASE');

    expect(component.signupForm.controls.password.invalid).toBeTruthy();
  });

  it('should not validate password if 8 characters, lower and upper cases but contains first name', () => {
    component.signupForm.controls.firstName.setValue('Name');
    component.signupForm.controls.password.setValue('Name1234');

    expect(component.signupForm.controls.password.invalid).toBeTruthy();
  });

  it('should not validate password if 8 characters, lower and upper cases but contains last name', () => {
    component.signupForm.controls.lastName.setValue('Last');
    component.signupForm.controls.password.setValue('12Last34');

    expect(component.signupForm.controls.password.invalid).toBeTruthy();
  });

  it('should validate password if 8 characters, lower and upper cases and first name is empty', () => {
    component.signupForm.controls.firstName.setValue('');
    component.signupForm.controls.password.setValue('Test1234');

    expect(component.signupForm.controls.password.valid).toBeTruthy();
  });

  it('should validate password if 8 characters, lower and upper cases and last name is empty', () => {
    component.signupForm.controls.lastName.setValue('');
    component.signupForm.controls.password.setValue('Test1234');

    expect(component.signupForm.controls.password.valid).toBeTruthy();
  });

  it('should validate password if 8 characters, lower and upper cases and first name is not included', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.password.setValue('Test1234');

    expect(component.signupForm.controls.password.valid).toBeTruthy();
  });

  it('should validate password if 8 characters, lower and upper cases and last name is not included', () => {
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.password.setValue('Test1234');

    expect(component.signupForm.controls.password.valid).toBeTruthy();
  });

  it('should validate password if 8 characters, lower and upper cases and both names are not included', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.password.setValue('Test1234');

    expect(component.signupForm.controls.password.valid).toBeTruthy();
  });

  // PASSWORD CONFIRMED
  it('should not validate password confirmed if empty', () => {
    component.signupForm.controls.passwordConfirmed.setValue('');

    expect(component.signupForm.controls.passwordConfirmed.invalid).toBeTruthy();
  });

  it('should not validate password confirmed if not empty but password is empty', () => {
    component.signupForm.controls.password.setValue('');
    component.signupForm.controls.passwordConfirmed.setValue('password');

    expect(component.signupForm.controls.passwordConfirmed.invalid).toBeTruthy();
  });

  it('should not validate password confirmed if not different than password', () => {
    component.signupForm.controls.password.setValue('anything');
    component.signupForm.controls.passwordConfirmed.setValue('password');

    expect(component.signupForm.controls.passwordConfirmed.invalid).toBeTruthy();
  });

  it('should validate password confirmed if same than password (even with invalid password)', () => {
    component.signupForm.controls.password.setValue('password');
    component.signupForm.controls.passwordConfirmed.setValue('password');

    expect(component.signupForm.controls.passwordConfirmed.valid).toBeTruthy();
  });

  it('should validate password confirmed if same than password (valid)', () => {
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    expect(component.signupForm.controls.passwordConfirmed.valid).toBeTruthy();
  });

  // FORM
  it('should not validate form if first name is invalid', () => {
    component.signupForm.controls.firstName.setValue('');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if last name is invalid', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if email is invalid (empty)', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if email is invalid (pattern)', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if password is invalid (empty)', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('');
    component.signupForm.controls.passwordConfirmed.setValue('');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if password is invalid (< 8 char)', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Test123');
    component.signupForm.controls.passwordConfirmed.setValue('Test123');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if password is invalid (pattern)', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('invalid123');
    component.signupForm.controls.passwordConfirmed.setValue('invalid123');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if password is invalid (contains first name)', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Greg1234');
    component.signupForm.controls.passwordConfirmed.setValue('Greg1234');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if password is invalid (contains last name)', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Thompson');
    component.signupForm.controls.passwordConfirmed.setValue('Thompson');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if password confirmed is invalid (empty)', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should not validate form if password confirmed is invalid (different from password)', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Diff1234');

    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should validate form if all fields are valid', () => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    expect(component.signupForm.valid).toBeTruthy();
  });

  // SUBMIT
  it('should disable submit button when request is pending', fakeAsync(() => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    fixture.detectChanges();
    signupService.submitSignup(component.formRef);

    const req = httpTestingControler.expectOne(environment.usersEndpoint);
    req.flush(null);

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').disabled).toBeTruthy();

    flush();
  }));

  it('should reset form on successful submit', fakeAsync(() => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').disabled).toBeFalsy();

    signupService.submitSignup(component.formRef);

    const req = httpTestingControler.expectOne(environment.usersEndpoint);
    req.flush(null);

    flush();

    expect(component.signupForm.controls.firstName.value).toEqual(null);
    expect(component.signupForm.controls.lastName.value).toEqual(null);
    expect(component.signupForm.controls.email.value).toEqual(null);
    expect(component.signupForm.controls.password.value).toEqual(null);
    expect(component.signupForm.controls.passwordConfirmed.value).toEqual(null);
  }));

  it('should show a success snackbar on successful submit', fakeAsync(() => {
    component.signupForm.controls.firstName.setValue('Greg');
    component.signupForm.controls.lastName.setValue('Thompson');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Valid123');
    component.signupForm.controls.passwordConfirmed.setValue('Valid123');

    spyOn(signupService.snackbar, 'open');

    signupService.submitSignup(component.formRef);

    const req = httpTestingControler.expectOne(environment.usersEndpoint);
    req.flush(null);

    flush();

    expect(signupService.snackbar.open).toHaveBeenCalled();
  }));
});

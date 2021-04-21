import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit, OnDestroy {

  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  signupFormSubscription: Subscription = new Subscription();
  pendingSubscription: Subscription = new Subscription();

  signupForm: FormGroup = new FormGroup({});
  pending: boolean = false;

  constructor(private signupService: SignupService) { }

  ngOnInit(): void {
    this.signupFormSubscription = this.signupService.signupFormSubject.subscribe(
      (signupForm: FormGroup) => {
        this.signupForm = signupForm;
      }
    );
    this.signupService.emitSignupFormSubject();

    this.pendingSubscription = this.signupService.pendingSubject.subscribe(
      (pending: boolean) => {
        this.pending = pending;
      }
    );
    this.signupService.emitPendingSubject();
  }

  ngOnDestroy(): void {
    this.signupFormSubscription.unsubscribe();
    this.pendingSubscription.unsubscribe();
  }

  onSubmitForm() {
    this.signupService.submitSignup(this.formRef);
  }
}

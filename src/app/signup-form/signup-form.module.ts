import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignupService } from "../services/signup.service";

import { SignupFormRoutingModule } from "./signup-form-routing.module";
import { SignupFormComponent } from "./signup-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupFormRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  declarations: [
    SignupFormComponent,
  ],
  providers: [SignupService]
})
export class SignupFormModule {}
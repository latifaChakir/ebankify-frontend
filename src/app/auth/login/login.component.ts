import { Component } from '@angular/core';
import {AuthService} from "../../core/services/auth/auth.service";
import {RegisterRequest} from "../../core/models/auth/register-request";
import {LoginRequest} from "../../core/models/auth/login-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent {
  model : LoginRequest = {
    email: '',
    password: '',
  };
  constructor(private authService: AuthService) { }
  onSubmit(): void {
    console.log('Submitting:', this.model);
    this.authService.login(this.model).subscribe({
      next: (response: LoginRequest) => {
        console.log('Login successful', response);
        this.resetForm();
      },
      error: (error: any) => {
        console.error('login failed:', error);
        alert(`login failed. ${error.message || 'Please try again.'}`);
      }
    });
  }


  private resetForm(): void {
    this.model = {
      email: '',
      password: '',
    };
  }
}

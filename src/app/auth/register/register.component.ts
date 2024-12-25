import { Component } from '@angular/core';
import { AuthService } from "../../core/services/auth/auth.service";
import { RegisterRequest } from "../../core/models/auth/register-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: RegisterRequest = {
    name: '',
    email: '',
    age: null,
    password: '',
    roles: [2],
    active: true
  };

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    console.log('Submitting:', this.model);
    this.authService.register(this.model).subscribe({
      next: (response: RegisterRequest) => {
        console.log('Registration successful', response);
        this.resetForm();
      },
      error: (error: any) => {
        console.error('Registration failed:', error);
        alert(`Registration failed. ${error.message || 'Please try again.'}`);
      }
    });
  }


  private resetForm(): void {
    this.model = {
      name: '',
      email: '',
      age: null,
      password: '',
      roles: [],
      active: true
    };
  }
}

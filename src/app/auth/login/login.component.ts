import { Component } from '@angular/core';
import { AuthService } from "../../core/services/auth/auth.service";
import { LoginRequest } from "../../core/models/auth/login-request";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: LoginRequest = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    console.log('Submitting:', this.model);
    this.authService.login(this.model).subscribe({
      next: (response: any) => {
        this.toastr.success(
          `<i class="fas fa-check toast-icon"></i> Login successful!`,
          '',
          {
            positionClass: 'toast-top-right',
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            toastClass: 'toast custom-toast-success',
            enableHtml: true,
          }
        );
        console.log('Login successful', response);
        const token = response.user.token;
        localStorage.setItem('token', token);
        localStorage.setItem('username', response.user.name);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('role', response.user.roles[0].name);
        if (response.user.roles[0].name === 'USER') {
          console.log('User logged in');
          this.router.navigate(['/profil']);
        } else if (response.user.roles[0].name === 'EMPLOYEE') {
          console.log('EMPLOYEE logged in');
        } else if (response.user.roles[0].name === 'ADMIN') {
          console.log('ADMIN logged in');
          this.router.navigate(['/users']);

        }
      else {
          console.error('Invalid response structure:', response);
        }

        this.resetForm();
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        let message = 'An unexpected error occurred.';
        if (error && typeof error === 'object') {
          if (error.message) {
            message = error.message;
          }
        }
        this.toastr.error(
          `<i class="fas fa-times toast-icon mx-1"></i> ${message}`,
          '',
          {
            positionClass: 'toast-top-right',
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            toastClass: 'toast custom-toast-error',
            enableHtml: true,
          }
        );
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

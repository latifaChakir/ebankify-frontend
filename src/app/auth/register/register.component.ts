import { Component } from '@angular/core';
import { AuthService } from "../../core/services/auth/auth.service";
import { RegisterRequest } from "../../core/models/auth/register-request";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

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

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  onSubmit(): void {
    this.authService.register(this.model).subscribe({
      next: () => {
        this.toastr.success(
          `<i class="fas fa-check toast-icon"></i> Registration successful!`,
          '',
          {
            positionClass: 'toast-top-right',
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            toastClass: 'toast custom-toast-success',
            enableHtml: true
          }
        );
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        let message = 'An unexpected error occurred.';
        if (error && typeof error === 'object') {
          if (error.details) {
            message = Object.values(error.details).join(', ');
          } else if (error.message) {
            message = error.message;
          }
        }
        this.toastr.error(
          ` <i class="fas fa-times toast-icon mx-1"></i> ${message}`,
          '',
          {
            positionClass: 'toast-top-right',
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            toastClass: 'toast custom-toast-error',
            enableHtml: true
          }
        );
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

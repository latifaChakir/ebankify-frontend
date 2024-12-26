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
        this.toastr.success('Registration successful!', 'Success', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          toastClass: 'custom-toast-success',
        });
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        if (error && typeof error === 'object') {
          if (error.details) {
            for (const message of Object.values(error.details)) {
              this.toastr.error(message as string, '', {
                positionClass: 'toast-top-right',
                timeOut: 5000,
                progressBar: true,
                closeButton: true,
                toastClass: 'custom-toast-error',
              });
            }
          } else if (error.message) {
            this.toastr.error(error.message, 'Error', {
              positionClass: 'toast-top-right',
              timeOut: 5000,
              progressBar: true,
              closeButton: true,
              toastClass: 'custom-toast-error',
            });
          } else {
            this.toastr.error('An unexpected error occurred.', 'Error', {
              positionClass: 'toast-top-right',
              timeOut: 5000,
              progressBar: true,
              closeButton: true,
              toastClass: 'custom-toast-error',
            });
          }
        } else {
          this.toastr.error('An unexpected error occurred.', 'Error', {
            positionClass: 'toast-top-right',
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            toastClass: 'custom-toast-error',
          });
        }
      },
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

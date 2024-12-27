import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { RegisterRequest } from "../../models/auth/register-request";
import { LoginRequest } from "../../models/auth/login-request";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<RegisterRequest>(`${this.api}/register`, request).pipe(
      catchError((error) => {
        if (error.error && error.error.details) {
          return throwError({
            message: error.error.message || 'Validation failed',
            details: error.error.details,
          });
        }
        return throwError({
          message: error.error?.message || 'An unexpected error occurred.',
        });
      })
    );
  }


  login(request: LoginRequest): Observable<any> {
    return this.http.post<LoginRequest>(`${this.api}/login`, request).pipe(
      catchError((error) => {
        if (error.error && error.error.message) {
          return throwError({ message: error.error.message });
        }
        return throwError({ message: 'Login failed. Please try again.' });
      })
    );
  }
  getLoggedInUser(token: string): Observable<any> {
    return this.http.get<Observable<any>>(`${this.api}/current-user`, {
      headers: { Authorization: `Bearer ${token}`},
      });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}

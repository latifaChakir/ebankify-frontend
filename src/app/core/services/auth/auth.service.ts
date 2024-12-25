import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { RegisterRequest } from "../../models/auth/register-request";
import { Observable } from "rxjs";
import {LoginRequest} from "../../models/auth/login-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(`${this.api}/register`, request);
  }
  login(request: LoginRequest): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(`${this.api}/login`, request);
  }
}

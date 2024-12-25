import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { RegisterRequest } from "../../models/auth/register-request";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(`${this.api}/register`, request);
  }
}

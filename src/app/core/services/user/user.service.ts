import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.api}/save`, user);
  }

  updateUser(userId: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.api}/update/${userId}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/delete/${userId}`);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private api = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) { }
  getAllAccounts(): Observable<{ accounts: any[] }> {
    return this.http.get<{ accounts: any[] }>(`${this.api}/all`);
  }
  saveAccount(account: any) : Observable<any> {
    return this.http.post<any>(`${this.api}/save`, account);
  }
  deleteAccount(id: number) : Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
  updateAccount(id: number, account: any) : Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, account);
  }
}

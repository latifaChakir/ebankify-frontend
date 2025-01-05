import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Transaction} from "../../models/transaction";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Loan} from "../../models/loan";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private api = `${environment.apiUrl}/loans`;
  constructor(private http: HttpClient) { }
  getAllLoans(): Observable<Loan[]> {
    return this.http.get<any>(this.api).pipe(
      map(response => response.loans)
    );
  }

  createLoan(loan: Loan): Observable<any> {
    return this.http.post<any>(`${this.api}/save`, loan);
  }

  updateLoan(id: number, loan: Loan): Observable<any> {
    return this.http.put<any>(`${this.api}/update/${id}`, loan);
  }

  deleteLoan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }

}

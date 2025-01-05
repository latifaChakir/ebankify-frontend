import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {Transaction} from "../../models/transaction";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private api = `${environment.apiUrl}/transactions`;
  constructor(private http: HttpClient) { }
 getAllTransaction(): Observable<any[]> {
   return this.http.get<any>(`${this.api}/all`).pipe(
     map(response => response.transactions)
   );
 }
 createTransaction(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.api}/save`, transaction);
 }
 updateTransaction(id:number, transaction: Transaction): Observable<any> {
    return this.http.put<any>(`${this.api}/update/${id}`, transaction);
 }
 deleteTransaction(id:number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
 }
}

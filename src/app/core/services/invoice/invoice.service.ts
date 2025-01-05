import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private api = `${environment.apiUrl}/invoices`;
  constructor(private http: HttpClient) { }

  getAllInvoices(): Observable<any[]> {
    return this.http.get<any>(`${this.api}/all`).pipe(
      map(response => response.invoices)
    );
  }
  createInvoice(invoice: any): Observable<any> {
    return this.http.post<any>(`${this.api}/save`, invoice);
  }
  updateInvoice(id: number, invoice: any): Observable<any> {
    return this.http.put<any>(`${this.api}/update`, invoice);
  }
  deleteInvoice(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}

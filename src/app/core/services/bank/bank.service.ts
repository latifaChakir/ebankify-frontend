import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bank} from "../../models/bank";

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private api = `${environment.apiUrl}/accounts`;

  constructor(private  http : HttpClient) { }
  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.api}/banks`);
  }

}

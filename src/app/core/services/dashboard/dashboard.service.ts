import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private api = `${environment.apiUrl}/statistics`;

  constructor(private http: HttpClient) { }
  getAllStatistics(): Observable<any> {
    return this.http.get<any>(`${this.api}/all`);
  }
}

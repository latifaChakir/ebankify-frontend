import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvoiceComponent} from "./invoice/invoice.component";
import {LoanComponent} from "./loan/loan.component";

const routes: Routes = [
  {path : "invoices" , component : InvoiceComponent},
  {path : "loans" , component : LoanComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

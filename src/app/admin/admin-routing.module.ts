import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserManagementComponent} from "./user-management/user-management.component";
import {sessionGuard} from "../core/guards/session.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {roleGuard} from "../core/guards/role.guard";
import {BankComponent} from "./bank/bank.component";

const routes: Routes = [
  {path : "users" , component :UserManagementComponent,
    data: { role: 'ADMIN' }, canActivate: [roleGuard], canActivateChild: [sessionGuard]
  },
  {path: "dashboard", component :DashboardComponent},
  {path: "banks", component :BankComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

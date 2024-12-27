import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserManagementComponent} from "./user-management/user-management.component";
import {sessionGuard} from "../core/guards/session.guard";

const routes: Routes = [
  {path : "users" , component :UserManagementComponent,canActivate: [sessionGuard],
    //data: { role: 'ADMIN' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountComponent} from "./account/account.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {ProfileComponent} from "./profile/profile.component";
import {NoAuthorityComponent} from "./no-authority/no-authority.component";

const routes: Routes = [
  {path : "accounts" , component : AccountComponent},
  {path : "transactions", component : TransactionComponent},
  {path : "profil", component : ProfileComponent},
  {path : "NotAuthorized", component : NoAuthorityComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

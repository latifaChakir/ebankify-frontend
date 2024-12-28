import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {UserManagementComponent} from "./user-management/user-management.component";
import {NavComponent} from "../layouts/nav/nav.component";
import {SideComponent} from "../layouts/side/side.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NavComponent,
    SideComponent,
    ReactiveFormsModule,
    FormsModule
  ],

})
export class AdminModule { }

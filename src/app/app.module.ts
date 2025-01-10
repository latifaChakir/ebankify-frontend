import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import { LayoutsModule } from './layouts/layouts.module';
import {AuthModule} from "./auth/auth.module";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, provideHttpClient,withInterceptors } from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AdminModule} from "./admin/admin.module";
import {authInterceptor} from "./core/interceptors/auth.interceptor";
import {UserModule} from "./user/user.module";
import {EmployeeModule} from "./employee/employee.module";
import {errorInterceptor} from "./core/interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      toastClass: 'custom-toast',
    }),
    LayoutsModule,
    AdminModule,
    UserModule,
    EmployeeModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

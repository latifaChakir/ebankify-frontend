import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LayoutsModule } from './layouts/layouts.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import {httpErrorInterceptor} from "./core/interceptors/http-error.interceptor";
import {StoreModule} from "@ngrx/store";
import {transactionsReducer} from "./core/stores/transaction/transactions.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TransactionsEffects} from "./core/stores/transaction/transactions.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    StoreModule.forRoot({
      transactions: transactionsReducer,
    }),
    EffectsModule.forRoot([TransactionsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, httpErrorInterceptor])),
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

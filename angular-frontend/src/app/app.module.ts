import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonStoreModule } from './service/common-store.module';
import { PaymentsComponent } from './payments/payments.component';

declare global {
  interface Window { analytics: any; }
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'adminPage',
    component: AdminPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'payment',
    component: PaymentsComponent
  }
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminPageComponent,
    NavbarComponent,
    PaymentsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    CommonStoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

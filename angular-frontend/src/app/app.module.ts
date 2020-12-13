import { NavbarModule } from './components/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonStoreModule } from './shared/service/common-store.module';
import { HttpApiInterceptor } from './shared/config';
import { AppRoutingModule } from './router/app-routing.module';
import { CommonModule } from '@angular/common';
import { MainModule } from './shared/modules/main.module';

declare global {
  interface Window { analytics: any; }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminPageComponent,
    NavbarComponent
  ],
  imports: [
    MainModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NavbarModule,
    RouterModule,
    BrowserModule.withServerTransition({ appId: 'angular-frontend' }),
    FormsModule,
    CommonStoreModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

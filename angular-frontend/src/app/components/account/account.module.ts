import { CoreModule } from './../../shared/modules/core.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
  ],
  exports: [
    LoginComponent
  ],
  // providers: [AuthStore]
})
export class AccountModule { }

import { CoreModule } from './../../shared/modules/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';



@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class UserModule { }

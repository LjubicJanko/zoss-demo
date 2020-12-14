import { UserPageComponent } from './../components/user/user-page/user-page.component';

import { HomeComponent } from './../components/home/home.component';
import { Routes } from '@angular/router';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { LoginComponent } from '../components/account/login/login.component';
import { NotAdminGuard } from './guards/not-admin-guard';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'admin',
      component: AdminPageComponent,
      canActivate: [NotAdminGuard]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'user',
      component: UserPageComponent
    }
  ];
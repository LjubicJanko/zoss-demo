import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin-guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { NotAdminGuard } from './guards/not-admin-guard';
import { routes } from './routes';



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoggedInGuard,
    LoggedOutGuard,
    AdminGuard,
    NotAdminGuard
  ]
})
export class AppRoutingModule { }

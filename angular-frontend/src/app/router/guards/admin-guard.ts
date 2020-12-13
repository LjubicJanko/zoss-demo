import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SiteRoutes } from "src/app/shared/constants";
import { AuthQuery } from "src/app/shared/service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authQuery: AuthQuery,
    private router: Router
  ) {}

  /**
   * Check if user is an admin in, if he is
   * redirect him to admin page 
   * @param next {ActivatedRouteSnapshot}
   * @param state {RouterStateSnapshot}
   * @returns boolean
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create((observer) => {
      this.authQuery.isAdmin$.subscribe((isAdmin) => {
        if (isAdmin) {
          this.router.navigate([SiteRoutes.ADMIN]);
        }
        observer.next(!isAdmin);
      });
    });
  }
}
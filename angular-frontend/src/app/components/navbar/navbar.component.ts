import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, AuthQuery } from '../../shared/service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  role: string;
  admin: boolean;
  firstName: string;

  isLoggedInSub: Subscription;
  roleSub: Subscription;
  isAdminInSub: Subscription;
  userSub: Subscription;

  constructor(private auth: AuthService,
    private router: Router,
    private authQuery: AuthQuery) { }

  ngOnInit() {

    this.isLoggedInSub = this.authQuery.isLoggedIn$.subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });

    this.roleSub = this.authQuery.role$.subscribe((role) => {
      this.role = role;
    })

    this.isAdminInSub = this.authQuery.isAdmin$.subscribe((admin) => {
      this.admin = admin
    })
    if (this.loggedIn) {
      this.userSub = this.authQuery.user$.subscribe((user) => {
        if(user != null) {
          this.firstName = user.firstName;
        }
      })
    }
  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
    this.router.navigate(['/'])
  }

  isAdmin() {
    return this.role === "ROLE_ADMIN";
  }

  isUser() {
    return this.role === "ROLE_REGISTERED";
  }

  isRegistrationPage() {
    return this.router.url === "/register";
  }

  isLoginPage() {
    return this.router.url === "/login";
  }
}

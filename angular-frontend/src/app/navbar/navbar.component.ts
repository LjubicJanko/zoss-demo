import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, AuthQuery } from '../service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  role: string;
  admin: boolean;

  isLoggedInSub: Subscription;
  roleSub: Subscription;
  isAdminInSub: Subscription;

  constructor(private auth: AuthService,
    private router: Router,
    private authQuery: AuthQuery) { }

  ngOnInit() {

    this.role = "ROLE_USER";

    this.roleSub = this.authQuery.role$.subscribe((role) => {
      this.role = role;
      if(this.role == 'ROLE_USER' || this.role == 'ROLE_ADMIN') {
        this.loggedIn = true;
      }
    })

    this.isAdminInSub = this.authQuery.isAdmin$.subscribe((admin) => {
      this.admin = admin
    })
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
    return this.role === "ROLE_USER";
  }
}

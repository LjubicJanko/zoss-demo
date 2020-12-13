import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthQuery } from 'src/app/shared/service';
import { UserService } from 'src/app/shared/service/users.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: any;
  userSub: Subscription;

  constructor(
    private userService: UserService,
    private authQuery: AuthQuery,
    private router: Router) { }

  ngOnInit() {
    this.userSub = this.authQuery.user$.subscribe((user) => {
      this.user = user
    })
  }

}

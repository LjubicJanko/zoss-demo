import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthQuery, AuthStore } from '../service';
import { UserService } from '../service/users.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

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

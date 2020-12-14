import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
  userId: any;
  newComment: string = '';

  userSub: Subscription;
  commentsSub: Subscription;
  newCommentSub: Subscription;

  comments: any;

  constructor(
    private userService: UserService,
    private authQuery: AuthQuery,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.commentsSub = this.userService.getComments(this.userId).subscribe((comments) => {
      this.comments = comments;
    })

    this.userSub = this.authQuery.user$.subscribe((user) => {
      this.user = user
      if(user != null) {
        this.userId = user.id;
      }
    })

  }

  isThereAComment() {
    return this.newComment.length === 0;
  }


  submitComment() {
    console.log(this.userId);
    const addCommentDto = {
      userId: this.userId,
      content: this.newComment
    }
    this.newCommentSub = this.userService.addComment(addCommentDto).subscribe((commentDto) => {
      console.log(commentDto);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthQuery } from 'src/app/shared/service';
import { UserService } from 'src/app/shared/service/users.service';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';

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
    public dialog: MatDialog,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit() {
    
    this.getComments();

    this.userSub = this.authQuery.user$.subscribe((user) => {
      this.user = user
      if(user != null) {
        this.userId = user.id;
      }
    })

  }

  getComments() {
    this.commentsSub = this.userService.getComments(this.userId).subscribe((comments) => {
      this.comments = comments;
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
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: "You have successfully created a new comment",
        panelClass: ['snackbar-success']
      });
      console.log(commentDto);
      this.getComments();
      this.newComment = '';
    })
  }

}

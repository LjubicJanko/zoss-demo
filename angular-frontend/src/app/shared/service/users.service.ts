import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

const ENDPOINTS = {
  GET_ALL: '/user/all',
  GET_COMMENTS: '/user/comments',
  ADD_COMMENTS: '/user/comment',
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  /**
   * @method constructor
   * @param http {HttpClient}
   */
  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<any> {
    return this.http.get<any>(ENDPOINTS.GET_ALL).pipe(
      tap((data) => {
        console.log(data.users);
      }, errorResponse => {
        console.log(errorResponse);
        alert(errorResponse);
      })
    );
  }
  getComments(id: any): Observable<any> {
    /* For unsecure version use unsecureUrl */
    const unsecureUrl = ENDPOINTS.GET_COMMENTS + '/' + id

    return this.http.get<any>(ENDPOINTS.GET_COMMENTS).pipe(
      tap((data) => {
        console.log(data);
      })
    )
  }

  addComment(addComment: any): Observable<any> {
    console.log(addComment);
    return this.http.post<any>(ENDPOINTS.ADD_COMMENTS, addComment).pipe(
      tap((data) => {
        console.log(data);
      })
    )
  }



}

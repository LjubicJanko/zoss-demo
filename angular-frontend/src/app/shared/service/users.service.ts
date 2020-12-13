import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

const ENDPOINTS = {
  GET_ALL: '/user/all'
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



}

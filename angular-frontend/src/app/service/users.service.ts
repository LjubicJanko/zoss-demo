import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

const ENDPOINTS = {
  GET_ALL: '/public/users/all'
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
    const url = this.apiUrl + ENDPOINTS.GET_ALL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get<any>(url).pipe(
      tap((data) => {
        console.log(data.users);
      }, errorResponse => {
        alert(errorResponse);
      })
    );
  }


}

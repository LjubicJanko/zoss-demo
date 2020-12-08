import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { AuthStore } from './auth.store';

const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  /**
   * @method constructor
   * @param http {HttpClient}
   */
  constructor(
    private http: HttpClient,
    private authStore: AuthStore,
  ) { }

  /**
   * Send HTTP Request and login user to the application
   * Save token to the localstorage
   * @method login
   * @param data {any}
   * @returns Observable<any>
   */
  login(username, password): Observable<any> {
    console.log(username)
    let data = {'username' : username, 'password' : password}
    const url = this.apiUrl + ENDPOINTS.LOGIN;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>(url, data).pipe(
      tap((data) => {
        let user = {
          id: data.id,
          username : data.username,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          enabled: data.enabled,
          authority: data.authorities[0]
        }
        this.authStore.update((state) => ({
          token: data.accessToken
        }));   
        this.authStore.update((state) => ({
          user: user
        }));   
      }, errorResponse => {
        this.showErrorFromBackend_login(errorResponse);
      })
    );
  }


  /**
   * Logout user
   * Clear auth data from the localstorage
   * @method logout
   * @returns void
   */
    logout() {
      this.authStore.update({
        token: null,
        user: null
      })
    }

  showErrorFromBackend_login(errorResponse) {
    if (errorResponse.error.message != null) {
      if (errorResponse.error.message.startsWith("Bad credentials")) {
        alert("Bad credentials");
      }
    }
  }

  showErrorFromBackend_register(errorResponse) {
    if (errorResponse.error != null) {
      if (errorResponse.error.startsWith("Username already exist")) {
        alert("Username already exist");
      }
    }
  }

}

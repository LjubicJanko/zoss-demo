import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { AuthStore } from './auth.store';
import { LoginDto } from '../../model/dto/LoginDto';

const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/user/me',
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
  login(loginDto: LoginDto): Observable<any> {
    console.log(loginDto);

    return this.http.post(ENDPOINTS.LOGIN, loginDto).pipe(
      tap((data: { accessToken: string }) => {
        console.log(data)
        this.authStore.update((state) => ({
          token: data.accessToken
        }));   
      }, errorResponse =>{
        this.showErrorFromBackend_login(errorResponse);  
      })
    ).pipe(
      tap(() => {
        this.http.get<any>(ENDPOINTS.ME).subscribe(
          res => {
            let userFromResponse = {
              username: res.username,
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email,
              authority: res.authorities[0].authority
            }
            this.authStore.update((state) => ({
              user: userFromResponse
            }))
          }) 
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

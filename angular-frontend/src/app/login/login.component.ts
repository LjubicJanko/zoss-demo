import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.scss']
})

export class LoginComponent {

  inputFields = {
    username: '',
    password: ''
  };

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  
  ngOnInit() {
  }

  onKey(value: string) {
    alert(value)
  }

  /**
   * Submits form to the server
   * @method login
   * @returns void
   */
  login(): void {
    if (this.inputFields.username == '' || this.inputFields.password == '') {
      return;
    }

    this.authService.login(this.inputFields.username, this.inputFields.password).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  /**
   * Get error message
   * @method getErrorMessage
   * @param fieldName
   * @returns string
   */
  // getErrorMessage(fieldName) {
  //   if (this[fieldName].hasError('required')) {
  //     return `VALIDATION.${fieldName.toUpperCase()}_REQUIRED`;
  //   }
  //   return '';
  // }

}

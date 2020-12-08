import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  url = environment.apiUrl + '/public/hello-world';

  constructor(private http: HttpClient) {
     
  }

  helloWorld() {
    this.sendRequest()
      .subscribe(res => {
        console.log(res);
      }); 
  }

  sendRequest(): Observable<any> {
    return this.http.get(this.url, {responseType: 'text'}); 
  }
}

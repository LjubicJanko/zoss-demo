import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    AppModule,
    AkitaNgDevtools.forRoot(),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }

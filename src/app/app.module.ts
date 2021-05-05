import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionModule } from './session/session.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { QuillModule } from 'ngx-quill';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { Ng5BreadcrumbModule, BreadcrumbService } from 'ng5-breadcrumb';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SessionModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    LoadingBarRouterModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    QuillModule.forRoot(),
    Ng5BreadcrumbModule.forRoot()
  ],
  providers: [HttpClient, BreadcrumbService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signUp/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SessionRoutingModule } from './session-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SessionComponent } from './session.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    SessionComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    RouterModule ,			
    MatButtonModule ,		
    MatCardModule ,			
    MatCheckboxModule ,		
    MatDividerModule ,		
    MatFormFieldModule ,	
    MatIconModule ,			
    MatInputModule ,		
    MatToolbarModule ,		
    ToastrModule ,			
    FlexLayoutModule ,		
    SlickCarouselModule ,	
    FormsModule,
    ReactiveFormsModule ,	
    SessionRoutingModule,
    LoadingBarRouterModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [HttpClient],
  exports:[
    
  ]
})
export class SessionModule { }

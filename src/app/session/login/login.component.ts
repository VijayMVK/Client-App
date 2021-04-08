import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { AuthService } from 'src/app/service/auth.service';
import { HelperService } from '../../service/helper.service';

@Component({
   selector: 'login',
   templateUrl:'./login.component.html',
   styleUrls: ['./login.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

   email    : string = "";
   password : string = "";
   login_error_message : string = "";
   @ViewChild('slickModal') slickModal:any =  SlickCarouselComponent;
   
   slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"autoplay": true, "autoplaySpeed": 1000,"dots":false,"arrows":false};

   sessionSlider : any [] = [
      {
         image : "assets/img/login-slider1.jpg",
         name  : "First slide",
         designation : "CEO-Gene",
         content : "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
      },
      {
         image : "assets/img/login-slider2.jpg",
         name  : "Second slide",
         designation : "Designer",
         content : "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
      },
      {
         image : "assets/img/login-slider3.jpg",
         name  : "Anna Smith",
         designation : "Managing Director",
         content : "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
      }
   ]

  constructor(public authService: AuthService, private route: Router, private helper: HelperService)
   { 
      this.isValidSession();
   }

   isValidSession(){
      this.authService.isValidSession(this.email,this.password).then((data)=>{
         if(data){
            this.route.navigate(["/home"]);
         }
      })
   }

   // when email and password is correct, user logged in.
   login(value:string) {
      this.authService.loginUser(this.email,this.password).then((data)=>{
         if(data ){
           if (data.IsAccountActive){
             this.route.navigate(["/home"]);
             this.helper.AddToLocalStorage(JSON.stringify(data), "BranchInfo")
            }
            else{
               this.login_error_message = "Account is not activated. Please activate the account";
            }
         }
         else{
            this.login_error_message = "Invalid Username or Password";
         }
      })
   }
}




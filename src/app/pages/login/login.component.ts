import { AppUserService } from './../../app-user.service';
import { Router , ActivatedRoute} from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
   providers:[AppUserService]
})
export class Login implements OnInit {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public returnUrl: string;
  public userData: {};

  constructor(fb:FormBuilder, @Inject(AuthService) private authService:AuthService, private route: ActivatedRoute,
        private router: Router, private appUserService:AppUserService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
        // reset login status
        console.log(this.router.url);
        if (this.router.url.indexOf('login') > 0 && window.sessionStorage.getItem('username')) {
            this.router.navigate([this.returnUrl]);
        }else{
          this.authService.logout();
        }
 
        // get return url from route parameters or default to '/'
        
    }
  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
   
      // your code goes here
       console.log(values);
       let jsonPayload = {name:values['email'],pass:values['password'] };
      this.authService.login(jsonPayload).then(data => {
            console.log(data.json())
            data = data.json();
            //this.userData = data;
            this.setUserSession(data);
            //this.getCurrentUser();
            this.router.navigate([this.returnUrl]);
       });
    }
  }

getCurrentUser (){

  this.appUserService.getUser().then(data=>{
      this.userData = data.json();
      console.log(this.userData)
      window.sessionStorage.setItem('loggedInUser',JSON.stringify(this.userData))
    })
}
setUserSession(user){
  window.sessionStorage.setItem('current_user',JSON.stringify(user));
}

getCurrentUserSession(){
  return window.sessionStorage.getItem('current_user');
}

}

import { AppUserService } from './../../../app-user.service';
import { AuthService } from './../../../auth.service';
import { environment } from './../../../../environments/environment';
import { Component, Inject, OnInit } from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
  providers:[AppUserService]
})
export class BaPageTop implements OnInit{
  public appTitle = environment.app_title;
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public userData = {};

  constructor(private _state:GlobalState, @Inject(AuthService) private authService:AuthService, 
  @Inject(AppUserService) private appUserService:AppUserService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  ngOnInit() {
    this.getUser();
  }
  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public logout() {
   this.authService.logout();
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

   getUser(){
    console.log('loggedInUser')
    
    let currentUser = window.sessionStorage.getItem('current_user');
    if(currentUser){
       console.log(currentUser)
    this.userData = JSON.parse(currentUser);
  }else{
      let user = {current_user:{name:''}};
       this.userData=user;
    }
   
    
   }
}

import { Injectable, Inject, forwardRef } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';


import { EventBrokerService } from './event.broker.service';

@Injectable()
export class AuthService {

    appUserService: any;
    isLoggedIn: Subject<boolean>;
    isLogin: boolean = false;

    // store the URL so we can redirect after logging in
    redirectUrl: any;

    constructor(private router: Router, private http: Http, private _eventBroker: EventBrokerService) {
        const that = this;
        that.isLoggedIn = new Subject<boolean>();

    }

    login(postData): Promise<any> {
        const that = this;
        
       // const headers = new Headers({ 'Content-Type': 'application/hal+json' });

        const headers = new Headers({ 
          'Content-Type': 'application/hal+json',  
          /*'Accept':'application/json',*/
          /*'Authorization':'Basic YWRtaW46RGlhbEAwNTIy'*/
        
      });
      console.log(postData);
        return new Promise(function (resolve, reject) {
            const POST_USER_LOGIN = 'http://www.dialmarts.com/dms/user/login?_format=hal_json';
            that.http.post(POST_USER_LOGIN, postData, { headers })
                .subscribe(
                (data: any) => {
                    resolve(data);
                },
                err => {
                    reject(err);
                    console.log("failed calling the api");
                    that.isLogin = false;
                },
            );
        });
    }

    clearSession():void{
        window.sessionStorage.clear();
    }
    logout(): void {
        // TODO: invalidate _sso token by calling logout webservice on server
        this.clearSession();
        this.isLoggedIn.next(false);
        this.isLogin = false;
        this.redirectUrl = null;
        this.redirectToLogin();
    }

    redirectToLogin(): void {
        this.router.navigate(['login']);
    }

    redirectToTarget(): void {
        if (this.redirectUrl && this.redirectUrl === '/') {
            this.redirectUrl = null;
        }

        // If no redirect has been set, use the default
        const redirect = this.redirectUrl ? this.redirectUrl : 'dashboard';

        // Redirect the user
        this.router.navigate([redirect]);
    }

    isAccessible(url: string): Observable<boolean> {
        const that = this;
        if (url.indexOf('login') > 0) {
            return Observable.of(true);
        }

        if (!this.isLogin) {
            this.redirectUrl = url;
            return Observable.of(false);
        }
        
        return Observable.of(true);

        // return this.appUserService.isAccessible(url.slice(1));
    }

    
}

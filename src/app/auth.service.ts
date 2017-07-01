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

    login(user: string, pass: string): Promise<any> {
        const that = this;
        const postData = 'username=' + user + '&password=' + pass;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return new Promise(function (resolve, reject) {
            const POST_USER_LOGIN = '/';
            that.http.post(POST_USER_LOGIN, postData, { headers })
                .subscribe(
                (data: any) => {

                    resolve(data);
                },
                err => {
                    reject(err);
                    that.isLogin = false;
                },
            );
        });
    }

    logout(): void {
        // TODO: invalidate _sso token by calling logout webservice on server
        // this.appUserService.clearSession();
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

    getAccessPermission(routePath: string) {
        return this.appUserService.getAccessPermission(routePath.slice(1));
    }
}

import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(Router) private router: Router, @Inject(AuthService) private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const url: string = state.url;
        const source = this.authService.isAccessible(url);
        const sub = source.subscribe (isAccessible => {
            if (!isAccessible) {
                alert('you are not allowed to access thispage');

                /*window.location.href = "/" + window.sessionStorage.getItem('appName') + "/logout";
                window.sessionStorage.clear();*/
            }
        });
        return source;
    }
}

import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(Router) private router: Router, @Inject(AuthService) private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const url: string = state.url;
        if(window.sessionStorage.getItem('username')) {
            return true;
        }
         // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: url }});
        window.sessionStorage.clear()
        return false;

    }
}

import { Headers, Http } from '@angular/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AppUserService {

  constructor(private authService:AuthService, private http: Http) { }

  getUser():Promise<any> {
    
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const that = this;
     return new Promise(function (resolve, reject) {
            const url = 'http://localhost:8080/api/user';

            that.http.get(url, { headers })
                .subscribe(
                (data: any) => {

                    resolve(data);
                },
                err => {
                    reject(err);
                    console.log("failed calling the api");
                    
                },
            );
        });
  }

}

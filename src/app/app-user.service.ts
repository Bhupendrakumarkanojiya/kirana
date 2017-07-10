import { Headers, Http } from '@angular/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AppUserService {

  constructor(private authService:AuthService, private http: Http) { }

  getUser():Promise<any> {
    
    const headers = new Headers({  });
    const that = this;
     return new Promise(function (resolve, reject) {
        let user = JSON.parse(window.sessionStorage.getItem('current_user'));
            console.log(user.current_user.uid)
       
            const url = 'http://www.dialmarts.com/dms/user/'+user.current_user.uid+'?_format=hal_json';
            console.log("accessing: "+url)
            that.http.get(url, { headers })
                .subscribe(
                (data: any) => {
                    console.log(data);
                    resolve(data);
                    console.log("accessing: success")
                },
                err => {
                    reject(err);
                    console.log("failed calling the api");
                    
                },
            );
        });
  }

}

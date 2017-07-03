import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterService {

  constructor(private http:Http) { }

  
  createShop(payload:string): Promise<any> {
        const that = this;
        const headers = new Headers({ 
          'Content-Type': 'application/hal+json',  
          'Accept':'application/json',
          'Authorization':'Basic YWRtaW46RGlhbEAwNTIy'
        
      });

        return new Promise(function (resolve, reject) {
            const POST_USER_LOGIN = 'http://www.dialmarts.com/dms/entity/user?_format=hal_json';
            that.http.post(POST_USER_LOGIN, payload, { headers })
                .subscribe(
                (data: any) => {
                    console.log("data posted")
                    resolve(data);
                },
                err => {
                    reject(err);
                    console.log("failed calling the api"+ err);
                    
                },
            );
        });
    }
}

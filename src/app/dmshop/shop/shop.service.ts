import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ShopService {

  constructor(private http: Http) { }


getShopList(){

 const headers = new Headers({  });
    const that = this;
     return new Promise(function (resolve, reject) {
       
            console.log('getting shop list')
       
            const url = 'http://www.dialmarts.com/dms/shopslistjson';
            console.log("accessing: "+url)
            that.http.get(url, { headers })
                .subscribe(
                (data: any) => {
                    
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

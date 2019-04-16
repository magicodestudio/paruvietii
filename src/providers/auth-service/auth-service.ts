import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

let registerurl = "http://my.scripting.work/haircode/request.php";
let loginurl = "http://my.scripting.work/haircode/authlogin.php";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      	let headers = new Headers();
      	let posturl = "";

      	switch (type) {
      		case 'signup':
      			posturl = registerurl;
      		break;
      		case 'signin':
      			posturl = loginurl;
      		break;
      	}


      	this.http.post(posturl, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          	resolve(res.json());
        }, (err) => {
          	reject(err);
        });



    });

  }

}

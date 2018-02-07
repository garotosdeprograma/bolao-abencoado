import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from './models/user';
import { URL_API } from './constant/api';


@Injectable()
export class LoginService {

  private url: string;

  constructor(private http: Http) {
    this.url = URL_API + 'auth/login';
  }

  private extract(res: Response) {
    return res.json();
  }

  login(user: User): Promise<any> {
    // const headers = new Headers({'Content-Type': 'application/json'});
    console.log(this.extract);
    return this.http.post(this.url, user)
      .map(this.extract)
      .toPromise();
  }
}

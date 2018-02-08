import { Injectable } from '@angular/core';
import {  CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { STORED_TOKEN } from './constant/local-storage';

@Injectable()
export class AdminGuard implements CanLoad {

  constructor(private router: Router) {}

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    console.log(localStorage.getItem(STORED_TOKEN));
    if (!!localStorage.getItem(STORED_TOKEN)) {
      return true;
    }
    this.router.navigate(['redirectToRoot']);
    return false;
  }
}

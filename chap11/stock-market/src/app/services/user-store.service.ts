import { Injectable } from '@angular/core';

@Injectable()
export class UserStoreService {

  private _token: string = null;
  constructor() {
    console.log('UserStoreService::constructor');
  }

  set token(token: string) {
    console.log('UserStoreService::set token', token);
    this._token = token;
  }

  get token() {
    console.log('UserStoreService::get token', this._token);
    return this._token;
  }

  isLoggedIn() {
    console.log('UserStoreService::isLoggedIn()', this._token);
    return this._token != null;
  }

}

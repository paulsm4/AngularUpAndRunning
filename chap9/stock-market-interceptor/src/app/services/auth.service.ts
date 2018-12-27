import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public authToken = '';

  constructor() {
    console.log('AuthService::constructor()', this.authToken);
   }
}

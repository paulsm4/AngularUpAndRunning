import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userStore: UserStoreService,
    private router: Router) {
    console.log('AuthGuard::constructor');
  }

  canActivate (): boolean {
    console.log('AuthGuard::canActivate');
    if (this.userStore.isLoggedIn()) {
       return true;
    } else {
      console.error('AuthGuard#canActivate not authorized to access page');
      this.router.navigate(['login']);
      return false;
      }
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from './user-store.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private userStore: UserStoreService,
    private router: Router) {
    console.log('AuthGuardService::constructor()');
  }

  canActivate(): boolean {
    console.log('AuthGuardService::canActivate()');
    if (this.userStore.isLoggedIn()) {
      console.log('AuthGuardService#canActivate: AUTHORIZED');
       return true;
    } else {
      console.log('AuthGuardService#canActivate NOT AUTHORIZED to access page');
      // Can store current route and redirect back to it
      // Store it in a service, add it to a query param
      this.router.navigate(['login']);
      return false;
    }
  }
}

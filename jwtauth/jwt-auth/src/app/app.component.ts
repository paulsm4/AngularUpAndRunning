import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
    currentUser: User;
    title: 'jwt-auth';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        console.log('AppComponent::constructor()');
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
      console.log('AppComponent::logout()', this.authenticationService, this.router);
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}

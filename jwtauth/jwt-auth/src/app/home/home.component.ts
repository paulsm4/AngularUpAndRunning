import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  templateUrl: 'home.component.html'
})
// /* tslint:disable use-lifecycle-interface */  // NOT USED
export class HomeComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit() {
      console.log('HomeComponent::ngOnInit()');
      this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}

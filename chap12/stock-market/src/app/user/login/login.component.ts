import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /* tslint:disable no-inferrable-types */
  public username: string = '';
  public password: string = '';
  public message: string = '';

  constructor(private userService: UserService,
              private router: Router) {
    console.log('LoginComponent::constructor()');
  }

  login() {
    console.log('LoginComponent::login()');
    this.userService.login(this.username, this.password)
      .subscribe((resp) => {
        console.log('Successfully logged in');
        this.message = resp.msg;
        this.router.navigate(['stock', 'list'], {queryParams: {page: 1}});
      }, (err) => {
        console.error('Error logging in', err);
        this.message = err.error.msg;
      });
  }
}

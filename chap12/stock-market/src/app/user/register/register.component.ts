import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  /* tslint:disable no-inferrable-types */
  public username: string = '';
  public password: string = '';
  public message: string = '';

  constructor(private userService: UserService,
              private router: Router) {
    console.log('RegisterComponent::constructor()');
   }

  register() {
    console.log('RegisterComponent::register()');
    this.userService.register(this.username, this.password)
      .subscribe((resp) => {
        console.log('Successfully registered');
        this.message = resp.msg;
        this.router.navigate(['user', 'login']);
      }, (err) => {
        console.error('Error registering', err);
        this.message = err.error.msg;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import User from '../models/User';
import IUser from '../models/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  id = '';
  mdp = '';

  user: IUser;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.id, this.mdp)
      .subscribe(users => {
        this.user = users[0];
      });
  }
}
export class LoginPageModule {}
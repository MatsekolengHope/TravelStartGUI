import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared-service/user.service';
import { Router } from '@angular/router';
import { BookService } from '../../shared-service/book.service';
import { User } from '../../model-classes/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private user: User;
  private loginError: String = null;
  constructor(private _userService: UserService, private _router: Router, private _bookService: BookService) { }

  ngOnInit() {
    this.user = this._userService.getter();
  }

  onSubmit = function (user) {
    this._userService.login(user.email, user.password).subscribe((user) => {
      console.log(user);
      this.user = user;
      if (this.user.id == null) {
        this.loginError = 'Active';
        this._router.navigate(['/sign-in']);
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        if (this.user.role == 'Admin') {
          this._router.navigate(['/admin-profile']);
        }
        if (this.user.role == 'CarAdmin') {
          this._router.navigate(['/car-admin-profile']);
        }
        if (this.user.role == 'HotelAdmin') {
          this._router.navigate(['/hotel-admin-profile']);
        } 
        if (this.user.role == 'Traveller') {
          this._router.navigate(['/traveller-profile']);
        }

      }
    }, (error) => {
      console.log(error);
    });
  }

}

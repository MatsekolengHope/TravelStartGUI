import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared-service/user.service';
import { Router } from '@angular/router';
import { BookService } from '../../shared-service/book.service';
import { User } from '../../model-classes/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private user: User;
  private users: User[];
  constructor(private _userService: UserService, private _router: Router, private _bookService: BookService,
  private _matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this._userService.getter(); 
    this._userService.getUsers().subscribe((users) => {
      this.users = users;
    }, (error) => {
      console.log(error);
    });

  }

  onSubmit = function (user) {
    this._userService.login(user.email, user.password).subscribe((user) => {
      console.log(user);
      this.user = user;
      if (this.user.id == null) {
        this._router.navigate(['/sign-in']);
        this.openDialog("Incorrect email address or password. Please try again");
      } else {

        this.openDialog("You have successfully logged in");
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

  forgotPassword(email) {
    this.openDialog("Sorry we couldn't find the provided email address in our database, please try again.");
  }

  openDialog(text: string) {
    this._matSnackBar.open(text, 'Ok', {
      duration: 10000,
      verticalPosition: 'top'
    });
  }
}

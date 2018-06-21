import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared-service/user.service';
import { Router } from '@angular/router';
import { BookService } from '../../shared-service/book.service';
import { Traveller } from '../../model-classes/traveller';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  private traveller: Traveller;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    //localStorage.setItem('user', user);
  }

  onSubmit = function (user) {
    localStorage.clear();
    sessionStorage.clear();
    this._userService.createTraveller(user).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user);
      this._router.navigate(['/traveller-profile']);
  }, (error) => {
     console.log(error);
    });
  }
}

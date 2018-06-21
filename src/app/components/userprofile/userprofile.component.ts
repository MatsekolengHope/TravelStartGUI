import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared-service/user.service';
import { Router } from '@angular/router';
import { BookService } from '../../shared-service/book.service';
import { User } from '../../model-classes/user';
import { Flight } from '../../model-classes/flight';
import { BookFlight } from '../../model-classes/book-flight';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  private user: User;
  private u: User = JSON.parse(localStorage.getItem('user'));
  private bookStatus: String;
  private selectedFlight: Flight;
  private noOfAdults: number;
  private noOfChildren: number;
  private myBookings: BookFlight[];

  constructor(private _userService: UserService, private _router: Router, private _bookService: BookService) { }

  ngOnInit() {
    this.user = this._userService.getter();
    this.u = new User();
    this.displayUser();
    this.displayFlight();
    
    console.log(this.u);
    this.bookStatus = JSON.parse(localStorage.getItem('bookStatus'));
    this.noOfChildren = JSON.parse(localStorage.getItem('noOfChildren'));
    this.noOfAdults = JSON.parse(localStorage.getItem('noOfAdults')); 
    
    this._bookService.myBookings(this.u.id).subscribe((myBookings) => {
      this.myBookings = myBookings;
      //localStorage.setItem('myBookings', JSON.stringify(myBookings));
      console.log(this.myBookings);
    }, (error) => {
      console.log(error);
    });
  }

 
  displayUser() {
    if (localStorage.getItem('user') !== null) {
      this.u = JSON.parse(localStorage.getItem('user'));
    } else {
      alert('Please log in first');
      this._router.navigate(['/sign-in']);
    }
  }

  displayFlight() { 
    if (localStorage.getItem('selectedFlight') !== null) {
      this.selectedFlight = JSON.parse(localStorage.getItem('selectedFlight'));
      console.log(this.selectedFlight);
    }
  }

  signOut() {
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigate(['/sign-in']);
  }

  confirmBooking(){

  }

  
}

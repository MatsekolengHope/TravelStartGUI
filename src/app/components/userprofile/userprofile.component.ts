import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared-service/user.service';
import { Router } from '@angular/router';
import { BookService } from '../../shared-service/book.service';
import { User } from '../../model-classes/user';
import { Flight } from '../../model-classes/flight';
import { BookFlight } from '../../model-classes/book-flight';
import { FlightTicket } from '../../model-classes/flight-ticket';
import { Address } from '../../model-classes/address';
import { MatSnackBar } from '@angular/material';

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

  private flightTickets: FlightTicket[];
  private addresses: Address[];

  constructor(private _userService: UserService, private _router: Router, private _bookService: BookService,
    private _matSnackBar: MatSnackBar) { }

  ngOnInit() {

    this._matSnackBar.open('You have successfully registered', 'Ok', {
      duration: 10000,
      verticalPosition: 'top'
    });

    this.user = this._userService.getter();
    this.u = new User();
    this.displayUser();
    this.displayFlight();

    this.flightTickets = this.u.flightTickets;
    this.addresses = this.u.addresses; 
    
    console.log(this.u);
    console.log(this.addresses);
    console.log(this.flightTickets);

    localStorage.setItem('flightTickets', JSON.stringify(this.flightTickets));

    this.bookStatus = JSON.parse(localStorage.getItem('bookStatus'));
    this.noOfChildren = JSON.parse(localStorage.getItem('noOfChildren'));
    this.noOfAdults = JSON.parse(localStorage.getItem('noOfAdults')); 
    
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

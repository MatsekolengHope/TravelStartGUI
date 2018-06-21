import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../shared-service/flight.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Flight } from '../../model-classes/flight';
import { User } from '../../model-classes/user';
import { BookService } from '../../shared-service/book.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  private flight: Flight;
  private user: User;
  private selectedFlight: Flight;
  private noOfAdults: number = null;
  private noOfChildren: number = null;
  private r: boolean;

  constructor(private _flightService: FlightService, private _router: Router, private _bookService: BookService) { }

  ngOnInit() {
    this.displayFlight();
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  displayFlight() {
    if (localStorage.getItem('selectedFlight') !== null) {
      this.selectedFlight = JSON.parse(localStorage.getItem('selectedFlight'));
    } else {
      alert('No available searched flights, please search again.');
      this._router.navigate(['/']);
    }
  }

  onSubmit(data) {

    console.log(data);

    this.noOfChildren = data.noOfChildren;
    this.noOfAdults = data.noOfAdults;

    console.log(this.noOfChildren, this.noOfAdults);
    console.log(this.user);
    console.log(this.selectedFlight);

    sessionStorage.setItem('bookStatus', JSON.stringify('active'));

    if (this.user == null) {
      this.r = confirm('Please sign in to confirm your booking');
      if (this.r == true) {
        this._router.navigate(['/sign-in']);
      }
    } else {
      this._router.navigate(['/book']); 
    }
  }

  
}

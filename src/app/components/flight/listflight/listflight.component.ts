import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../../../model-classes/flight';
import { BookFlight } from '../../../model-classes/book-flight';
import { User } from '../../../model-classes/user';
import { FlightService } from '../../../shared-service/flight.service';
import { BookService } from '../../../shared-service/book.service';

@Component({
  selector: 'app-listflight',
  templateUrl: './listflight.component.html',
  styleUrls: ['./listflight.component.css']
})
export class ListflightComponent implements OnInit {
  private flights: Flight[];

  private flight: Flight = new Flight;

  private specificFlightBooks: BookFlight[];

  private FlightUpdate: String = null;

  private user: User = JSON.parse(localStorage.getItem('user'));
  private myBookings: BookFlight[];
  private travellersBooked: User[] = [];

  constructor(private _flightService: FlightService, private _router: Router, private _bookService: BookService) { }

  ngOnInit() {
    this._flightService.getFlights().subscribe((flights) => {
      console.log(flights);
      this.flights = flights;
    }, (error) => {
      console.log(error);
    });
  }

  delete(flight: Flight) {
    if (confirm('Are you sure you want to delete the record fron the database?') == true) {
      this._flightService.deleteFlight(flight).subscribe((flight) => {
      }, (error) => {
        console.log(error);
      });
      this._bookService.myBookings(this.user.id).subscribe((myBookings) => {
        this.myBookings = myBookings;
        //localStorage.setItem('myBookings', JSON.stringify(myBookings));
      }, (error) => {
        console.log(error);
      });
      this._router.navigate(['/admin-profile']);
    }
    window.location.reload();
  } 
  
  update(flight: Flight) {
    console.log('Update method works!');
    this.FlightUpdate = "Show Update Form"
    this.flight = flight;
    console.log(flight);
    this._flightService.deleteFlight(flight);
  }

  addFlight = function (flight) {
    this._flightService.createFlight(flight).subscribe((flight) => {
      console.log(flight);
    }, (error) => {
      console.log(error);
    });
    this.cancel();
  }

  viewBookings(flight: Flight){
    sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('Bookings'));

    window.location.reload();

     this._bookService.specificFlightBooks(flight.id).subscribe((specificFlightBooks) => {
      this.specificFlightBooks = specificFlightBooks;
      console.log(flight.id);
      sessionStorage.setItem('specificFlightBooks', JSON.stringify(this.specificFlightBooks));
    }, (error) => {
      console.log(error);
    });

    this._bookService.travellersSeatBooked(flight.id).subscribe((travellersBooked) => {
      this.travellersBooked = travellersBooked;
      sessionStorage.setItem('travellersBooked', JSON.stringify(this.travellersBooked));
      console.log(travellersBooked);
    }, (error) => {
      console.log(error);
    });
  }

  cancel(){
    this.FlightUpdate = null;
  }
}

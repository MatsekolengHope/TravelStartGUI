import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../shared-service/flight.service';
import { Router } from '@angular/router';
import { Flight } from '../../model-classes/flight';

@Component({
  selector: 'app-searched-flights',
  templateUrl: './searched-flights.component.html',
  styleUrls: ['./searched-flights.component.css']
})
export class SearchedFlightsComponent implements OnInit {
  private flight: Flight;
  private selectedFlight: Flight;
  private flights: Flight[] = [];
  private searchedFlights: Flight[];
  constructor(private _flightService: FlightService, private _router: Router) { }

  ngOnInit() {
    this.getAllFlights();
    this.searchedFlights = JSON.parse(localStorage.getItem('searchedFlights'));
  }

  onSubmit = function (flight) {
    this._flightService.searchFlights(flight.departurecity, flight.arrivalcity).subscribe((searchedFlights) => {
      this.searchedFlights = searchedFlights;
      localStorage.setItem('searchedFlights', JSON.stringify(this.searchedFlights));
      this._router.navigate(['/searched-flights']);
      console.log(this.searchedFlights);
    }, (error) => {
      console.log(error);
    });
    console.log(flight.noOfAdults+' '+flight.noOfChildren);
    sessionStorage.setItem('noOfAdults',JSON.stringify(flight.noOfAdults));
    sessionStorage.setItem('noOfChildren',JSON.stringify(flight.noOfChildren));
    sessionStorage.setItem('loop',JSON.stringify(flight.noOfChildren+flight.noOfAdults));
    sessionStorage.setItem('form',JSON.stringify(2));
  }

  selectedFlightFunction(selectedFlight: Flight){
    console.log(selectedFlight);
    localStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
    this._router.navigate(['/selected-flight']);
  }

  getAllFlights(){
    this._flightService.getFlights().subscribe((flights) => {
      console.log(flights);
      this.flights = flights;
    }, (error) => {
      console.log(error);
    });
  }
}

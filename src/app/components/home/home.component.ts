import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../shared-service/flight.service';
import { Router } from '@angular/router';
import { CarService } from '../../shared-service/car.service';
import { HotelService } from '../../shared-service/hotel.service';
import { Flight } from '../../model-classes/flight';
import { Car } from '../../model-classes/car';
import { Hotel } from '../../model-classes/hotel';

declare function require(path: String);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private flight: Flight;
  private flights: Flight[];
  private searchedFlights: Flight[];
  private searchedCars: Car[];
  private searchedHotels: Hotel[];

  private imageSource: String;
  private hotelImage: String;
  private carImage: String;

  //tabs
  private Flights: String;
  private Hotels: String;
  private Cars: String;
  private HomeSelectedTab: String;

  constructor(private _flightService: FlightService, private _router: Router, private _carService: CarService,
    private _hotelService: HotelService) { }

  ngOnInit() {

    this.imageSource = require('./img/flight-03.jpg');
    this.hotelImage = require('./img/holiday-inn-express-hotel.jpg');
    this.carImage = require('./img/Toyota_Yaris2.jpg');

    this.getAllFlights();

    if (JSON.parse(sessionStorage.getItem('HomeSelectedTab')) != null) {
      if (JSON.parse(sessionStorage.getItem('HomeSelectedTab')) == 'Flights') {
        this.Flights = 'Active';
        this.Cars = null;
        this.Hotels = null;
        sessionStorage.setItem('HomeSelectedTab', JSON.stringify('Flights'));
      }

      if (JSON.parse(sessionStorage.getItem('HomeSelectedTab')) == 'Cars') {
        this.Flights = null;
        this.Cars = 'Active';
        this.Hotels = null;
        sessionStorage.setItem('HomeSelectedTab', JSON.stringify('Cars'));
      }

      if (JSON.parse(sessionStorage.getItem('HomeSelectedTab')) == 'Hotels') {
        this.Flights = null;
        this.Cars = null;
        this.Hotels = 'Active';
        sessionStorage.setItem('HomeSelectedTab', JSON.stringify('Hotels'));
      }
    } else {
      this.Flights = 'Active';
    }

    this.HomeSelectedTab = JSON.parse(sessionStorage.getItem('HomeSelectedTab'));
    console.log('Current tab: ' + this.HomeSelectedTab);
  }

  onSubmit = function (data) {
    this._flightService.searchFlights(data.departurecity, data.arrivalcity).subscribe((searchedFlights) => {
      this.searchedFlights = searchedFlights;
      localStorage.setItem('searchedFlights', JSON.stringify(this.searchedFlights));
      this._router.navigate(['/searched-flights']);
      console.log(this.searchedFlights);
    }, (error) => {
      console.log(error);
    });
    console.log(data.noOfAdults+' '+data.noOfChildren);
    sessionStorage.setItem('noOfAdults',JSON.stringify(data.noOfAdults));
    sessionStorage.setItem('noOfChildren',JSON.stringify(data.noOfChildren));
    sessionStorage.setItem('loop',JSON.stringify(data.noOfChildren+data.noOfAdults));
    sessionStorage.setItem('form',JSON.stringify(2));
  }

  searchCar(car) {
    this._carService.searchCars(car.pickUpLocation, car.dropOffLocation).subscribe((searchedCars) => {
      this.searchedCars = searchedCars;
      localStorage.setItem('searchedCars', JSON.stringify(this.searchedCars));
      this._router.navigate(['/searched-cars']);
      console.log(this.searchedCars);

      sessionStorage.setItem('pickUpLocation', JSON.stringify(car.pickUpLocation));
      sessionStorage.setItem('dropOffLocation', JSON.stringify(car.dropOffLocation));
      sessionStorage.setItem('dropOffTime', JSON.stringify(car.dropOffTime));
      sessionStorage.setItem('pickUpTime', JSON.stringify(car.pickUpTime));
      sessionStorage.setItem('dropOffDate', JSON.stringify(car.dropOffDate));
      sessionStorage.setItem('pickUpDate', JSON.stringify(car.pickUpDate));

    }, (error) => {
      console.log(error);
    });
  }

  searchHotel(hotel) {
    this._hotelService.searchHotels(hotel.location).subscribe((searchedHotels) => {
      this.searchedHotels = searchedHotels;
      localStorage.setItem('searchedHotels', JSON.stringify(this.searchedHotels));
      sessionStorage.setItem('checkInDate', JSON.stringify(hotel.checkInDate));
      sessionStorage.setItem('checkOutDate', JSON.stringify(hotel.checkOutDate));
      console.log('ChecK in date: ' + hotel.checkInDate);
      this._router.navigate(['/searched-hotels']);
    }, (error) => {
      console.log(error);
    });
  }

  //Tab controller
  tabFunction(event) {

    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    if ('' + value == 'Flights') {
      this.Flights = 'Active';
      this.Cars = null;
      this.Hotels = null;
      sessionStorage.setItem('HomeSelectedTab', JSON.stringify('Flights'));
    }

    if ('' + value == 'Cars') {
      this.Flights = null;
      this.Cars = 'Active';
      this.Hotels = null;
      sessionStorage.setItem('HomeSelectedTab', JSON.stringify('Cars'));
    }

    if ('' + value == 'Hotels') {
      this.Flights = null;
      this.Cars = null;
      this.Hotels = 'Active';
      sessionStorage.setItem('HomeSelectedTab', JSON.stringify('Hotels'));
    }

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

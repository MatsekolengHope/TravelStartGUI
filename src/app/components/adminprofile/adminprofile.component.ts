import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared-service/user.service';
import { Router } from '@angular/router';
import { FlightService } from '../../shared-service/flight.service';
import { CarService } from '../../shared-service/car.service';
import { FunctionExpr } from '@angular/compiler';
import { HotelService } from '../../shared-service/hotel.service';
import { NgForm } from '@angular/forms';
import { Flight } from '../../model-classes/flight';
import { User } from '../../model-classes/user';
import { BookFlight } from '../../model-classes/book-flight';
import { Address } from '../../model-classes/address';
import { TravellerAddressService } from '../../shared-service/traveller-address.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  private flight: Flight;
  private user: User;
  private u: User;
  private message: String;

  private specificFlightBooks: BookFlight[] = [];
  private travellersBooked: User[];

  private names: String[];

  private addresses: Address[];
  private address: Address = new Address;

  constructor(private _userService: UserService, private _flightService: FlightService, private _router: Router,
    private _carService: CarService, private _travellerAddressService: TravellerAddressService) { }

  //tabs
  private FlightsAddition: String;
  private SavedFlights: String;
  private Profile: String;
  private Bookings: String;

  private AdminSelectedTab: String;

  private UpdateAddress: boolean = false;
  private UpdateProfile: boolean = false;

  ngOnInit() {

    this.user = this._userService.getter();

    this.u = new User();

    this.u = JSON.parse(localStorage.getItem('user'));

    this.getAddressesById(this.u.id);

    this.displayUser();

    this.specificFlightBooks = JSON.parse(sessionStorage.getItem('specificFlightBooks'));
    this.travellersBooked = JSON.parse(sessionStorage.getItem('travellersBooked'));

    console.log(this.travellersBooked);

    if (JSON.parse(sessionStorage.getItem('FlightsAdminSelectedTab')) != null) {
      if (JSON.parse(sessionStorage.getItem('FlightsAdminSelectedTab')) == 'FlightsAddition') {
        this.FlightsAddition = 'Active';
        this.SavedFlights = null;
        this.Profile = null;
        this.Bookings = null;
        sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('FlightsAddition'));
      }

      if (JSON.parse(sessionStorage.getItem('FlightsAdminSelectedTab')) == 'SavedFlights') {
        this.FlightsAddition = null;
        this.SavedFlights = 'Active';
        this.Profile = null;
        this.Bookings = null;
        sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('SavedFlights'));
      }

      if (JSON.parse(sessionStorage.getItem('FlightsAdminSelectedTab')) == 'Profile') {
        this.FlightsAddition = null;
        this.SavedFlights = null;
        this.Profile = 'Active';
        this.Bookings = null;
        sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('Profile'));
      } if (JSON.parse(sessionStorage.getItem('FlightsAdminSelectedTab')) == 'Bookings') {
        this.FlightsAddition = null;
        this.SavedFlights = null;
        this.Profile = null;
        this.Bookings = 'Active';
        sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('Bookings'));
      }
    } else {
      this.FlightsAddition = null;
      this.SavedFlights = null;
      this.Profile = null;
      this.FlightsAddition = 'Active';
    }

    //this.flight = this._flightService.getter();
    console.log(this.flight);
  }

  displayUser() {
    if (localStorage.getItem('user') !== null) {
      this.u = JSON.parse(localStorage.getItem('user'));
      this.message = localStorage.getItem('loggedInOrRegistered');
    } else {
      alert("Please log in first");
      this._router.navigate(['/sign-in']);
    }
  }

  signOut() {
    this._router.navigate(['/sign-in']);
    localStorage.clear();
  }


  //Admin tabs contoller function
  tabFunction(event) {

    console.log('Function works!');

    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;


    if ('' + value == 'FlightsAddition') {
      this.FlightsAddition = 'Active';
      this.SavedFlights = null;
      this.Profile = null;
      this.Bookings = null;
      sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('FlightsAddition'));
    }

    if ('' + value == 'SavedFlights') {
      this.FlightsAddition = null;
      this.SavedFlights = 'Active';
      this.Profile = null;
      this.Bookings = null;
      sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('SavedFlights'));
    }

    if ('' + value == 'Profile') {
      this.FlightsAddition = null;
      this.SavedFlights = null;
      this.Profile = 'Active';
      this.Bookings = null;
      sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('Profile'));
    }
    if ('' + value == 'Bookings') {
      this.FlightsAddition = null;
      this.SavedFlights = null;
      this.Profile = null;
      this.Bookings = 'Active';
      sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('Bookings'));
    }
  }

  addFlight = function (flight) {
    this._flightService.createFlight(flight).subscribe((flight) => {
      console.log(flight);
      alert('Flight has successfully been added!');
    }, (error) => {
      console.log(error);
    });
  }

  resetForm(form: NgForm) {
    form.reset();
    window.location.reload();
  }

  delete = function (flight: Flight) {
    console.log(flight);
    window.location.reload();
  }

  updateProfile() {

    console.log(this.u.firstname);

    //window.location.reload();

    this._userService.updateCustomer(this.u).subscribe((user) => {
      alert('Profile has successfully been updated!');
    }, (error) => {
      console.log(error);
    });

    this.UpdateProfile = false;
  }

  updateAddress(address: Address) {
    /*this._travellerAddressService.updateAddress(address).subscribe((address) => {
    }, (error) => {
      console.log(error);
    });*/
    this.UpdateAddress = false;
  }

  createAddress(address: Address) {
    this._travellerAddressService.createAddress(address).subscribe((address) => {
    }, (error) => {
      console.log(error);
    });
  }

  getAddressesById(id: number){
    this._travellerAddressService.getAddressesById(id).subscribe((addresses) => {
      this.addresses = addresses;
      console.log(addresses);
      this.addresses = addresses;
    }, (error) => {
      console.log(error);
    });
  }

  showUpdateAddressForm(){
    this.UpdateAddress = true; 
  }

  showUpdateProfileForm(){
    this.UpdateProfile = true; 
  }

}



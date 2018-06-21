import { Component, OnInit } from '@angular/core';
import { CarService } from '../../shared-service/car.service';
import { Router } from '@angular/router';
import { Car } from '../../model-classes/car';
import { User } from '../../model-classes/user';
import { UserService } from '../../shared-service/user.service';

@Component({
  selector: 'app-car-admin-profile',
  templateUrl: './car-admin-profile.component.html',
  styleUrls: ['./car-admin-profile.component.css']
})
export class CarAdminProfileComponent implements OnInit {

  private CarsAddition: String;
  private SavedCars: String;
  private Profile: String;
  private Bookings: String;
  private cars: Car[];

  private u: User = JSON.parse(localStorage.getItem('user')); 

  constructor(private _carService: CarService, private _router: Router, private _userService: UserService) { }

  ngOnInit() {

    this._carService.getCars().subscribe((cars) => {
      console.log(cars);
      this.cars = cars;
    }, (error) => {
      console.log(error);
    });


    if (JSON.parse(sessionStorage.getItem('CarAdminSelectedTab')) != null) {
      if (JSON.parse(sessionStorage.getItem('CarAdminSelectedTab')) == 'CarsAddition') {
        this.CarsAddition = 'Active';
        this.SavedCars = null;
        this.Profile = null;
        this.Bookings = null;
        sessionStorage.setItem('CarAdminSelectedTab', JSON.stringify('CarsAddition'));
      }

      if (JSON.parse(sessionStorage.getItem('CarAdminSelectedTab')) == 'SavedCars') {
        this.CarsAddition = null;
        this.SavedCars = 'Active';
        this.Profile = null;
        this.Bookings = null;
        sessionStorage.setItem('CarAdminSelectedTab', JSON.stringify('SavedCars'));
      }

      if (JSON.parse(sessionStorage.getItem('CarAdminSelectedTab')) == 'Profile') {
        this.CarsAddition = null;
        this.SavedCars = null;
        this.Profile = 'Active';
        this.Bookings = null;
        sessionStorage.setItem('CarAdminSelectedTab', JSON.stringify('Profile'));
      }
      if (JSON.parse(sessionStorage.getItem('CarAdminSelectedTab')) == 'Bookings') {
        this.CarsAddition = null;
        this.SavedCars = null;
        this.Bookings = 'Active';
        this.Profile = null;
        sessionStorage.setItem('CarAdminSelectedTab', JSON.stringify('Bookings'));
      }
    } else {
      this.CarsAddition = 'Active';
    }

  }


  //Admin tabs contoller function
  tabFunction(event) {

    console.log('Function works!');

    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;


    if ('' + value == 'CarsAddition') {
      this.CarsAddition = 'Active';
      this.SavedCars = null;
      this.Profile = null;
      this.Bookings = null;
      sessionStorage.setItem('CarAdminSelectedTab', JSON.stringify('CarsAddition'));
    }

    if ('' + value == 'SavedCars') {
      this.CarsAddition = null;
      this.SavedCars = 'Active';
      this.Profile = null;
      this.Bookings = null;
      sessionStorage.setItem('CarAdminSelectedTab', JSON.stringify('SavedCars'));
    }

    if ('' + value == 'Profile') {
      this.CarsAddition = null;
      this.SavedCars = null;
      this.Profile = 'Active';
      this.Bookings = null;
      sessionStorage.setItem('CarAdminSelectedTab', JSON.stringify('Profile'));
    }
    if ('' + value == 'Bookings') {
      this.CarsAddition = null;
      this.SavedCars = null;
      this.Profile = null;
      this.Bookings = 'Active';
      sessionStorage.setItem('CarAdminSelectedTab', JSON.stringify('Bookings'));
    }
  }

  signOut() {
    this._router.navigate(['/sign-in']);
    localStorage.clear();
  }

  updateProfile(user: User) {
    user.id = this.u.id;

    console.log(user);

    return this._userService.updateUser(user).subscribe((user) => {
      alert('Profile has successfully been updated!');
    }, (error) => {
      console.log(error);
    });
    //window.location.reload();
  }

  addCar = function (car) {
    this._carService.createCar(car).subscribe((car) => {
      console.log(car);
      alert('car details successfully added!');
    }, (error) => {
      console.log(error);
    });
    window.location.reload();
  }

  delete(car){
    console.log(car);
  }

  update(car){
    console.log(car);
  }
}

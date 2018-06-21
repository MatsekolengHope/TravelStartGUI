import { Component, OnInit } from '@angular/core';
import { CarService } from '../../shared-service/car.service';
import { Router } from '@angular/router';
import { Car } from '../../model-classes/car';

@Component({
  selector: 'app-searched-cars',
  templateUrl: './searched-cars.component.html',
  styleUrls: ['./searched-cars.component.css']
})
export class SearchedCarsComponent implements OnInit {

  private searchedCars: Car[];

  constructor(private _router: Router, private _carService: CarService) { }

  ngOnInit() {
    this.searchedCars = JSON.parse(localStorage.getItem('searchedCars'));
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

  selectCar(selectedCar: Car) {
    console.log(selectedCar);
    sessionStorage.setItem('selectedCar', JSON.stringify(selectedCar));
    this._router.navigate(['/selected-car']);
  }
}

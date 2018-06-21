import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Car } from '../model-classes/car';

@Injectable()
export class CarService {

  private baseUrl: string = 'http://localhost:8080/car';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }
 
  createCar(car: Car) { 
    return this._http.post(this.baseUrl + '/create-car', JSON.stringify(car), this.options).map((response: Response) => response.json())
    .catch(this.errorHandler);
  }

  searchCars(departureCity: String, arrivalCity: String) {
    return this._http.get(this.baseUrl + '/search-cars/' + departureCity+'/'+arrivalCity, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  } 

  getCars() {
    return this._http.get(this.baseUrl + '/cars', this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}

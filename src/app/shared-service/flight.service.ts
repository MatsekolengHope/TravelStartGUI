import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Flight } from '../model-classes/flight';

@Injectable()
export class FlightService {

  private baseUrl: string = 'http://localhost:8080/flight';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  private flight: Flight;

  constructor(private _http: Http) { }

  getFlights() {
    return this._http.get(this.baseUrl + '/flights', this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  createFlight(flight: Flight) {
    return this._http.post(this.baseUrl + '/flight', JSON.stringify(flight), this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateFlight(flight: Flight) {
    return this._http.post(this.baseUrl + '/flight', JSON.stringify(flight), this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  }

  setter(flight: Flight) {
    this.flight = flight;
  }

  getter() {
    return this.flight;
  }

  searchFlights(departureCity: String, arrivalCity: String) {
    return this._http.get(this.baseUrl + '/search/' + departureCity + '/' + arrivalCity, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getFlight(id: Number) {
    return this._http.get(this.baseUrl + '/get-flight/' + id, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteFlight(flight: Flight) {
    return this._http.get(this.baseUrl + '/delete/'+flight.id, JSON.stringify(flight)).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}
